import type { Metadata } from "next";
import { SpellsBoard } from "@/components/SpellsBoard";
import { SpellsAdminList } from "@/components/admin/SpellsAdminList";

export const metadata: Metadata = {
  title: "Hechizos",
  description: "Hechizos compartidos por la comunidad de Taroteca, sin registro.",
};

export default function SpellsPage() {
  return (
    <div className="container section-pad">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h1 className="font-display display-5 mb-3">Hechizos</h1>
          <p className="lead-narrow mb-5">
            Comparte tus propios hechizos y descubre los de la comunidad. Cada
            envío pasa por una revisión rápida antes de publicarse.
          </p>
          <SpellsBoard />
          <SpellsAdminList />
        </div>
      </div>
    </div>
  );
}
