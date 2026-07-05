import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de Taroteca",
  description:
    "Qué es Taroteca, qué será Tarot Hub y cómo puedes colaborar con la comunidad.",
};

export default function AboutPage() {
  return (
    <div className="container section-pad">
      <div className="row">
        <div className="col-12 col-lg-8">
          <h1 className="font-display display-5 mb-4">Acerca de Taroteca</h1>

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Qué es Taroteca</h2>
            <p className="lead-narrow">
              Taroteca es una biblioteca abierta de tarot y el primer hogar de una
              comunidad en crecimiento. Aquí puedes consultar los significados de
              los Arcanos , leer las tiradas que publicamos y compartir
              tus propias interpretaciones, sin registros ni cuentas.
            </p>
            <p className="lead-narrow mb-0">
              Esta versión es deliberadamente simple. Preferimos abrir las puertas
              pronto y crecer junto a quienes entren, antes que esperar a tener la
              plataforma perfecta.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Qué será Tarot Hub</h2>
            <p className="lead-narrow mb-0">
              Tarot Hub es el proyecto grande que vendrá después: una plataforma
              completa con perfiles, lectores, reservas y mucho más. Taroteca es
              su semilla. Todo lo que aprendamos aquí, y todo lo que la comunidad
              nos cuente, dará forma a ese siguiente paso.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="font-display fs-2 mb-3">Próximas funciones</h2>
            <ul className="lead-narrow mb-0" style={{ paddingLeft: "1.2rem" }}>
              <li className="mb-2">Ilustraciones propias para las 78 cartas y variantes.</li>
              <li className="mb-2">Combinaciones y correspondencias entre cartas.</li>
              <li className="mb-2">Archivo histórico de tiradas con buscador.</li>
              <li>Cuentas opcionales para guardar tus interpretaciones.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display fs-2 mb-3">Cómo colaborar</h2>
            <p className="lead-narrow mb-4">
              La forma más valiosa de ayudar ahora mismo es participar: comenta
              las cartas, interpreta las tiradas y cuéntanos qué echas de menos a
              través del buzón. Cada mensaje se lee.
            </p>
            <Link href="/sugerencias" className="btn btn-gold">
              Enviar una sugerencia
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
