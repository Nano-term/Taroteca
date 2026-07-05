"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/AdminProvider";

interface SpellRow {
  id: string;
  title: string;
  author_name: string | null;
  content: string;
  status: "pending" | "approved";
  created_at: string;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

/** Moderación de hechizos: aprobar los pendientes o eliminar cualquiera. */
export function SpellsAdminList() {
  const { isAdmin, ready } = useAdmin();
  const [spells, setSpells] = useState<SpellRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/spells");
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "No se pudieron cargar los hechizos.");
      } else {
        setSpells(data.spells ?? []);
      }
    } catch {
      setError("Error de red al cargar los hechizos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (!ready || !isAdmin) return null;

  async function handleApprove(id: string) {
    const res = await fetch(`/api/admin/spells/${id}/approve`, { method: "POST" });
    if (res.ok) {
      setSpells((current) =>
        current.map((spell) => (spell.id === id ? { ...spell, status: "approved" } : spell))
      );
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "spells", id }),
    });
    if (res.ok) {
      setSpells((current) => current.filter((spell) => spell.id !== id));
    }
  }

  return (
    <section className="mt-5" aria-label="Moderación de hechizos">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="font-display fs-3 mb-0">Hechizos recibidos</h2>
        <span className="admin-chip">Solo administración</span>
      </div>

      {loading ? (
        <p className="text-muted-2">Cargando hechizos...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : spells.length === 0 ? (
        <p className="text-muted-2">Todavía no hay hechizos en la cola.</p>
      ) : (
        <div>
          {spells.map((spell) => (
            <article key={spell.id} className="comment-item">
              <div className="d-flex align-items-baseline justify-content-between gap-3">
                <span className="comment-author">
                  {spell.author_name || "Anónimo"}{" "}
                  <span className={`admin-chip ms-2 ${spell.status === "pending" ? "text-warning" : ""}`}>
                    {spell.status === "pending" ? "Pendiente" : "Aprobado"}
                  </span>
                </span>
                <div className="d-flex align-items-center gap-3 flex-shrink-0">
                  <time className="comment-date" dateTime={spell.created_at}>
                    {dateFormatter.format(new Date(spell.created_at))}
                  </time>
                  {spell.status === "pending" && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleApprove(spell.id)}>
                      Aprobar
                    </button>
                  )}
                  <button type="button" className="btn btn-delete" onClick={() => handleDelete(spell.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="font-display fs-5 mt-2 mb-1">{spell.title}</p>
              <p className="comment-body mb-0" style={{ whiteSpace: "pre-wrap" }}>
                {spell.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
