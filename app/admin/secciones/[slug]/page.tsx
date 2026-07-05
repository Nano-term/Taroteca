"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "@/components/AdminProvider";
import { getBrowserSupabase } from "@/lib/supabase";
import type { CardSection, SectionCard } from "@/lib/sections";
import { SectionCardForm } from "@/components/admin/SectionCardForm";
import { SectionCardsAdminList } from "@/components/admin/SectionCardsAdminList";

export default function AdminSectionCardsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isAdmin, ready } = useAdmin();

  const [section, setSection] = useState<CardSection | null>(null);
  const [cards, setCards] = useState<SectionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<SectionCard | undefined>(undefined);

  const load = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data: sectionData } = await supabase
      .from("card_sections")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!sectionData) {
      setLoading(false);
      return;
    }
    setSection(sectionData as CardSection);
    const { data: cardsData } = await supabase
      .from("section_cards")
      .select("*")
      .eq("section_id", sectionData.id)
      .order("sort_order", { ascending: true });
    setCards((cardsData as SectionCard[]) ?? []);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  if (!ready || loading) {
    return <div className="container section-pad" />;
  }

  if (!isAdmin) {
    return (
      <div className="container section-pad">
        <div className="panel p-4">
          <p className="text-muted-2 mb-0">
            Activa el modo administrador (triple click en el logo) para gestionar cartas.
          </p>
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="container section-pad">
        <div className="panel p-4">
          <p className="text-danger mb-0">No se encontró la sección &quot;{slug}&quot;.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-pad">
      <Link href="/admin/secciones" className="btn btn-ghost btn-sm mb-4">
        Volver a secciones
      </Link>
      <h1 className="font-display display-5 mb-5">{section.name}: cartas</h1>

      <SectionCardForm
        key={editingCard?.id ?? "new"}
        sectionId={section.id}
        hasReversed={section.has_reversed}
        initialCard={editingCard}
        onSaved={(card) => {
          setCards((current) => {
            const exists = current.some((c) => c.id === card.id);
            return exists ? current.map((c) => (c.id === card.id ? card : c)) : [...current, card];
          });
          setEditingCard(undefined);
        }}
        onCancel={editingCard ? () => setEditingCard(undefined) : undefined}
      />

      <SectionCardsAdminList
        cards={cards}
        onEdit={(card) => setEditingCard(card)}
        onDeleted={(id) => setCards((current) => current.filter((c) => c.id !== id))}
      />
    </div>
  );
}
