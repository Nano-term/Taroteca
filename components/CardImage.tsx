"use client";

import { useState } from "react";
import { MoonStars } from "@phosphor-icons/react";
import { buildCardImagePath, type CardCategory } from "@/lib/cards";

interface CardImageProps {
  slug: string;
  name: string;
  roman: string;
  /** "arcanos-mayores" o el palo de la carta. Por defecto, Arcanos Mayores. */
  category?: CardCategory;
  /** Id del mazo ilustrado a usar (ver lib/decks.ts). Por defecto, el mazo principal. */
  deck?: string;
  large?: boolean;
}

/**
 * Imagen de carta con placeholder automático: si la ilustración del mazo
 * todavía no existe en /public/cards/, se muestra una carta tipográfica
 * elegante.
 */
export function CardImage({
  slug,
  name,
  roman,
  category = "arcanos-mayores",
  deck,
  large = false,
}: CardImageProps) {
  const [missing, setMissing] = useState(false);

  return (
    <div className={`card-frame ${large ? "is-large" : ""}`}>
      {!missing ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={buildCardImagePath(category, slug, deck)}
          alt={`Carta del tarot: ${name}`}
          loading={large ? "eager" : "lazy"}
          onError={() => setMissing(true)}
        />
      ) : (
        <div className="card-placeholder" aria-label={`Carta del tarot: ${name}`}>
          <span className="ph-roman">{roman}</span>
          <MoonStars className="ph-ornament" size={large ? 28 : 18} weight="thin" />
          <span className="ph-name">{name}</span>
        </div>
      )}
    </div>
  );
}
