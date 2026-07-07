"use client";

import Link from "next/link";
import { useAdmin } from "@/components/AdminProvider";

export default function AdminPage() {
  const { isAdmin, ready } = useAdmin();

  if (!ready) {
    return <div className="container section-pad" />;
  }

  if (!isAdmin) {
    return (
      <div className="container section-pad">
        <div className="panel p-4">
          <p className="text-muted-2 mb-0">
            Activa el modo administrador (triple click en el logo) para acceder a las herramientas de administración.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-pad">
      <h1 className="font-display display-5 mb-5">Panel de administración</h1>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <Link href="/admin/tiradas" className="panel p-4 text-decoration-none d-block h-100">
            <h2 className="font-display fs-4 mb-2">Gestionar tiradas</h2>
            <p className="text-muted-2 small mb-0">
              Crea y gestiona las tiradas diarias del tarot.
            </p>
          </Link>
        </div>

        <div className="col-12 col-md-6">
          <Link href="/admin/secciones" className="panel p-4 text-decoration-none d-block h-100">
            <h2 className="font-display fs-4 mb-2">Gestionar secciones</h2>
            <p className="text-muted-2 small mb-0">
              Crea oráculos, Lenormand y otras secciones de cartas.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
