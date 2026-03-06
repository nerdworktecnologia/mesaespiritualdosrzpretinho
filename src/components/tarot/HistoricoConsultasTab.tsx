import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Clock, Search, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Consultation {
  id: string;
  client_name: string;
  question: string | null;
  tema: string | null;
  cabala_superior: string | null;
  cabala_inferior: string | null;
  cabala_lateral: string | null;
  cabala_central: string | null;
  cabala_final: string | null;
  buzios_abertos: number | null;
  buzios_odu: string | null;
  tarot_card_names: string[] | null;
  interpretation_destino: string | null;
  interpretation_energia: string | null;
  interpretation_situacao: string | null;
  interpretation_orientacao: string | null;
  interpretation_resumo: string | null;
  reading_type: string | null;
  created_at: string;
}

export default function HistoricoConsultasTab() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setConsultations(data as Consultation[]);
    setLoading(false);
  };

  useEffect(() => { fetchConsultations(); }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("consultations").delete().eq("id", id);
    setConsultations((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClear = async () => {
    if (!confirm("Apagar todo o histórico de consultas?")) return;
    await supabase.from("consultations").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setConsultations([]);
  };

  const filtered = consultations.filter(
    (c) =>
      (c.client_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.question || "").toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">📜 Histórico de Consultas</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={fetchConsultations} className="text-muted-foreground text-xs">Atualizar</Button>
            {consultations.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-destructive text-xs">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {consultations.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou pergunta..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-secondary border-border pl-10" />
          </div>
        )}

        {loading && <p className="text-center text-muted-foreground text-sm py-8">Carregando...</p>}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="font-cinzel text-xs tracking-wider">Nenhuma consulta registrada</p>
          </div>
        )}

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((entry) => {
            const isExpanded = expanded === entry.id;
            return (
              <div key={entry.id} className="card-mystical rounded border border-border hover:border-foreground/20 transition-colors">
                <div
                  className="p-3 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : entry.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-cinzel text-foreground text-xs font-bold truncate">{entry.client_name}</span>
                        {entry.tema && entry.tema !== "geral" && (
                          <span className="text-muted-foreground text-[10px] bg-secondary px-2 py-0.5 rounded">{entry.tema}</span>
                        )}
                        <span className="text-muted-foreground text-[10px] bg-secondary px-2 py-0.5 rounded">{entry.reading_type || "painel"}</span>
                      </div>
                      {entry.question && <p className="text-foreground/50 text-xs mt-1 truncate">{entry.question}</p>}
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <p className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" /> {formatDate(entry.created_at)}
                        </p>
                        {entry.cabala_central && <span className="text-[10px] text-accent">🔢 {entry.cabala_central}</span>}
                        {entry.buzios_odu && <span className="text-[10px] text-accent">🐚 {entry.buzios_odu}</span>}
                        {entry.tarot_card_names && entry.tarot_card_names.length > 0 && (
                          <span className="text-[10px] text-accent">🃏 {entry.tarot_card_names.join(", ")}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      <Button
                        variant="ghost" size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-up">
                      {entry.cabala_superior && (
                        <div>
                          <p className="font-cinzel text-xs text-foreground/70 mb-1">🔢 Cabala de Ifá</p>
                          <div className="flex gap-2 flex-wrap text-xs">
                            <span className="bg-secondary px-2 py-1 rounded">Sup: {entry.cabala_superior}</span>
                            <span className="bg-secondary px-2 py-1 rounded">Inf: {entry.cabala_inferior}</span>
                            <span className="bg-secondary px-2 py-1 rounded">Lat: {entry.cabala_lateral}</span>
                            <span className="bg-secondary px-2 py-1 rounded">Cen: {entry.cabala_central}</span>
                            <span className="bg-secondary px-2 py-1 rounded">Fin: {entry.cabala_final}</span>
                          </div>
                        </div>
                      )}
                      {entry.buzios_odu && (
                        <div>
                          <p className="font-cinzel text-xs text-foreground/70 mb-1">🐚 Búzios</p>
                          <p className="text-sm text-foreground/80">{entry.buzios_abertos} abertos → {entry.buzios_odu}</p>
                        </div>
                      )}
                      {entry.tarot_card_names && entry.tarot_card_names.length > 0 && (
                        <div>
                          <p className="font-cinzel text-xs text-foreground/70 mb-1">🃏 Cartas</p>
                          <p className="text-sm text-foreground/80">{entry.tarot_card_names.join(" • ")}</p>
                        </div>
                      )}
                      {entry.interpretation_destino && (
                        <div className="space-y-2 pt-2 border-t border-border/50">
                          <p className="font-cinzel text-xs text-primary">📜 Interpretação</p>
                          <p className="text-sm text-foreground/70"><span className="font-semibold">Destino:</span> {entry.interpretation_destino}</p>
                          <p className="text-sm text-foreground/70"><span className="font-semibold">Energia:</span> {entry.interpretation_energia}</p>
                          <p className="text-sm text-foreground/70"><span className="font-semibold">Situação:</span> {entry.interpretation_situacao}</p>
                          <p className="text-sm text-foreground/80"><span className="font-semibold">Orientação:</span> {entry.interpretation_orientacao}</p>
                          {entry.interpretation_resumo && (
                            <p className="text-sm text-primary italic font-cinzel">"{entry.interpretation_resumo}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
