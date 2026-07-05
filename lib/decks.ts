/**
 * Registro de mazos ilustrados disponibles. Cada mazo es un conjunto propio
 * de imágenes bajo `/public/cards/<deck.id>/<categoria>/<slug>.jpg`.
 *
 * El mazo por defecto vive directamente en `/public/cards/<categoria>/`
 * (sin carpeta de mazo) para no romper las imágenes ya existentes. Cualquier
 * mazo nuevo que se añada en el futuro debe vivir en su propia carpeta
 * `/public/cards/<deck.id>/` con las mismas subcarpetas: `arcanos-mayores`,
 * `bastos`, `copas`, `espadas`, `oros`.
 */

export interface Deck {
  id: string;
  name: string;
  description: string;
}

export const DECKS: Deck[] = [
  {
    id: "dorado-mistico",
    name: "Dorado Místico",
    description:
      "Mazo insignia de Taroteca: ilustraciones simbolistas en tinta negra con acentos dorados, estilo art déco con resonancias de manuscrito medieval.",
  },
];

export const DEFAULT_DECK_ID = DECKS[0].id;

export function getDeckById(id: string): Deck | undefined {
  return DECKS.find((deck) => deck.id === id);
}
