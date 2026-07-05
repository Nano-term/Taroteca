"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { getSectionCardImageUrl, type SectionCard } from "@/lib/sections";
import { SectionCardImage } from "@/components/SectionCardImage";

const DIACRITICS_RE = new RegExp(
  "[" + String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f) + "]",
  "g"
);

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_RE, "");
}

/**
 * Versión de CardGallery para cartas de sección: sin filtro por palo
 * (no todos los sistemas de cartas lo tienen), solo buscador.
 */
export function SectionCardGallery({
  sectionSlug,
  cards,
}: {
  sectionSlug: string;
  cards: SectionCard[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return cards;
    return cards.filter(
      (card) =>
        normalize(card.name).includes(q) ||
        card.keywords.some((keyword) => normalize(keyword).includes(q))
    );
  }, [cards, query]);

  return (
    <div>
      <div className="position-relative mb-4" style={{ maxWidth: "420px" }}>
        <MagnifyingGlass
          size={18}
          className="position-absolute top-50 translate-middle-y ms-3 text-muted-2"
          aria-hidden
        />
        <input
          type="search"
          className="form-control ps-5"
          placeholder="Buscar por nombre o palabra clave"
          aria-label="Buscar carta"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="panel text-center py-5 px-4">
          <p className="font-display fs-4 mb-1">Ninguna carta responde a esa búsqueda</p>
          <button type="button" className="btn btn-ghost" onClick={() => setQuery("")}>
            Mostrar todas las cartas
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((card) => (
            <div key={card.slug} className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <Link href={`/secciones/${sectionSlug}/${card.slug}`} className="tarot-tile">
                <SectionCardImage imageUrl={getSectionCardImageUrl(card.image_path)} name={card.name} />
                <p className="tile-name mt-2">{card.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
