"use client";

import { useState } from "react";

interface Spread {
  id: string;
  title: string;
  question: string;
  context: string;
  cards: string[];
  spread_date: string;
}

interface SpreadsAdminListProps {
  spreads: Spread[];
  onDeleted: (id: string) => void;
}

export function SpreadsAdminList({ spreads, onDeleted }: SpreadsAdminListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (deleting) return;
    if (!confirm("¿Estás seguro de que quieres eliminar esta tirada?")) return;

    setDeleting(id);
    setError(null);

    try {
      const res = await fetch(`/api/admin/spreads/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.error ?? "No se pudo eliminar la tirada.");
        return;
      }
      onDeleted(id);
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setDeleting(null);
    }
  }

  if (spreads.length === 0) {
    return (
      <div className="panel p-4 text-center text-muted-2">
        <p className="mb-0">No hay tiradas creadas aún.</p>
      </div>
    );
  }

  return (
    <div className="panel p-0">
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Título</th>
              <th>Cartas</th>
              <th style={{ width: "80px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {spreads.map((spread) => (
              <tr key={spread.id}>
                <td className="text-muted-2 small">{spread.spread_date}</td>
                <td>{spread.title}</td>
                <td className="small">
                  {spread.cards.length} carta{spread.cards.length !== 1 ? "s" : ""}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(spread.id)}
                    disabled={deleting === spread.id}
                    className="btn btn-sm btn-outline-danger"
                  >
                    {deleting === spread.id ? "..." : "✕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && (
        <div className="p-3 text-danger small text-center">{error}</div>
      )}
    </div>
  );
}
