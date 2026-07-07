"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { getBrowserSupabase } from "@/lib/supabase";
import { SpreadForm } from "@/components/admin/SpreadForm";
import { SpreadsAdminList } from "@/components/admin/SpreadsAdminList";

interface Spread {
  id: string;
  title: string;
  question: string;
  context: string;
  cards: string[];
  spread_date: string;
}

export default function AdminSpreadsPage() {
  const { isAdmin, ready } = useAdmin();
  const [spreads, setSpreads] = useState<Spread[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("daily_spreads")
      .select("*")
      .order("spread_date", { ascending: false });
    setSpreads((data as Spread[]) ?? []);
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
            Activa el modo administrador (triple click en el logo) para gestionar tiradas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container section-pad">
      <h1 className="font-display display-5 mb-5">Gestionar tiradas</h1>
      <SpreadForm onCreated={(spread) => setSpreads((current) => [spread, ...current])} />
      <SpreadsAdminList
        spreads={spreads}
        onDeleted={(id) => setSpreads((current) => current.filter((s) => s.id !== id))}
      />
    </div>
  );
}
