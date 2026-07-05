"use client";

import { useState } from "react";
import { MoonStars } from "@phosphor-icons/react";

interface SectionCardImageProps {
  imageUrl: string | null;
  name: string;
  large?: boolean;
}

/**
 * Igual que CardImage (mismo placeholder tipográfico si falta la imagen),
 * pero para cartas de sección: recibe la URL de Storage ya resuelta en vez
 * de construir una ruta estática. CardImage.tsx no se toca.
 */
export function SectionCardImage({ imageUrl, name, large = false }: SectionCardImageProps) {
  const [missing, setMissing] = useState(false);

  return (
    <div className={`card-frame ${large ? "is-large" : ""}`}>
      {imageUrl && !missing ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          loading={large ? "eager" : "lazy"}
          onError={() => setMissing(true)}
        />
      ) : (
        <div className="card-placeholder" aria-label={name}>
          <MoonStars className="ph-ornament" size={large ? 28 : 18} weight="thin" />
          <span className="ph-name">{name}</span>
        </div>
      )}
    </div>
  );
}
