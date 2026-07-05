"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { getBrowserSupabase } from "@/lib/supabase";
import type { CardSection } from "@/lib/sections";
import { SectionForm } from "@/components/admin/SectionForm";
import { SectionsAdminList } from "@/components/admin/SectionsAdminList";

export default function AdminSectionsPage() {
  const { isAdmin, ready } = useAdmin();
  const [sections, setSections] = useState<CardSection[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("card_sections")
      .select("*")
      .order("created_at", { ascending: true });
    setSections((data as CardSection[]) ?? []);
    setLoading(false);
  }, []);

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
            Activa el modo administrador (triple click en el logo) para gestionar secciones.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-pad">
      <h1 className="font-display display-5 mb-5">Gestionar secciones</h1>
      <SectionForm onCreated={(section) => setSections((current) => [...current, section])} />
      <SectionsAdminList
        sections={sections}
        onDeleted={(id) => setSections((current) => current.filter((s) => s.id !== id))}
      />
    </div>
  );
}
