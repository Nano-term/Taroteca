import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ALL_CARDS,
  getAdjacentCards,
  getCardBySlug,
  getCardCategory,
  getCardEyebrow,
} from "@/lib/cards";
import { CardImage } from "@/components/CardImage";
import { Comments } from "@/components/Comments";

interface CardPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return {};
  return {
    title: card.name,
    description: `${card.name} en el tarot: significado general e invertido, palabras clave e interpretaciones de la comunidad.`,
  };
}

export default async function CardPage({ params }: CardPageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();

  const { prev, next } = getAdjacentCards(slug);

  return (
    <article className="container section-pad">
      <div className="row g-5">
        <div className="col-12 col-md-5 col-lg-4">
          <div
            className="position-sticky mx-auto"
            style={{ top: "96px", maxWidth: "320px" }}
          >
            <CardImage
              slug={card.slug}
              name={card.name}
              roman={card.roman}
              category={getCardCategory(card)}
              large
            />
          </div>
        </div>

        <div className="col-12 col-md-7 col-lg-7 offset-lg-1">
          <p className="text-muted-2 mb-1" style={{ letterSpacing: "0.12em" }}>
            {getCardEyebrow(card)}
          </p>
          <h1 className="font-display display-5 mb-3">{card.name}</h1>

          <div className="d-flex gap-2 flex-wrap mb-5">
            {card.keywords.map((keyword) => (
              <span key={keyword} className="keyword-pill">
                {keyword}
              </span>
            ))}
          </div>

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Significado general</h2>
            <p className="lead-narrow mb-0">{card.meaningUpright}</p>
          </section>

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Significado invertido</h2>
            <p className="lead-narrow mb-0">{card.meaningReversed}</p>
          </section>

          <nav className="d-flex justify-content-between gap-3 mb-5" aria-label="Otras cartas">
            {prev ? (
              <Link href={`/carta/${prev.slug}`} className="btn btn-ghost">
                {prev.roman} · {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/carta/${next.slug}`} className="btn btn-ghost">
                {next.roman} · {next.name}
              </Link>
            )}
          </nav>

          <hr className="divider-line mb-5" />

          <h2 className="font-display fs-2 mb-4">Comentarios de la comunidad</h2>
          <Comments table="card_comments" column="card_slug" value={card.slug} />
        </div>
      </div>
    </article>
  );
}
