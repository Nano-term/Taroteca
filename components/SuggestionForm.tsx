"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase";

export function SuggestionForm() {
  const supabase = getBrowserSupabase();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!supabase) {
    return (
      <div className="panel p-4">
        <p className="text-muted-2 mb-0">
          El buzón estará disponible cuando se configure la conexión con Supabase.
        </p>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="panel p-4 text-center">
        <p className="font-display fs-4 mb-1">Gracias por tu sugerencia</p>
        <p className="text-muted-2 mb-3">
          La leeremos con calma. Este buzón solo lo ve el equipo de Taroteca.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setSent(false);
            setName("");
            setMessage("");
          }}
        >
          Enviar otra sugerencia
        </button>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Escribe tu sugerencia antes de enviarla.");
      return;
    }
    setSending(true);
    setError(null);
    const { error: insertError } = await supabase!.from("suggestions").insert({
      name: name.trim() || null,
      message: trimmedMessage,
    });
    setSending(false);
    if (insertError) {
      setError("No se pudo enviar la sugerencia. Inténtalo de nuevo.");
      return;
    }
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4" noValidate>
      <div className="mb-3">
        <label htmlFor="suggestion-name" className="form-label">
          Nombre <span className="text-muted-2">(opcional)</span>
        </label>
        <input
          id="suggestion-name"
          type="text"
          className="form-control"
          maxLength={60}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="suggestion-message" className="form-label">
          Mensaje
        </label>
        <textarea
          id="suggestion-message"
          className="form-control"
          rows={4}
          maxLength={3000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <p className="text-muted-2 small mt-2 mb-0">
          Cuéntanos qué te gustaría ver en Taroteca: cartas, funciones, contenidos.
        </p>
      </div>
      {error && (
        <p className="text-danger small mb-3" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-gold" disabled={sending}>
        {sending ? "Enviando..." : "Enviar sugerencia"}
      </button>
    </form>
  );
}
