import Link from "next/link";
import { ALL_CARDS } from "@/lib/cards";
import { CardGallery } from "@/components/CardGallery";
import { CardImage } from "@/components/CardImage";
import { getServerSupabase } from "@/lib/supabase-server";
import type { CardSection } from "@/lib/sections";

async function loadSections(): Promise<CardSection[]> {
  const supabase = getServerSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("card_sections")
    .select("*")
    .order("created_at", { ascending: true });
  return (data as CardSection[]) ?? [];
}

export default async function HomePage() {
  const sections = await loadSections();

  return (
    <>
      {/* Hero asimétrico: mensaje a la izquierda, abanico de cartas a la derecha */}
      <section className="container pt-5 pb-4">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7 fade-up">
            <h1 className="font-display display-4 mb-3">
              La biblioteca abierta del <em className="text-gold">tarot</em>
            </h1>
            <p className="lead-narrow mb-4">
              Las 78 cartas del tarot con sus significados, tiradas diarias y
              las interpretaciones de una comunidad que está empezando a reunirse.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <a href="#biblioteca" className="btn btn-gold">
                Explorar las cartas
              </a>
              <Link href="/tiradas" className="btn btn-ghost">
                Ver tiradas diarias
              </Link>
            </div>
          </div>
          <div className="col-12 col-lg-5 d-none d-md-block">
            <div className="hero-fan" aria-hidden>
              <div className="fan-card fan-left">
                <CardImage slug="la-luna" name="La Luna" roman="XVIII" />
              </div>
              <div className="fan-card fan-center">
                <CardImage slug="la-estrella" name="La Estrella" roman="XVII" />
              </div>
              <div className="fan-card fan-right">
                <CardImage slug="el-sol" name="El Sol" roman="XIX" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider-line" />
      </div>

      {/* Módulo 1: biblioteca de cartas con buscador */}
      <section id="biblioteca" className="container section-pad">
        <div className="mb-4">
          <h2 className="font-display fs-1 mb-2">El mazo completo</h2>
          <p className="text-muted-2 mb-0">
            Setenta y ocho cartas: los veintidós Arcanos Mayores y los cuatro
            palos de los Menores. Toca cualquiera para leer su significado y
            dejar tu interpretación.
          </p>
        </div>
        <CardGallery cards={ALL_CARDS} />
      </section>

      {sections.length > 0 && (
        <>
          <div className="container">
            <hr className="divider-line" />
          </div>
          <section className="container section-pad">
            <div className="mb-4">
              <h2 className="font-display fs-1 mb-2">Explora otros sistemas de cartas</h2>
              <p className="text-muted-2 mb-0">
                Oráculos, Lenormand y otros mazos que la comunidad ha ido sumando.
              </p>
            </div>
            <div className="row g-4">
              {sections.map((section) => (
                <div key={section.id} className="col-12 col-md-6 col-lg-4">
                  <Link
                    href={`/secciones/${section.slug}`}
                    className="panel p-4 d-block h-100 text-decoration-none"
                  >
                    <h3 className="font-display fs-3 mb-2">{section.name}</h3>
                    {section.description && (
                      <p className="text-muted-2 mb-0">{section.description}</p>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
