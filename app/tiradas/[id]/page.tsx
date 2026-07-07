import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { MAJOR_ARCANA } from "@/lib/cards";
import { Comments } from "@/components/Comments";

export const revalidate = 60;

interface SpreadRow {
  id: string;
  title: string;
  question: string;
  context: string;
  cards: string[];
  spread_date: string;
  spread_type?: string;
}

interface SpreadDetailPageProps {
  params: Promise<{ id: string }>;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function findCardSlug(cardName: string): string | null {
  const card = MAJOR_ARCANA.find(
    (item) => item.name.toLowerCase() === cardName.trim().toLowerCase()
  );
  return card?.slug ?? null;
}

function CardTile({ name }: { name: string }) {
  const slug = findCardSlug(name);
  const frame = (
    <div className="card-frame spread-card-frame">
      <div className="card-placeholder" aria-label={`Carta del tarot: ${name}`}>
        <span className="ph-name">{name}</span>
      </div>
    </div>
  );

  return slug ? (
    <Link href={`/carta/${slug}`} className="spread-card text-decoration-none">
      {frame}
    </Link>
  ) : (
    <div className="spread-card">{frame}</div>
  );
}

function SpreadLayout({
  cards,
  spreadType,
}: {
  cards: string[];
  spreadType: "single" | "three-cards" | "cross";
}) {
  if (spreadType === "single") {
    return (
      <div className="spread-layout-single mb-5">
        <CardTile name={cards[0]} />
      </div>
    );
  }

  if (spreadType === "three-cards") {
    return (
      <div className="spread-layout-three mb-5">
        {cards.map((card) => (
          <CardTile key={card} name={card} />
        ))}
      </div>
    );
  }

  if (spreadType === "cross") {
    return (
      <div className="spread-layout-cross mb-5">
        <div className="cross-north">
          <CardTile name={cards[1]} />
        </div>
        <div className="cross-west">
          <CardTile name={cards[3]} />
        </div>
        <div className="cross-center">
          <CardTile name={cards[0]} />
        </div>
        <div className="cross-east">
          <CardTile name={cards[2]} />
        </div>
        <div className="cross-south">
          <CardTile name={cards[4]} />
        </div>
      </div>
    );
  }

  return null;
}

async function loadSpread(id: string): Promise<SpreadRow | null> {
  const supabase = getServerSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("daily_spreads")
    .select("id, title, question, context, cards, spread_date, spread_type")
    .eq("id", id)
    .single();

  return (data as SpreadRow) ?? null;
}

export async function generateMetadata({ params }: SpreadDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const spread = await loadSpread(id);
  if (!spread) return {};
  return { title: spread.title, description: spread.context };
}

export default async function SpreadDetailPage({ params }: SpreadDetailPageProps) {
  const { id } = await params;
  const spread = await loadSpread(id);
  if (!spread) notFound();

  const spreadType =
    spread.spread_type === "single" ||
    spread.spread_type === "three-cards" ||
    spread.spread_type === "cross"
      ? spread.spread_type
      : "three-cards";

  return (
    <div className="container section-pad">
      <Link href="/tiradas" className="text-muted-2 d-inline-block mb-4 text-decoration-none">
        ← Todas las tiradas
      </Link>

      <article className="spread-article">
        <time
          className="text-muted-2 d-block mb-2"
          dateTime={spread.spread_date}
          style={{ letterSpacing: "0.06em" }}
        >
          {dateFormatter.format(new Date(`${spread.spread_date}T12:00:00`))}
        </time>
        <h1 className="font-display display-5 mb-3">{spread.title}</h1>
        <p className="spread-question mb-4">{spread.question}</p>
        <p className="lead-narrow mb-4">{spread.context}</p>

        {spread.cards?.length > 0 && (
          <SpreadLayout cards={spread.cards} spreadType={spreadType} />
        )}

        <Comments
          table="daily_spread_comments"
          column="spread_id"
          value={spread.id}
          prompt="¿Cómo interpretarías esta tirada?"
        />
      </article>
    </div>
  );
}
