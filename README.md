# Taroteca

Biblioteca abierta de tarot y primer hogar de una comunidad en crecimiento.
MVP temporal previo al proyecto grande, **Tarot Hub**.

## Qué incluye

- **Biblioteca de cartas**: las 78 cartas del tarot (22 Arcanos Mayores +
  56 Menores en cuatro palos) con significado derecho e invertido, filtros
  por categoría, buscador y página de detalle (`/carta/[slug]`).
- **Comentarios comunitarios** en cada carta, sin registro.
- **Tiradas diarias** (`/tiradas`) publicadas manualmente, con comentarios.
- **Buzón de sugerencias** (`/sugerencias`), visible solo para administración.
- **Modo administrador oculto** (triple click en el logo) para moderar.
- **Acerca de** (`/acerca`): qué es Taroteca y qué será Tarot Hub.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| UI | Bootstrap 5.3 con tema oscuro propio |
| Datos | Supabase (PostgreSQL + RLS) |
| Hosting | Netlify |

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Rellena las claves de Supabase y la contraseña de administración

# 3. Crear la base de datos
# Pega en el SQL Editor de Supabase, en orden:
#   supabase/migrations/001_initial_schema.sql
#   supabase/migrations/002_minor_arcana.sql

# 4. Arrancar en desarrollo
npm run dev
```

La app funciona sin Supabase configurado: la biblioteca de cartas es estática y
las secciones dinámicas muestran un aviso hasta que existan las claves.

## Documentación

| Documento | Contenido |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Estructura del proyecto y decisiones técnicas |
| [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | Tablas, políticas RLS y cómo crear tiradas |
| [DEPLOY_NETLIFY.md](docs/DEPLOY_NETLIFY.md) | Despliegue paso a paso en Netlify |
| [IMAGE_GENERATION_GUIDE.md](docs/IMAGE_GENERATION_GUIDE.md) | Prompts para generar las 22 cartas |
| [ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) | Modo administrador y moderación |

## Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | cliente y servidor | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente y servidor | Clave anónima (sujeta a RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | solo servidor | Clave service role para moderación |
| `ADMIN_PASSWORD` | solo servidor | Contraseña del modo administrador |

## Qué NO incluye (a propósito)

Login, registro, reputación, insignias, marketplace, lectores, reservas, pagos,
favoritos y seguidores pertenecen al futuro **Tarot Hub**, no a este MVP.
