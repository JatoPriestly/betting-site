import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";
import fs from "fs";
import path from "path";

// Triggering Turbopack recompile to clear cached AWS SDK error

async function isAuthorized() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value ?? "";
  return verifySessionToken(token);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a unique filename
    const ext = file.name.split(".").pop() || "png";
    const filename = `upload-${Date.now()}.${ext}`;

    const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
    
    const s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CF_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
      },
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.CF_R2_BUCKET_NAME!,
        Key: filename,
        Body: buffer,
        ContentType: file.type || "image/png",
      })
    );

    // If you have a custom domain for R2, use it. Otherwise fallback to a public R2.dev URL or similar.
    // Using the CF_R2_PUBLIC_URL from your .env.local
    const baseUrl = process.env.CF_R2_PUBLIC_URL?.replace(/\/$/, "") || `https://${process.env.CF_R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.CF_R2_BUCKET_NAME}`;
    const fileUrl = `${baseUrl}/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
