import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  let postId: string | undefined;

  try {
    const body = await req.json();
    postId = body?.postId;
  } catch {
    console.error("[track-view] Failed to parse request body");
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!postId) {
    console.error("[track-view] Missing postId in request");
    return NextResponse.json({ error: "missing_postId" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error("[track-view] NEXT_PUBLIC_SUPABASE_URL is not set");
    return NextResponse.json({ error: "config_error" }, { status: 500 });
  }

  const key = serviceRoleKey ?? anonKey;
  if (!key) {
    console.error("[track-view] No Supabase key available (neither service role nor anon)");
    return NextResponse.json({ error: "config_error" }, { status: 500 });
  }

  if (!serviceRoleKey) {
    console.warn(
      "[track-view] SUPABASE_SERVICE_ROLE_KEY is not set — falling back to anon key. " +
        "UPDATE may fail due to RLS. Add SUPABASE_SERVICE_ROLE_KEY to your Vercel environment variables."
    );
  }

  const supabase = createClient(supabaseUrl, key);

  // Step 1: Read current views
  const { data, error: selectError } = await supabase
    .from("posts")
    .select("views")
    .eq("id", postId)
    .single();

  if (selectError) {
    console.error(
      "[track-view] SELECT error for postId=%s: code=%s message=%s details=%s hint=%s",
      postId,
      selectError.code,
      selectError.message,
      selectError.details,
      selectError.hint
    );
    console.error("[track-view] Full SELECT error object:", JSON.stringify(selectError));
    return NextResponse.json(
      { error: "select_failed", code: selectError.code, message: selectError.message },
      { status: 500 }
    );
  }

  const currentViews = (data?.views ?? 0) as number;
  console.log("[track-view] postId=%s currentViews=%d → incrementing to %d", postId, currentViews, currentViews + 1);

  // Step 2: Increment views
  const { error: updateError } = await supabase
    .from("posts")
    .update({ views: currentViews + 1 })
    .eq("id", postId);

  if (updateError) {
    console.error(
      "[track-view] UPDATE error for postId=%s: code=%s message=%s details=%s hint=%s",
      postId,
      updateError.code,
      updateError.message,
      updateError.details,
      updateError.hint
    );
    console.error("[track-view] Full UPDATE error object:", JSON.stringify(updateError));
    return NextResponse.json(
      { error: "update_failed", code: updateError.code, message: updateError.message },
      { status: 500 }
    );
  }

  console.log("[track-view] Success — postId=%s views updated to %d", postId, currentViews + 1);
  return NextResponse.json({ ok: true, views: currentViews + 1 });
}
