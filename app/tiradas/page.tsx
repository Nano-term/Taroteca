import type { Metadata } from "next";
import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase-server";
import { MAJOR_ARCANA } from "@/lib/cards";
import { Comments } from "@/components/Comments";

export const metadata: Metadata = {
  title: "Tiradas diarias",
  description:
    "Tiradas de tarot publicadas por Taroteca. Lee el contexto, mira las cartas y comparte tu interpretación.",
};

export const revalidate = 60;

interface SpreadRow {
  id: string;
  title: string;
  question: string;
  context: string;
  cards: string[];
  spread_date: string;
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

export default async function SpreadsPage() {
  const supabase = getServerSupabase();

  let spreads: SpreadRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("daily_spreads")
      .select("id, title, question, context, cards, spread_date")
      .order("spread_date", { ascending: false });
    if (error) {
      loadError = true;
    } else {
      spreads = (data as SpreadRow[]) ?? [];
    }
  }

  return (
    <div className="container section-pad">
      <header className="mb-5" style={{ maxWidth: "60ch" }}>
        <h1 className="font-display display-5 mb-3">Tiradas diarias</h1>
        <p className="lead-narrow mb-0">
          Cada tirada plantea una pregunta y unas cartas. La lectura la hacemos
          entre todos: deja tu interpretación al final de cada una.
        </p>
      </header>

      {!supabase ? (
        <div className="panel p-4">
          <p className="text-muted-2 mb-0">
            Las tiradas estarán disponibles cuando se configure la conexión con
            Supabase.
          </p>
        </div>
      ) : loadError ? (
        <div className="panel p-4">
          <p className="text-danger mb-0">
            No se pudieron cargar las tiradas. Inténtalo de nuevo en unos minutos.
          </p>
        </div>
      ) : spreads.length === 0 ? (
        <div className="panel text-center py-5 px-4">
          <p className="font-display fs-3 mb-2">Todavía no hay tiradas publicadas</p>
          <p className="text-muted-2 mb-4" style={{ maxWidth: "48ch", margin: "0 auto" }}>
            Las tiradas se publican a mano, con calma. Mientras llega la primera,
            puedes explorar la biblioteca de cartas.
          </p>
          <Link href="/" className="btn btn-gold">
            Ir a la biblioteca
          </Link>
        </div>
      ) : (
        <div>
          {spreads.map((spread) => (
            <article key={spread.id} className="spread-article">
              <time
                className="text-muted-2 d-block mb-2"
                dateTime={spread.spread_date}
                style={{ letterSpacing: "0.06em" }}
              >
                {dateFormatter.format(new Date(`${spread.spread_date}T12:00:00`))}
              </time>
              <h2 className="font-display fs-1 mb-3">{spread.title}</h2>
              <p className="spread-question mb-4">{spread.question}</p>
              <p className="lead-narrow mb-4">{spread.context}</p>

              {spread.cards?.length > 0 && (
                <div className="d-flex gap-2 flex-wrap mb-5">
                  {spread.cards.map((cardName) => {
                    const slug = findCardSlug(cardName);
                    return slug ? (
                      <Link
                        key={cardName}
                        href={`/carta/${slug}`}
                        className="keyword-pill text-decoration-none"
                      >
                        {cardName}
                      </Link>
                    ) : (
                      <span key={cardName} className="keyword-pill">
                        {cardName}
                      </span>
                    );
                  })}
                </div>
              )}

              <Comments
                table="daily_spread_comments"
                column="spread_id"
                value={spread.id}
                prompt="¿Cómo interpretarías esta tirada?"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
