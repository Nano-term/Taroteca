export type SpreadType = "single" | "three-cards" | "cross";

export interface SpreadTemplate {
  type: SpreadType;
  name: string;
  description: string;
  positions: SpreadPosition[];
}

export interface SpreadPosition {
  id: string;
  name: string;
  meaning: string;
}

export const SPREAD_TEMPLATES: Record<SpreadType, SpreadTemplate> = {
  "single": {
    type: "single",
    name: "Una Carta",
    description: "Tirada simple de una carta para obtener una respuesta o reflexión rápida.",
    positions: [
      { id: "main", name: "La Carta", meaning: "Respuesta o reflexión" },
    ],
  },
  "three-cards": {
    type: "three-cards",
    name: "Tres Cartas",
    description: "Tirada de tres cartas: pasado, presente y consejo o futuro.",
    positions: [
      { id: "left", name: "Pasado", meaning: "Lo que ya sucedió" },
      { id: "center", name: "Presente", meaning: "La situación actual" },
      { id: "right", name: "Consejo", meaning: "Lo que se recomienda" },
    ],
  },
  "cross": {
    type: "cross",
    name: "La Cruz",
    description: "Tirada de cinco cartas en forma de cruz: centro, norte, sur, este y oeste.",
    positions: [
      { id: "center", name: "Centro", meaning: "Situación central" },
      { id: "north", name: "Norte", meaning: "Lo que se aproxima" },
      { id: "south", name: "Sur", meaning: "Lo que se aleja" },
      { id: "east", name: "Este", meaning: "Influencia positiva" },
      { id: "west", name: "Oeste", meaning: "Obstáculo o desafío" },
    ],
  },
};
