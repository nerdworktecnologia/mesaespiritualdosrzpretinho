import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, deleteEntry, HistoryEntry } from "@/utils/history";
import { Trash2, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HistoricoTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const refresh = () => setHistory(getHistory());

  const handleClear = () => {
    if (confirm("Apagar todo o histórico?")) {
      clearHistory();
      refresh();
    }
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    refresh();
  };

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
    <Card className="card-mystical mystic-glow mt-4 animate-fade-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-cinzel gold-text text-xl">📜 Histórico de Atendimentos</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={refresh}>🔄</Button>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-accent">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou pergunta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-muted/50 border-border pl-10"
            />
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-cinzel">Nenhum atendimento registrado</p>
            <p className="text-sm mt-1">Os atendimentos aparecerão aqui automaticamente.</p>
          </div>
        )}

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="card-mystical rounded-lg border border-border/50 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-cinzel text-primary text-sm font-bold truncate">
                        {entry.clientName || "Sem nome"}
                      </span>
                      <span className="text-muted-foreground text-xs bg-secondary/50 px-2 py-0.5 rounded">
                        {entry.readingType}
                      </span>
                    </div>
                    <p className="text-foreground/70 text-sm mt-1 truncate">{entry.question}</p>
                    <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(entry.timestamp)}
                      <span className="ml-2">Cartas: {entry.cardNumbers.join(", ")}</span>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-accent"
                    onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {expanded === entry.id && (
                  <div className="mt-3 pt-3 border-t border-border/30 animate-fade-up">
                    <pre className="whitespace-pre-wrap font-crimson text-foreground/80 text-sm leading-relaxed">
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
