import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";
import { SECTIONS_BUCKET, buildSectionCardImagePath } from "@/lib/sections";

interface Params {
  params: Promise<{ id: string }>;
}

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;

  const form = await request.formData();
  const name = form.get("name");
  const keywordsRaw = form.get("keywords");
  const meaningUpright = form.get("meaning_upright");
  const meaningReversed = form.get("meaning_reversed");
  const sortOrderRaw = form.get("sort_order");
  const image = form.get("image");

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { data: card, error: cardError } = await supabase
    .from("section_cards")
    .select("slug, section_id, image_path, card_sections(slug, has_reversed)")
    .eq("id", id)
    .single();

  if (cardError || !card) {
    return NextResponse.json({ error: "Carta no encontrada" }, { status: 404 });
  }

  const section = card.card_sections as unknown as { slug: string; has_reversed: boolean };

  const update: Record<string, unknown> = {};
  if (typeof name === "string" && name.trim()) update.name = name.trim();
  if (typeof keywordsRaw === "string") {
    update.keywords = keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean);
  }
  if (typeof meaningUpright === "string" && meaningUpright.trim()) {
    update.meaning_upright = meaningUpright.trim();
  }
  if (typeof meaningReversed === "string") {
    update.meaning_reversed = section.has_reversed && meaningReversed.trim() ? meaningReversed.trim() : null;
  }
  if (sortOrderRaw !== null) {
    const sortOrder = Number(sortOrderRaw);
    if (Number.isFinite(sortOrder)) update.sort_order = sortOrder;
  }

  if (image instanceof File && image.size > 0) {
    const ext = ALLOWED_TYPES[image.type];
    if (!ext) {
      return NextResponse.json({ error: "Formato de imagen no admitido" }, { status: 400 });
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "La imagen supera 4 MB" }, { status: 400 });
    }
    const imagePath = buildSectionCardImagePath(section.slug, card.slug, ext);
    const { error: uploadError } = await supabase.storage
      .from(SECTIONS_BUCKET)
      .upload(imagePath, image, { contentType: image.type, upsert: true });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    update.image_path = imagePath;
  }

  const { data, error } = await supabase
    .from("section_cards")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ card: data });
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

  const { data: card } = await supabase
    .from("section_cards")
    .select("image_path")
    .eq("id", id)
    .single();

  if (card?.image_path) {
    await supabase.storage.from(SECTIONS_BUCKET).remove([card.image_path]);
  }

  const { error } = await supabase.from("section_cards").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
