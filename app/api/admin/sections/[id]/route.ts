import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";
import { SECTIONS_BUCKET } from "@/lib/sections";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (typeof body.name === "string") {
    const name = body.name.trim();
    if (!name || name.length > 80) {
      return NextResponse.json({ error: "Nombre no válido" }, { status: 400 });
    }
    update.name = name;
  }
  if (typeof body.description === "string" || body.description === null) {
    update.description = body.description ? String(body.description).trim() || null : null;
  }
  if (typeof body.has_reversed === "boolean") {
    update.has_reversed = body.has_reversed;
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("card_sections")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ section: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { data: cards } = await supabase
    .from("section_cards")
    .select("image_path")
    .eq("section_id", id);

  const paths = (cards ?? [])
    .map((card) => card.image_path as string | null)
    .filter((path): path is string => Boolean(path));

  if (paths.length > 0) {
    await supabase.storage.from(SECTIONS_BUCKET).remove(paths);
  }

  const { error } = await supabase.from("card_sections").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
