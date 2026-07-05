"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/AdminProvider";

interface SuggestionRow {
  id: string;
  name: string | null;
  message: string;
  created_at: string;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function SuggestionsAdminList() {
  const { isAdmin, ready } = useAdmin();
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/suggestions");
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "No se pudieron cargar las sugerencias.");
      } else {
        setSuggestions(data.suggestions ?? []);
      }
    } catch {
      setError("Error de red al cargar las sugerencias.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (!ready || !isAdmin) return null;

  async function handleDelete(id: string) {
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "suggestions", id }),
    });
    if (res.ok) {
      setSuggestions((current) => current.filter((item) => item.id !== id));
    }
  }

  return (
    <section className="mt-5" aria-label="Sugerencias recibidas">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="font-display fs-3 mb-0">Sugerencias recibidas</h2>
        <span className="admin-chip">Solo administración</span>
      </div>

      {loading ? (
        <p className="text-muted-2">Cargando sugerencias...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : suggestions.length === 0 ? (
        <p className="text-muted-2">Todavía no hay sugerencias en el buzón.</p>
      ) : (
        <div>
          {suggestions.map((item) => (
            <article key={item.id} className="comment-item">
              <div className="d-flex align-items-baseline justify-content-between gap-3">
                <span className="comment-author">{item.name || "Anónimo"}</span>
                <div className="d-flex align-items-center gap-3 flex-shrink-0">
                  <time className="comment-date" dateTime={item.created_at}>
                    {dateFormatter.format(new Date(item.created_at))}
                  </time>
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="comment-body mt-2">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
