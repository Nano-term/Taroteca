import type { Metadata } from "next";
import { SuggestionForm } from "@/components/SuggestionForm";
import { SuggestionsAdminList } from "@/components/SuggestionsAdminList";

export const metadata: Metadata = {
  title: "Buzón de sugerencias",
  description:
    "Cuéntanos qué te gustaría ver en Taroteca. Las sugerencias solo las lee el equipo.",
};

export default function SuggestionsPage() {
  return (
    <div className="container section-pad">
      <div className="row">
        <div className="col-12 col-lg-7">
          <h1 className="font-display display-5 mb-3">Buzón de sugerencias</h1>
          <p className="lead-narrow mb-5">
            Taroteca se construye escuchando. Escríbenos qué cartas, funciones o
            contenidos te gustaría encontrar aquí. Los mensajes son privados:
            solo los lee el equipo.
          </p>
          <SuggestionForm />
          <SuggestionsAdminList />
        </div>
      </div>
    </div>
  );
}
