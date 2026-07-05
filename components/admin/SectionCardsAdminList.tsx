"use client";

import { getSectionCardImageUrl, type SectionCard } from "@/lib/sections";

export function SectionCardsAdminList({
  cards,
  onEdit,
  onDeleted,
}: {
  cards: SectionCard[];
  onEdit: (card: SectionCard) => void;
  onDeleted: (id: string) => void;
}) {
  async function handleDelete(card: SectionCard) {
    if (!confirm(`¿Borrar la carta "${card.name}"?`)) return;
    const res = await fetch(`/api/admin/section-cards/${card.id}`, { method: "DELETE" });
    if (res.ok) onDeleted(card.id);
  }

  if (cards.length === 0) {
    return <p className="text-muted-2">Todavía no hay cartas en esta sección.</p>;
  }

  return (
    <div>
      {cards.map((card) => {
        const imageUrl = getSectionCardImageUrl(card.image_path);
        return (
          <article key={card.id} className="comment-item">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div className="d-flex align-items-center gap-3">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="" style={{ width: "40px", height: "68px", objectFit: "cover", borderRadius: "4px" }} />
                ) : (
                  <div
                    style={{
                      width: "40px",
                      height: "68px",
                      borderRadius: "4px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                    aria-hidden
                  />
                )}
                <span className="comment-author">{card.name}</span>
              </div>
              <div className="d-flex align-items-center gap-3 flex-shrink-0">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(card)}>
                  Editar
                </button>
                <button type="button" className="btn btn-delete" onClick={() => handleDelete(card)}>
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
