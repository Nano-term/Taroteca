"use client";

import { useEffect, useRef, useState } from "react";
import { useAdmin } from "@/components/AdminProvider";

export function AdminModal({ onClose }: { onClose: () => void }) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!password || sending) return;
    setSending(true);
    setError(null);
    const result = await login(password);
    setSending(false);
    if (result.ok) {
      onClose();
    } else {
      setError(result.error ?? "Contraseña incorrecta");
    }
  }

  return (
    <div
      className="t-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Acceso de administración"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="t-modal">
        <h2 className="font-display fs-4 mb-1">Acceso de administración</h2>
        <p className="text-muted-2 small mb-4">
          Introduce la contraseña para activar el modo temporal de moderación.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="admin-password" className="form-label">
              Contraseña
            </label>
            <input
              ref={inputRef}
              id="admin-password"
              type="password"
              className="form-control"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <p className="text-danger small mt-2 mb-0" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-gold"
              disabled={sending || !password}
            >
              {sending ? "Comprobando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
