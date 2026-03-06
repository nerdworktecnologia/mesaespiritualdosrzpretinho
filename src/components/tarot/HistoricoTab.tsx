import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, deleteEntry, HistoryEntry } from "@/utils/history";
import { Trash2, Clock, Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HistoricoTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setHistory(getHistory()); }, []);
  const refresh = () => setHistory(getHistory());

  const handleClear = () => {
    if (confirm("Apagar todo o histórico?")) { clearHistory(); refresh(); }
  };

  const handleDelete = (id: string) => { deleteEntry(id); refresh(); };

  const filtered = history.filter(
    (e) =>
      e.clientName.toLowerCase().includes(search.toLowerCase()) ||
      e.question.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="card-mystical mt-4 animate-fade-up">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-cinzel text-foreground tracking-wider text-sm uppercase">Histórico</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={refresh} className="text-muted-foreground text-xs">Atualizar</Button>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-destructive text-xs">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {history.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border-border pl-10"
            />
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="font-cinzel text-xs tracking-wider">Nenhum atendimento registrado</p>
          </div>
        )}

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="card-mystical rounded border border-border hover:border-foreground/20 transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            >
              <div className="p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-cinzel text-foreground text-xs font-bold truncate">
                        {entry.clientName || "Sem nome"}
                      </span>
                      <span className="text-muted-foreground text-[10px] bg-secondary px-2 py-0.5 rounded">
                        {entry.readingType}
                      </span>
                    </div>
                    <p className="text-foreground/50 text-xs mt-1 truncate">{entry.question}</p>
                    {entry.clientWhatsapp && (
                      <p className="text-muted-foreground text-[10px] mt-0.5 flex items-center gap-1">
                        <Phone className="h-2.5 w-2.5" /> {entry.clientWhatsapp}
                      </p>
                    )}
                    <p className="text-muted-foreground text-[10px] mt-1 flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {formatDate(entry.timestamp)}
                      <span className="ml-2">Cartas: {entry.cardNumbers.join(", ")}</span>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {expanded === entry.id && (
                  <div className="mt-3 pt-3 border-t border-border animate-fade-up">
                    <pre className="whitespace-pre-wrap font-crimson text-foreground/60 text-sm leading-relaxed">
                      {entry.result}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
