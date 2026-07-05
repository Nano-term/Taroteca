"use client";

import Link from "next/link";
import type { CardSection } from "@/lib/sections";

export function SectionsAdminList({
  sections,
  onDeleted,
}: {
  sections: CardSection[];
  onDeleted: (id: string) => void;
}) {
  async function handleDelete(section: CardSection) {
    if (!confirm(`¿Borrar la sección "${section.name}" y todas sus cartas? Esta acción no se puede deshacer.`)) {
      return;
    }
    const res = await fetch(`/api/admin/sections/${section.id}`, { method: "DELETE" });
    if (res.ok) onDeleted(section.id);
  }

  if (sections.length === 0) {
    return <p className="text-muted-2">Todavía no hay secciones creadas.</p>;
  }

  return (
    <div>
      {sections.map((section) => (
        <article key={section.id} className="comment-item">
          <div className="d-flex align-items-baseline justify-content-between gap-3">
            <span className="comment-author">{section.name}</span>
            <div className="d-flex align-items-center gap-3 flex-shrink-0">
              <Link href={`/admin/secciones/${section.slug}`} className="btn btn-ghost btn-sm">
                Gestionar cartas
              </Link>
              <button type="button" className="btn btn-delete" onClick={() => handleDelete(section)}>
                Eliminar
              </button>
            </div>
          </div>
          {section.description && <p className="comment-body mt-2 mb-0">{section.description}</p>}
        </article>
      ))}
    </div>
  );
}
