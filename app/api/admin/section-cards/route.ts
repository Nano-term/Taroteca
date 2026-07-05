import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";
import { SECTIONS_BUCKET, SLUG_RE, buildSectionCardImagePath } from "@/lib/sections";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const sectionId = String(form.get("section_id") ?? "");
  const slug = String(form.get("slug") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const keywordsRaw = String(form.get("keywords") ?? "");
  const meaningUpright = String(form.get("meaning_upright") ?? "").trim();
  const meaningReversed = String(form.get("meaning_reversed") ?? "").trim();
  const sortOrderRaw = form.get("sort_order");
  const image = form.get("image");

  if (!sectionId || !SLUG_RE.test(slug) || !name || name.length > 80) {
    return NextResponse.json({ error: "Datos de carta no válidos" }, { status: 400 });
  }
  if (!meaningUpright) {
    return NextResponse.json({ error: "Falta el significado general" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { data: section, error: sectionError } = await supabase
    .from("card_sections")
    .select("slug, has_reversed")
    .eq("id", sectionId)
    .single();

  if (sectionError || !section) {
    return NextResponse.json({ error: "Sección no encontrada" }, { status: 404 });
  }

  let sortOrder = Number(sortOrderRaw);
  if (!Number.isFinite(sortOrder)) {
    const { count } = await supabase
      .from("section_cards")
      .select("id", { count: "exact", head: true })
      .eq("section_id", sectionId);
    sortOrder = count ?? 0;
  }

  let imagePath: string | null = null;
  if (image instanceof File && image.size > 0) {
    const ext = ALLOWED_TYPES[image.type];
    if (!ext) {
      return NextResponse.json({ error: "Formato de imagen no admitido" }, { status: 400 });
    }
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "La imagen supera 4 MB" }, { status: 400 });
    }
    imagePath = buildSectionCardImagePath(section.slug, slug, ext);
    const { error: uploadError } = await supabase.storage
      .from(SECTIONS_BUCKET)
      .upload(imagePath, image, { contentType: image.type, upsert: true });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
  }

  const { data, error } = await supabase
    .from("section_cards")
    .insert({
      section_id: sectionId,
      slug,
      name,
      sort_order: sortOrder,
      keywords: keywordsRaw
        ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
      meaning_upright: meaningUpright,
      meaning_reversed: section.has_reversed && meaningReversed ? meaningReversed : null,
      image_path: imagePath,
    })
    .select("*")
    .single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
  return NextResponse.json({ card: data });
}
