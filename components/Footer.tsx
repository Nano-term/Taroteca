import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <span className="font-display fs-5">
            TAROTECA<span className="text-gold">.</span>
          </span>
          <p className="mb-0 mt-1">
            Una biblioteca abierta de tarot, en construcción junto a su comunidad.
          </p>
        </div>
        <nav className="d-flex gap-4">
          <Link href="/">Biblioteca</Link>
          <Link href="/tiradas">Tiradas</Link>
          <Link href="/sugerencias">Sugerencias</Link>
          <Link href="/acerca">Acerca de</Link>
        </nav>
      </div>
    </footer>
  );
}
