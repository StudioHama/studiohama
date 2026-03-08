/**
 * POST /api/admin/activities/upload
 * Accepts a FormData `file` field (already WebP-compressed client-side via normalizeImage).
 * Uploads to the `public-media` Supabase storage bucket under activities/ using service_role.
 * Returns { url: string }.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function isAdmin(req: NextRequest) {
  const cookie = req.cookies.get("admin_session");
  return cookie?.value === process.env.ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name?.split(".").pop()?.toLowerCase() || "webp";
  const path = `activities/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const contentType =
    ext === "webp" ? "image/webp" :
    ext === "gif"  ? "image/gif"  :
    ext === "png"  ? "image/png"  : "image/jpeg";

  const supabase = getServiceClient();
  const { error } = await supabase.storage
    .from("public-media")
    .upload(path, buffer, { upsert: true, contentType });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabase.storage.from("public-media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
