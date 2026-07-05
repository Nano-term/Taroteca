/**
 * Genera supabase/migrations/002_minor_arcana.sql a partir de lib/cards.ts.
 * Única fuente de verdad de los significados: el código de la app.
 *
 * Uso: npm run generate:seed
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { MAJOR_ARCANA, MINOR_ARCANA } from "../lib/cards";

const esc = (value: string) => value.replace(/'/g, "''");

const lines: string[] = [];

lines.push(`-- ============================================================
-- TAROTECA - Migración 002: Arcanos Menores
-- Requiere 001_initial_schema.sql ejecutada previamente.
-- Archivo generado por scripts/generate-seed.ts (no editar a mano).
-- ============================================================

-- ------------------------------------------------------------
-- 1. Nuevas columnas en cards: categoría, palo y orden global
-- ------------------------------------------------------------

alter table public.cards add column if not exists category text not null default 'mayor';
alter table public.cards drop constraint if exists cards_category_check;
alter table public.cards add constraint cards_category_check
  check (category in ('mayor', 'menor'));

alter table public.cards add column if not exists suit text;
alter table public.cards drop constraint if exists cards_suit_check;
alter table public.cards add constraint cards_suit_check
  check (suit is null or suit in ('bastos', 'copas', 'espadas', 'oros'));

alter table public.cards add column if not exists sort_order integer;

-- ------------------------------------------------------------
-- 2. Arcanos Mayores existentes: orden y significados completos
-- ------------------------------------------------------------
`);

for (const card of MAJOR_ARCANA) {
  lines.push(`update public.cards set
  category = 'mayor',
  suit = null,
  sort_order = ${card.id},
  meaning_up = '${esc(card.meaningUpright)}',
  meaning_rev = '${esc(card.meaningReversed)}'
where slug = '${card.slug}';
`);
}

lines.push(`-- ------------------------------------------------------------
-- 3. Seed: los 56 Arcanos Menores
-- ------------------------------------------------------------
`);

for (const card of MINOR_ARCANA) {
  lines.push(`insert into public.cards
  (slug, name, arcana_number, category, suit, sort_order, meaning_up, meaning_rev)
values (
  '${card.slug}',
  '${esc(card.name)}',
  ${card.number},
  'menor',
  '${card.suit}',
  ${card.id},
  '${esc(card.meaningUpright)}',
  '${esc(card.meaningReversed)}'
)
on conflict (slug) do update set
  name = excluded.name,
  arcana_number = excluded.arcana_number,
  category = excluded.category,
  suit = excluded.suit,
  sort_order = excluded.sort_order,
  meaning_up = excluded.meaning_up,
  meaning_rev = excluded.meaning_rev;
`);
}

lines.push(`-- ------------------------------------------------------------
-- 4. Cierre: el orden global queda obligatorio y único
-- ------------------------------------------------------------

alter table public.cards alter column sort_order set not null;

create unique index if not exists cards_sort_order_idx
  on public.cards (sort_order);
`);

const outPath = join(
  import.meta.dirname,
  "..",
  "supabase",
  "migrations",
  "002_minor_arcana.sql"
);
writeFileSync(outPath, lines.join("\n"));
console.log(
  `002_minor_arcana.sql generado: ${MAJOR_ARCANA.length} updates + ${MINOR_ARCANA.length} inserts`
);
