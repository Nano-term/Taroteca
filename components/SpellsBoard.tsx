"use client";

import { useCallback, useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";

interface SpellRow {
  id: string;
  title: string;
  author_name: string | null;
  content: string;
  created_at: string;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Listado público de hechizos aprobados + formulario de envío (sin login). */
export function SpellsBoard() {
  const supabase = getBrowserSupabase();

  const [spells, setSpells] = useState<SpellRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const loadSpells = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoadError(null);
    const { data, error } = await supabase
      .from("spells")
      .select("id, title, author_name, content, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError("No se pudieron cargar los hechizos.");
    } else {
      setSpells((data as SpellRow[]) ?? []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadSpells();
  }, [loadSpells]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || sending) return;
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) {
      setSendError("Escribe un título y el contenido del hechizo.");
      return;
    }
    setSending(true);
    setSendError(null);
    const { error } = await supabase.from("spells").insert({
      title: trimmedTitle,
      author_name: authorName.trim() || null,
      content: trimmedContent,
      status: "pending",
    });
    setSending(false);
    if (error) {
      setSendError("No se pudo enviar el hechizo. Inténtalo de nuevo.");
      return;
    }
    setTitle("");
    setAuthorName("");
    setContent("");
    setSent(true);
  }

  if (!supabase) {
    return (
      <div className="panel p-4">
        <p className="text-muted-2 mb-0">
          Los hechizos estarán disponibles cuando se configure la conexión con Supabase.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Hechizos">
      {sent ? (
        <div className="panel p-4 text-center mb-4">
          <p className="font-display fs-4 mb-1">Gracias por compartir tu hechizo</p>
          <p className="text-muted-2 mb-3">
            Antes de publicarse pasa por una revisión rápida del equipo de Taroteca.
          </p>
          <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
            Compartir otro hechizo
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="panel p-4 mb-4" noValidate>
          <div className="row g-3">
            <div className="col-12 col-md-7">
              <label htmlFor="spell-title" className="form-label">
                Título
              </label>
              <input
                id="spell-title"
                type="text"
                className="form-control"
                maxLength={150}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="col-12 col-md-5">
              <label htmlFor="spell-author" className="form-label">
                Tu nombre <span className="text-muted-2">(opcional)</span>
              </label>
              <input
                id="spell-author"
                type="text"
                className="form-control"
                maxLength={60}
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="spell-content" className="form-label">
                Hechizo
              </label>
              <textarea
                id="spell-content"
                className="form-control"
                rows={5}
                maxLength={5000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
          </div>
          {sendError && (
            <p className="text-danger small mt-3 mb-0" role="alert">
              {sendError}
            </p>
          )}
          <div className="mt-3">
            <button type="submit" className="btn btn-gold" disabled={sending}>
              {sending ? "Enviando..." : "Compartir hechizo"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-muted-2">Cargando hechizos...</p>
      ) : loadError ? (
        <p className="text-danger">{loadError}</p>
      ) : spells.length === 0 ? (
        <p className="text-muted-2">
          Todavía no hay hechizos publicados. Sé la primera persona en compartir el tuyo.
        </p>
      ) : (
        <div>
          {spells.map((spell) => (
            <article key={spell.id} className="comment-item">
              <div className="d-flex align-items-baseline justify-content-between gap-3">
                <span className="comment-author">{spell.author_name || "Anónimo"}</span>
                <time className="comment-date" dateTime={spell.created_at}>
                  {dateFormatter.format(new Date(spell.created_at))}
                </time>
              </div>
              <p className="font-display fs-4 mt-2 mb-1">{spell.title}</p>
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
