import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { getSectionCardImageUrl, type CardSection, type SectionCard } from "@/lib/sections";
import { SectionCardImage } from "@/components/SectionCardImage";

export const revalidate = 60;

interface CardPageProps {
  params: Promise<{ slug: string; cardSlug: string }>;
}

async function loadCard(sectionSlug: string, cardSlug: string) {
  const supabase = getServerSupabase();
  if (!supabase) return { section: null, card: null };

  const { data: section } = await supabase
    .from("card_sections")
    .select("*")
    .eq("slug", sectionSlug)
    .single();

  if (!section) return { section: null, card: null };

  const { data: card } = await supabase
    .from("section_cards")
    .select("*")
    .eq("section_id", section.id)
    .eq("slug", cardSlug)
    .single();

  return { section: section as CardSection, card: card as SectionCard | null };
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { slug, cardSlug } = await params;
  const { section, card } = await loadCard(slug, cardSlug);
  if (!section || !card) return {};
  return { title: `${card.name} · ${section.name}` };
}

export default async function SectionCardPage({ params }: CardPageProps) {
  const { slug, cardSlug } = await params;
  const { section, card } = await loadCard(slug, cardSlug);
  if (!section || !card) notFound();

  return (
    <article className="container section-pad">
      <div className="row g-5">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="position-sticky mx-auto" style={{ top: "96px", maxWidth: "320px" }}>
            <SectionCardImage imageUrl={getSectionCardImageUrl(card.image_path)} name={card.name} large />
          </div>
        </div>

        <div className="col-12 col-md-7 col-lg-7 offset-lg-1">
          <p className="text-muted-2 mb-1" style={{ letterSpacing: "0.12em" }}>
            {section.name.toUpperCase()}
          </p>
          <h1 className="font-display display-5 mb-3">{card.name}</h1>

          {card.keywords.length > 0 && (
            <div className="d-flex gap-2 flex-wrap mb-5">
              {card.keywords.map((keyword) => (
                <span key={keyword} className="keyword-pill">
                  {keyword}
                </span>
              ))}
            </div>
          )}

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Significado general</h2>
            <p className="lead-narrow mb-0">{card.meaning_upright}</p>
          </section>

          {section.has_reversed && card.meaning_reversed && (
            <section className="mb-5">
              <h2 className="font-display fs-2 mb-3">Significado invertido</h2>
              <p className="lead-narrow mb-0">{card.meaning_reversed}</p>
            </section>
          )}

          <Link href={`/secciones/${section.slug}`} className="btn btn-ghost">
            Volver a {section.name}
          </Link>
        </div>
      </div>
    </article>
  );
}
