import type { Metadata } from "next";
import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CardSection } from "@/lib/sections";

export const metadata: Metadata = {
  title: "Secciones",
  description: "Otros sistemas de cartas de Taroteca: oráculos, Lenormand y más.",
};

export const revalidate = 60;

export default async function SectionsPage() {
  const supabase = getServerSupabase();

  let sections: CardSection[] = [];
  let loadError = false;

  if (supabase) {
    const { data, error } = await supabase
      .from("card_sections")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      loadError = true;
    } else {
      sections = (data as CardSection[]) ?? [];
    }
  }

  return (
    <div className="container section-pad">
      <header className="mb-5" style={{ maxWidth: "60ch" }}>
        <h1 className="font-display display-5 mb-3">Otros sistemas de cartas</h1>
        <p className="lead-narrow mb-0">
          Además del Tarot, la biblioteca reúne otros sistemas de cartas:
          oráculos, Lenormand y los que la comunidad vaya sumando.
        </p>
      </header>

      {!supabase ? (
        <div className="panel p-4">
          <p className="text-muted-2 mb-0">
            Las secciones estarán disponibles cuando se configure la conexión con
            Supabase.
          </p>
        </div>
      ) : loadError ? (
        <div className="panel p-4">
          <p className="text-danger mb-0">
            No se pudieron cargar las secciones. Inténtalo de nuevo en unos minutos.
          </p>
        </div>
      ) : sections.length === 0 ? (
        <div className="panel text-center py-5 px-4">
          <p className="font-display fs-3 mb-2">Todavía no hay secciones creadas</p>
          <p className="text-muted-2 mb-4" style={{ maxWidth: "48ch", margin: "0 auto" }}>
            Mientras llega la primera, puedes explorar la biblioteca del Tarot.
          </p>
          <Link href="/" className="btn btn-gold">
            Ir a la biblioteca
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {sections.map((section) => (
            <div key={section.id} className="col-12 col-md-6 col-lg-4">
              <Link href={`/secciones/${section.slug}`} className="panel p-4 d-block h-100 text-decoration-none">
                <h2 className="font-display fs-3 mb-2">{section.name}</h2>
                {section.description && <p className="text-muted-2 mb-0">{section.description}</p>}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
