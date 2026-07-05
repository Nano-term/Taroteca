import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section-pad text-center">
      <p className="font-display display-5 mb-2">Esta carta no está en el mazo</p>
      <p className="text-muted-2 mb-4">
        La página que buscas no existe o ha cambiado de lugar.
      </p>
      <Link href="/" className="btn btn-gold">
        Volver a la biblioteca
      </Link>
    </div>
  );
}
