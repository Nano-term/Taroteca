/**
 * Secciones de cartas creadas desde el admin (oráculos, Lenormand, etc.).
 * A diferencia del Tarot (hardcodeado en lib/cards.ts), estas viven en
 * Supabase: se crean, editan y borran en caliente sin rebuild.
 */

export const SECTIONS_BUCKET = "card-sections";
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export interface CardSection {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  has_reversed: boolean;
  created_at: string;
}

export interface SectionCard {
  id: string;
  section_id: string;
  slug: string;
  name: string;
  sort_order: number;
  keywords: string[];
  meaning_upright: string;
  meaning_reversed: string | null;
  image_path: string | null;
  created_at: string;
}

/**
 * URL pública de la imagen de una carta de sección, o null si todavía no
 * tiene (se muestra el placeholder tipográfico, igual que el Tarot).
 */
export function getSectionCardImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${SECTIONS_BUCKET}/${imagePath}`;
}

/** Clave de objeto en el bucket para una carta de una sección. */
export function buildSectionCardImagePath(
  sectionSlug: string,
  cardSlug: string,
  extension: string
): string {
  return `${sectionSlug}/${cardSlug}.${extension}`;
}
