"use client";

import { useState } from "react";
import { getSectionCardImageUrl, type SectionCard } from "@/lib/sections";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp(String.fromCharCode(0x0300) + "-" + String.fromCharCode(0x036f), "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface SectionCardFormProps {
  sectionId: string;
  hasReversed: boolean;
  /** Si se pasa, el formulario edita esta carta en vez de crear una nueva. */
  initialCard?: SectionCard;
  onSaved: (card: SectionCard) => void;
  onCancel?: () => void;
}

/** Crea o edita una carta de una sección, con subida de imagen opcional. */
export function SectionCardForm({
  sectionId,
  hasReversed,
  initialCard,
  onSaved,
  onCancel,
}: SectionCardFormProps) {
  const isEditing = Boolean(initialCard);

  const [name, setName] = useState(initialCard?.name ?? "");
  const [slug, setSlug] = useState(initialCard?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [keywords, setKeywords] = useState(initialCard?.keywords.join(", ") ?? "");
  const [meaningUpright, setMeaningUpright] = useState(initialCard?.meaning_upright ?? "");
  const [meaningReversed, setMeaningReversed] = useState(initialCard?.meaning_reversed ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    getSectionCardImageUrl(initialCard?.image_path ?? null)
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    if (!name.trim() || !slug.trim() || !meaningUpright.trim()) {
      setError("Completa nombre, slug y significado general.");
      return;
    }
    setSending(true);
    setError(null);

    const form = new FormData();
    form.set("section_id", sectionId);
    form.set("slug", slug.trim());
    form.set("name", name.trim());
    form.set("keywords", keywords);
    form.set("meaning_upright", meaningUpright.trim());
    form.set("meaning_reversed", meaningReversed.trim());
    if (imageFile) form.set("image", imageFile);

    try {
      const url = isEditing
        ? `/api/admin/section-cards/${initialCard!.id}`
        : "/api/admin/section-cards";
      const res = await fetch(url, { method: isEditing ? "PATCH" : "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "No se pudo guardar la carta.");
        return;
      }
      onSaved(data.card as SectionCard);
      if (!isEditing) {
        setName("");
        setSlug("");
        setSlugTouched(false);
        setKeywords("");
        setMeaningUpright("");
        setMeaningReversed("");
        setImageFile(null);
        setPreview(null);
      }
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-4 mb-4" noValidate>
      <h2 className="font-display fs-3 mb-3">{isEditing ? "Editar carta" : "Nueva carta"}</h2>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="card-name" className="form-label">
            Nombre
          </label>
          <input
            id="card-name"
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
          <label htmlFor="card-slug" className="form-label">
            Slug {isEditing && <span className="text-muted-2">(no se puede cambiar)</span>}
          </label>
          <input
            id="card-slug"
            type="text"
            className="form-control"
            maxLength={80}
            value={slug}
            disabled={isEditing}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="card-keywords" className="form-label">
            Palabras clave <span className="text-muted-2">(separadas por comas)</span>
          </label>
          <input
            id="card-keywords"
            type="text"
            className="form-control"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="card-meaning-upright" className="form-label">
            Significado general
          </label>
          <textarea
            id="card-meaning-upright"
            className="form-control"
            rows={3}
            maxLength={4000}
            value={meaningUpright}
            onChange={(event) => setMeaningUpright(event.target.value)}
          />
        </div>
        {hasReversed && (
          <div className="col-12">
            <label htmlFor="card-meaning-reversed" className="form-label">
              Significado invertido
            </label>
            <textarea
              id="card-meaning-reversed"
              className="form-control"
              rows={3}
              maxLength={4000}
              value={meaningReversed}
              onChange={(event) => setMeaningReversed(event.target.value)}
            />
          </div>
        )}
        <div className="col-12">
          <label htmlFor="card-image" className="form-label">
            Imagen <span className="text-muted-2">(JPG, PNG o WebP, máx. 4 MB — opcional)</span>
          </label>
          <input
            id="card-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="form-control"
            onChange={handleImageChange}
          />
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Vista previa" className="mt-2" style={{ maxWidth: "160px", borderRadius: "8px" }} />
          )}
        </div>
      </div>
      {error && (
        <p className="text-danger small mt-3 mb-0" role="alert">
          {error}
        </p>
      )}
      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-gold" disabled={sending}>
          {sending ? "Guardando..." : isEditing ? "Guardar cambios" : "Añadir carta"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
