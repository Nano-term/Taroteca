"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { List, X, ShieldStar } from "@phosphor-icons/react";
import { useAdmin } from "@/components/AdminProvider";
import { AdminModal } from "@/components/AdminModal";

const NAV_LINKS = [
  { href: "/", label: "Biblioteca" },
  { href: "/secciones", label: "Secciones" },
  { href: "/tiradas", label: "Tiradas" },
  { href: "/hechizos", label: "Hechizos" },
  { href: "/sugerencias", label: "Sugerencias" },
  { href: "/acerca", label: "Acerca de" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isAdmin, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Activación oculta del modo administrador: triple click en el logo.
  function handleBrandClick(event: React.MouseEvent) {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 700);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      event.preventDefault();
      if (!isAdmin) setShowModal(true);
    }
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname.startsWith("/carta");
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="site-nav sticky-top">
        <nav className="container d-flex align-items-center justify-content-between py-2">
          <Link
            href="/"
            className="site-brand"
            onClick={handleBrandClick}
            draggable={false}
          >
            TAROTECA<span className="brand-mark">.</span>
          </Link>

          <div className="d-none d-lg-flex align-items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-t ${isActive(link.href) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <span className="admin-chip ms-2">
                <ShieldStar size={14} weight="fill" />
                Administración
              </span>
            )}
            {isAdmin && (
              <Link href="/admin" className="nav-link-t">
                Panel
              </Link>
            )}
            {isAdmin && (
              <button
                type="button"
                className="btn btn-ghost btn-sm ms-2"
                onClick={() => logout()}
              >
                Salir
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm d-lg-none"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </nav>

        {open && (
          <div className="container d-lg-none pb-3 d-flex flex-column gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-t ${isActive(link.href) ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="nav-link-t"
                onClick={() => setOpen(false)}
              >
                Panel
              </Link>
            )}
            {isAdmin && (
              <button
                type="button"
                className="btn btn-ghost btn-sm align-self-start mt-2"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Salir del modo administración
              </button>
            )}
          </div>
        )}
      </header>

      {showModal && <AdminModal onClose={() => setShowModal(false)} />}
    </>
  );
}
