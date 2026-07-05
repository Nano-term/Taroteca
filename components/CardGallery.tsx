"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { SUIT_LABELS, getCardCategory, getTileLabel, type Suit, type TarotCard } from "@/lib/cards";
import { CardImage } from "@/components/CardImage";

type Filter = "todas" | "mayores" | Suit;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "mayores", label: "Arcanos Mayores" },
  { key: "bastos", label: "Bastos" },
  { key: "copas", label: "Copas" },
  { key: "espadas", label: "Espadas" },
  { key: "oros", label: "Oros" },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesFilter(card: TarotCard, filter: Filter): boolean {
  if (filter === "todas") return true;
  if (filter === "mayores") return card.arcana === "mayor";
  return card.suit === filter;
}

export function CardGallery({ cards }: { cards: TarotCard[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todas");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return cards.filter((card) => {
      if (!matchesFilter(card, filter)) return false;
      if (!q) return true;
      return (
        normalize(card.name).includes(q) ||
        (card.suit !== null && normalize(SUIT_LABELS[card.suit]).includes(q)) ||
        card.keywords.some((keyword) => normalize(keyword).includes(q))
      );
    });
  }, [cards, query, filter]);

  return (
    <div>
      <div
        className="d-flex gap-2 flex-wrap mb-4"
        role="group"
        aria-label="Filtrar cartas por categoría"
      >
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`filter-pill ${filter === item.key ? "active" : ""}`}
            aria-pressed={filter === item.key}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="position-relative mb-4" style={{ maxWidth: "420px" }}>
        <MagnifyingGlass
          size={18}
          className="position-absolute top-50 translate-middle-y ms-3 text-muted-2"
          aria-hidden
        />
        <input
          type="search"
          className="form-control ps-5"
          placeholder="Buscar por nombre o palo"
          aria-label="Buscar carta"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="panel text-center py-5 px-4">
          <p className="font-display fs-4 mb-1">Ninguna carta responde a esa búsqueda</p>
          <p className="text-muted-2 mb-3">
            Prueba con el nombre de una carta, como La Estrella o As de Copas,
            con un palo, como Espadas, o con una palabra clave, como intuición.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQuery("");
              setFilter("todas");
            }}
          >
            Mostrar todas las cartas
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((card) => (
            <div key={card.slug} className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <Link href={`/carta/${card.slug}`} className="tarot-tile">
                <CardImage
                  slug={card.slug}
                  name={card.name}
                  roman={card.roman}
                  category={getCardCategory(card)}
                />
                <span className="tile-number d-block mt-2">{getTileLabel(card)}</span>
                <p className="tile-name">{card.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
