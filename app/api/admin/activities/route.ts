import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

// GET /api/admin/activities — list all (no auth needed for public read)
export async function GET() {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// POST /api/admin/activities — create
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("activities")
    .insert({
      year: body.year,
      title: body.title,
      description: body.description ?? null,
      category: body.category,
      image_url: body.image_url ?? null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/activities");
  revalidatePath("/");
  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/activities — update
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("activities")
    .update({
      year: updates.year,
      title: updates.title,
      description: updates.description ?? null,
      category: updates.category,
      image_url: updates.image_url ?? null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/activities");
  revalidatePath("/");
  return NextResponse.json(data);
}

// DELETE /api/admin/activities — delete
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getServiceClient();
  const { error } = await supabase.from("activities").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/activities");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
