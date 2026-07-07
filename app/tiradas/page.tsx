import type { Metadata } from "next";
import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Tiradas diarias",
  description:
    "Tiradas de tarot publicadas por Taroteca. Lee el contexto, mira las cartas y comparte tu interpretación.",
};

export const revalidate = 60;

interface SpreadRow {
  id: string;
  title: string;
  context: string;
  spread_date: string;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function SpreadsPage() {
  const supabase = getServerSupabase();

  let spreads: SpreadRow[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("daily_spreads")
      .select("id, title, context, spread_date")
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
          Cada tirada plantea una pregunta y unas cartas. Entra en la que te
          interese para leerla completa y dejar tu interpretación.
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
        <div className="row g-4">
          {spreads.map((spread) => (
            <div key={spread.id} className="col-12 col-md-6 col-lg-4">
              <Link
                href={`/tiradas/${spread.id}`}
                className="panel p-4 d-block h-100 text-decoration-none"
              >
                <time
                  className="text-muted-2 d-block mb-2 small"
                  dateTime={spread.spread_date}
                  style={{ letterSpacing: "0.06em" }}
                >
                  {dateFormatter.format(new Date(`${spread.spread_date}T12:00:00`))}
                </time>
                <h2 className="font-display fs-3 mb-2">{spread.title}</h2>
                <p className="text-muted-2 mb-0 spread-context-preview">{spread.context}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
