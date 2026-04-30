import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";


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

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Create a unique filename
    const originalName = file.name || "image.png";
    const ext = originalName.split(".").pop() || "png";
    const filename = `promo-${Date.now()}.${ext}`;

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
        Body: uint8Array,
        ContentType: file.type || "image/png",
      })
    );

    // Construction of the public URL
    let baseUrl = process.env.CF_R2_PUBLIC_URL?.replace(/\/$/, "") || "";
    
    // If baseUrl is missing or looks like the S3 API endpoint (which is NOT public), 
    // we attempt a fallback, but warn the user.
    const isApiEndpoint = baseUrl.includes("r2.cloudflarestorage.com");
    
    if (!baseUrl || isApiEndpoint) {
      console.warn(`[Upload] CF_R2_PUBLIC_URL is ${!baseUrl ? "missing" : "set to an API endpoint"}. Browsers will not be able to view images.`);
      
      // Attempting a common fallback format, though this often requires a worker or custom domain.
      // The most reliable way is for the user to provide a pub-xxx.r2.dev or custom domain.
      if (isApiEndpoint && !baseUrl.includes(process.env.CF_R2_BUCKET_NAME!)) {
         // If it's the base account endpoint, add the bucket name
         baseUrl = `${baseUrl}/${process.env.CF_R2_BUCKET_NAME}`;
      }
    }
    
    const fileUrl = `${baseUrl}/${filename}`;

    return NextResponse.json({ 
      url: fileUrl, 
      filename,
      note: isApiEndpoint ? "Warning: Your public URL is set to the R2 API endpoint. You must enable 'Public Bucket' or a 'Custom Domain' in Cloudflare dashboard and update CF_R2_PUBLIC_URL." : undefined
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
