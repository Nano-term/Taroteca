import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CardSection, SectionCard } from "@/lib/sections";
import { SectionCardGallery } from "@/components/SectionCardGallery";

export const revalidate = 60;

interface SectionPageProps {
  params: Promise<{ slug: string }>;
}

async function loadSection(slug: string) {
  const supabase = getServerSupabase();
  if (!supabase) return { section: null, cards: [] as SectionCard[] };

  const { data: section } = await supabase
    .from("card_sections")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!section) return { section: null, cards: [] as SectionCard[] };

  const { data: cards } = await supabase
    .from("section_cards")
    .select("*")
    .eq("section_id", section.id)
    .order("sort_order", { ascending: true });

  return { section: section as CardSection, cards: (cards as SectionCard[]) ?? [] };
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { section } = await loadSection(slug);
  if (!section) return {};
  return { title: section.name, description: section.description ?? undefined };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { slug } = await params;
  const { section, cards } = await loadSection(slug);
  if (!section) notFound();

  return (
    <div className="container section-pad">
      <header className="mb-5" style={{ maxWidth: "60ch" }}>
        <h1 className="font-display display-5 mb-3">{section.name}</h1>
        {section.description && <p className="lead-narrow mb-0">{section.description}</p>}
      </header>

      {cards.length === 0 ? (
        <div className="panel text-center py-5 px-4">
          <p className="font-display fs-3 mb-0">Todavía no hay cartas en esta sección</p>
        </div>
      ) : (
        <SectionCardGallery sectionSlug={section.slug} cards={cards} />
      )}
    </div>
  );
}
