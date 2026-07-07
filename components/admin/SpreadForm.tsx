"use client";

import { useState } from "react";
import { SPREAD_TEMPLATES, type SpreadType } from "@/lib/spreads";
import { DECKS } from "@/lib/decks";
import { ALL_CARDS } from "@/lib/cards";

interface SpreadFormProps {
  onCreated: (spread: {
    id: string;
    title: string;
    question: string;
    context: string;
    cards: string[];
    spread_date: string;
  }) => void;
}

export function SpreadForm({ onCreated }: SpreadFormProps) {
  const [context, setContext] = useState("");
  const [selectedDeck, setSelectedDeck] = useState(DECKS[0].id);
  const [selectedSpreadType, setSelectedSpreadType] = useState<SpreadType>("three-cards");
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spreadTemplate = SPREAD_TEMPLATES[selectedSpreadType];
  const positionCount = spreadTemplate.positions.length;

  function handleCardSelect(index: number, cardSlug: string) {
    const newCards = [...selectedCards];
    const card = ALL_CARDS.find((c) => c.slug === cardSlug);
    newCards[index] = card?.name || "";
    setSelectedCards(newCards);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    if (selectedCards.length !== positionCount || selectedCards.some((c) => !c)) {
      setError("Debes seleccionar una carta para cada posición.");
      return;
    }
    if (new Set(selectedCards).size !== selectedCards.length) {
      setError("No puedes repetir la misma carta en dos posiciones.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const today = new Date().toISOString().split("T")[0];
      const res = await fetch("/api/admin/spreads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: spreadTemplate.name,
          question: context.split("\n")[0] || `Tirada ${spreadTemplate.name}`,
          context: context.trim(),
          cards: selectedCards,
          spread_date: today,
          spread_type: selectedSpreadType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "No se pudo crear la tirada.");
        return;
      }

      onCreated(data.spread);
      setContext("");
      setSelectedCards([]);
      setSelectedDeck(DECKS[0].id);
      setSelectedSpreadType("three-cards");
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  const availableCards = ALL_CARDS.map((card) => ({ name: card.name, slug: card.slug }));

  return (
    <form onSubmit={handleSubmit} className="panel p-4 mb-4" noValidate>
      <h2 className="font-display fs-3 mb-3">Nueva tirada</h2>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="spread-deck" className="form-label">
            Baraja
          </label>
          <select
            id="spread-deck"
            className="form-select"
            value={selectedDeck}
            onChange={(e) => setSelectedDeck(e.target.value)}
          >
            {DECKS.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="spread-type" className="form-label">
            Tipo de tirada
          </label>
          <select
            id="spread-type"
            className="form-select"
            value={selectedSpreadType}
            onChange={(e) => {
              setSelectedSpreadType(e.target.value as SpreadType);
              setSelectedCards([]);
            }}
          >
            {Object.values(SPREAD_TEMPLATES).map((template) => (
              <option key={template.type} value={template.type}>
                {template.name}
              </option>
            ))}
          </select>
          <small className="text-muted-2 d-block mt-1">{spreadTemplate.description}</small>
        </div>

        <div className="col-12">
          <label htmlFor="spread-context" className="form-label">
            Contexto
          </label>
          <textarea
            id="spread-context"
            className="form-control"
            rows={3}
            maxLength={1000}
            placeholder="Escribe el contexto de la tirada, la pregunta o el tema que se aborda..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </div>

        <div className="col-12">
          <fieldset className="border rounded p-3">
            <legend className="w-auto px-2 mb-0 small text-muted-2">
              Estructura de la tirada: selecciona una carta para cada posición
            </legend>

            <div className="row g-3 mt-0">
              {spreadTemplate.positions.map((position, index) => {
                const usedElsewhere = selectedCards.filter((_, i) => i !== index);
                const options = availableCards.filter(
                  (card) => card.name === selectedCards[index] || !usedElsewhere.includes(card.name)
                );
                return (
                  <div key={position.id} className="col-12 col-md-6">
                    <label htmlFor={`card-${position.id}`} className="form-label small">
                      <strong>{position.name}</strong> — {position.meaning}
                    </label>
                    <select
                      id={`card-${position.id}`}
                      className="form-select form-select-sm"
                      value={selectedCards[index] ? availableCards.find((c) => c.name === selectedCards[index])?.slug || "" : ""}
                      onChange={(e) => handleCardSelect(index, e.target.value)}
                    >
                      <option value="">— Selecciona una carta —</option>
                      {options.map((card) => (
                        <option key={card.slug} value={card.slug}>
                          {card.name}
                        </option>
                      ))}
                    </select>
                    {selectedCards[index] && (
                      <small className="text-muted-2 d-block mt-1">Seleccionado: {selectedCards[index]}</small>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>

      {error && (
        <p className="text-danger small mt-3 mb-0" role="alert">
          {error}
        </p>
      )}

      <div className="mt-3">
        <button
          type="submit"
          className="btn btn-gold"
          disabled={sending || !context || selectedCards.length !== positionCount}
        >
          {sending ? "Creando..." : "Crear tirada"}
        </button>
      </div>
    </form>
  );
}
