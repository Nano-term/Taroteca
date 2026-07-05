"use client";

import { useState } from "react";
import type { CardSection } from "@/lib/sections";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Crea una nueva sección de cartas (oráculos, Lenormand, etc.). */
export function SectionForm({ onCreated }: { onCreated: (section: CardSection) => void }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [hasReversed, setHasReversed] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim() || null,
          has_reversed: hasReversed,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "No se pudo crear la sección.");
        return;
      }
      onCreated(data.section as CardSection);
      setName("");
      setSlug("");
      setSlugTouched(false);
      setDescription("");
      setHasReversed(true);
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4 mb-4" noValidate>
      <h2 className="font-display fs-3 mb-3">Nueva sección</h2>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="section-name" className="form-label">
            Nombre
          </label>
          <input
            id="section-name"
            type="text"
            className="form-control"
            maxLength={80}
            value={name}
            onChange={(event) => {
              const value = event.target.value;
              setName(value);
              if (!slugTouched) setSlug(slugify(value));
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="section-slug" className="form-label">
            Slug (URL, no se puede cambiar después)
          </label>
          <input
            id="section-slug"
            type="text"
            className="form-control"
            maxLength={80}
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="section-description" className="form-label">
            Descripción <span className="text-muted-2">(opcional)</span>
          </label>
          <textarea
            id="section-description"
            className="form-control"
            rows={2}
            maxLength={500}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              id="section-has-reversed"
              type="checkbox"
              className="form-check-input"
              checked={hasReversed}
              onChange={(event) => setHasReversed(event.target.checked)}
            />
            <label htmlFor="section-has-reversed" className="form-check-label">
              Este sistema usa significado invertido
            </label>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-danger small mt-3 mb-0" role="alert">
          {error}
        </p>
      )}
      <div className="mt-3">
        <button type="submit" className="btn btn-gold" disabled={sending || !name || !slug}>
          {sending ? "Creando..." : "Crear sección"}
        </button>
      </div>
    </form>
  );
}
