"use client";

import { useCallback, useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";
import { useAdmin } from "@/components/AdminProvider";

interface CommentRow {
  id: string;
  name: string;
  content: string;
  created_at: string;
}

interface CommentsProps {
  table: "card_comments" | "daily_spread_comments";
  column: "card_slug" | "spread_id";
  value: string;
  prompt?: string;
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function Comments({ table, column, value, prompt }: CommentsProps) {
  const supabase = getBrowserSupabase();
  const { isAdmin } = useAdmin();

  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoadError(null);
    const { data, error } = await supabase
      .from(table)
      .select("id, name, content, created_at")
      .eq(column, value)
      .order("created_at", { ascending: false });
    if (error) {
      setLoadError("No se pudieron cargar los comentarios.");
    } else {
      setComments((data as CommentRow[]) ?? []);
    }
    setLoading(false);
  }, [supabase, table, column, value]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!supabase || sending) return;
    const trimmedName = name.trim();
    const trimmedContent = content.trim();
    if (!trimmedName || !trimmedContent) {
      setSendError("Escribe tu nombre y tu comentario.");
      return;
    }
    setSending(true);
    setSendError(null);
    const { error } = await supabase
      .from(table)
      .insert({ [column]: value, name: trimmedName, content: trimmedContent });
    setSending(false);
    if (error) {
      setSendError("No se pudo publicar el comentario. Inténtalo de nuevo.");
      return;
    }
    setName("");
    setContent("");
    setLoading(true);
    loadComments();
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id }),
    });
    if (res.ok) {
      setComments((current) => current.filter((comment) => comment.id !== id));
    }
  }

  if (!supabase) {
    return (
      <div className="panel p-4">
        <p className="text-muted-2 mb-0">
          Los comentarios estarán disponibles cuando se configure la conexión con
          Supabase.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Comentarios">
      {prompt && <p className="spread-question mb-4">{prompt}</p>}

      <form onSubmit={handleSubmit} className="panel p-4 mb-4" noValidate>
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <label htmlFor={`name-${value}`} className="form-label">
              Nombre
            </label>
            <input
              id={`name-${value}`}
              type="text"
              className="form-control"
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor={`content-${value}`} className="form-label">
              Comentario
            </label>
            <textarea
              id={`content-${value}`}
              className="form-control"
              rows={3}
              maxLength={2000}
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
            {sending ? "Publicando..." : "Publicar comentario"}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-muted-2">Cargando comentarios...</p>
      ) : loadError ? (
        <p className="text-danger">{loadError}</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-2">
          Aún no hay comentarios. Sé la primera persona en compartir tu lectura.
        </p>
      ) : (
        <div>
          {comments.map((comment) => (
            <article key={comment.id} className="comment-item">
              <div className="d-flex align-items-baseline justify-content-between gap-3">
                <span className="comment-author">{comment.name}</span>
                <div className="d-flex align-items-center gap-3 flex-shrink-0">
                  <time className="comment-date" dateTime={comment.created_at}>
                    {dateFormatter.format(new Date(comment.created_at))}
                  </time>
                  {isAdmin && (
                    <button
                      type="button"
                      className="btn btn-delete"
                      onClick={() => handleDelete(comment.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
              <p className="comment-body mt-2">{comment.content}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
