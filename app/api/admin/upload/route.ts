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

    // For local development, save to public/uploads
    // NOTE: For production (Vercel), you must switch to Cloudflare R2 or AWS S3
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
