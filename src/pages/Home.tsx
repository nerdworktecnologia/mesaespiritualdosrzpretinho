import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  Plus,
  Search,
  Phone,
  Trash2,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getHistory, HistoryEntry } from "@/utils/history";

/* ── Client storage helpers ── */
interface Client {
  id: string;
  name: string;
  whatsapp: string;
  birthDate: string;
  notes: string;
  createdAt: string;
  lastVisit?: string;
  totalReadings: number;
}

const CLIENTS_KEY = "tarot-clients-v2";

function getClients(): Client[] {
  try {
    return JSON.parse(localStorage.getItem(CLIENTS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveClients(clients: Client[]) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

/* ── Agenda storage helpers ── */
interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  notes: string;
}

const AGENDA_KEY = "tarot-agenda";

function getAgenda(): Appointment[] {
  try {
    return JSON.parse(localStorage.getItem(AGENDA_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveAgenda(items: Appointment[]) {
  localStorage.setItem(AGENDA_KEY, JSON.stringify(items));
}

/* ── Main Home Page ── */
export default function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"dashboard" | "clients" | "agenda">("dashboard");

  const navigateToMesa = (clientName?: string, whatsapp?: string, birthDate?: string) => {
    const params = new URLSearchParams();
    if (clientName) params.set("name", clientName);
    if (whatsapp) params.set("whatsapp", whatsapp);
    if (birthDate) params.set("birthDate", birthDate);
    const qs = params.toString();
    navigate(`/mesa${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-lg md:text-xl tracking-[0.2em] uppercase text-foreground spirit-highlight">
              Sr. Zé Pretinho
            </h1>
            <p className="text-muted-foreground text-xs mt-1 font-crimson italic">
              Painel de Atendimento
            </p>
          </div>
          <Button
            onClick={() => navigateToMesa()}
            className="font-cinzel text-xs tracking-wider uppercase bg-foreground text-background hover:bg-foreground/90 gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Abrir Mesa
          </Button>
        </div>
      </header>

      {/* Nav */}
      <nav className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto flex">
          {[
            { key: "dashboard" as const, label: "Painel", icon: Star },
            { key: "clients" as const, label: "Clientes", icon: Users },
            { key: "agenda" as const, label: "Agenda", icon: Calendar },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-cinzel tracking-wider uppercase transition-colors border-b-2 ${
                activeSection === key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground/70"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-4 mt-4">
        {activeSection === "dashboard" && <DashboardSection onNavigate={setActiveSection} onOpenMesa={navigateToMesa} />}
        {activeSection === "clients" && <ClientsSection />}
        {activeSection === "agenda" && <AgendaSection onAtender={navigateToMesa} />}
      </main>
    </div>
  );
}

/* ── Dashboard ── */
function DashboardSection({ onNavigate, onOpenMesa }: { onNavigate: (s: "clients" | "agenda") => void; onOpenMesa: (clientName?: string, whatsapp?: string, birthDate?: string) => void }) {
  const history = getHistory();
  const clients = getClients();
  const agenda = getAgenda();
  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = agenda.filter((a) => a.date === today);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Clientes" value={clients.length} icon={Users} />
        <StatCard label="Consultas" value={history.length} icon={Star} />
        <StatCard label="Hoje" value={todayAppointments.length} icon={Clock} />
        <StatCard label="Agendados" value={agenda.filter((a) => a.date >= today).length} icon={Calendar} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button onClick={() => onOpenMesa()} className="card-mystical rounded-lg p-5 border border-border text-left hover:border-foreground/30 transition-colors group">
          <Sparkles className="h-5 w-5 text-foreground/60 mb-2 group-hover:text-foreground transition-colors" />
          <p className="font-cinzel text-foreground text-sm tracking-wider">Iniciar Consulta</p>
          <p className="text-muted-foreground text-xs mt-1 font-crimson">Abrir a mesa espiritual</p>
        </button>
        <button onClick={() => onNavigate("clients")} className="card-mystical rounded-lg p-5 border border-border text-left hover:border-foreground/30 transition-colors group">
          <Plus className="h-5 w-5 text-foreground/60 mb-2 group-hover:text-foreground transition-colors" />
          <p className="font-cinzel text-foreground text-sm tracking-wider">Novo Cliente</p>
          <p className="text-muted-foreground text-xs mt-1 font-crimson">Cadastrar consulente</p>
        </button>
        <button onClick={() => onNavigate("agenda")} className="card-mystical rounded-lg p-5 border border-border text-left hover:border-foreground/30 transition-colors group">
          <Calendar className="h-5 w-5 text-foreground/60 mb-2 group-hover:text-foreground transition-colors" />
          <p className="font-cinzel text-foreground text-sm tracking-wider">Agendar</p>
          <p className="text-muted-foreground text-xs mt-1 font-crimson">Marcar atendimento</p>
        </button>
      </div>

      {/* Today's agenda */}
      {todayAppointments.length > 0 && (
        <Card className="card-mystical border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel text-sm tracking-wider uppercase text-foreground">Agenda de Hoje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayAppointments.map((a) => {
              const client = clients.find((c) => c.name === a.clientName);
              return (
              <div key={a.id} className="flex items-center justify-between p-3 rounded bg-secondary border border-border">
                <div>
                  <p className="font-cinzel text-foreground text-xs">{a.clientName}</p>
                  <p className="text-muted-foreground text-[10px]">{a.time} {a.notes && `· ${a.notes}`}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => onOpenMesa(a.clientName, client?.whatsapp, client?.birthDate)} className="text-xs gap-1">
                  <ArrowRight className="h-3 w-3" /> Atender
                </Button>
              </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Recent readings */}
      {history.length > 0 && (
        <Card className="card-mystical border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-cinzel text-sm tracking-wider uppercase text-foreground">Últimas Consultas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.slice(0, 5).map((h) => (
              <div key={h.id} className="p-3 rounded bg-secondary border border-border">
                <div className="flex justify-between items-start">
                  <p className="font-cinzel text-foreground text-xs">{h.clientName || "Sem nome"}</p>
                  <p className="text-muted-foreground text-[10px]">{new Date(h.timestamp).toLocaleDateString("pt-BR")}</p>
                </div>
                <p className="text-muted-foreground text-[11px] mt-1 line-clamp-1 font-crimson">{h.question}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="card-mystical rounded-lg p-4 border border-border text-center">
      <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
      <p className="font-cinzel text-foreground text-xl">{value}</p>
      <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{label}</p>
    </div>
  );
}

/* ── Clients Section ── */
function ClientsSection() {
  const [clients, setClients] = useState<Client[]>(getClients);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", whatsapp: "", birthDate: "", notes: "" });

  const filtered = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [clients, search]
  );

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newClient: Client = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      whatsapp: form.whatsapp.trim(),
      birthDate: form.birthDate,
      notes: form.notes.trim(),
      createdAt: new Date().toISOString(),
      totalReadings: 0,
    };
    const updated = [newClient, ...clients];
    setClients(updated);
    saveClients(updated);
    setForm({ name: "", whatsapp: "", birthDate: "", notes: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = clients.filter((c) => c.id !== id);
    setClients(updated);
    saveClients(updated);
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-border"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-cinzel text-xs tracking-wider gap-1 bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4" /> Novo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-cinzel tracking-wider text-sm uppercase">Cadastrar Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Nome *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border" placeholder="Nome completo" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">WhatsApp</Label>
                  <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="bg-secondary border-border" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Nascimento</Label>
                  <Input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="bg-secondary border-border" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Observações</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-secondary border-border" placeholder="Notas sobre o cliente" />
              </div>
              <Button onClick={handleAdd} className="w-full font-cinzel text-xs tracking-wider bg-foreground text-background hover:bg-foreground/90">
                Salvar Cliente
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filtered.length === 0 ? (
        <div className="card-mystical rounded-lg p-8 border border-border text-center">
          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm font-crimson">
            {search ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado ainda."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((client) => (
            <div key={client.id} className="card-mystical rounded-lg p-4 border border-border flex items-center justify-between group">
              <div>
                <p className="font-cinzel text-foreground text-sm tracking-wider">{client.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  {client.whatsapp && (
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {client.whatsapp}
                    </span>
                  )}
                  {client.birthDate && (
                    <span className="text-muted-foreground text-[10px]">
                      Nasc: {new Date(client.birthDate + "T12:00").toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </div>
                {client.notes && <p className="text-foreground/40 text-[10px] mt-1 font-crimson">{client.notes}</p>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(client.id)}
                className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Agenda Section ── */
function AgendaSection({ onAtender }: { onAtender: (clientName?: string, whatsapp?: string, birthDate?: string) => void }) {
  const [items, setItems] = useState<Appointment[]>(getAgenda);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ clientName: "", date: "", time: "", notes: "" });
  const today = new Date().toISOString().split("T")[0];

  const upcoming = useMemo(
    () => items.filter((a) => a.date >= today).sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)),
    [items, today]
  );
  const past = useMemo(
    () => items.filter((a) => a.date < today).sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`)),
    [items, today]
  );

  const handleAdd = () => {
    if (!form.clientName.trim() || !form.date || !form.time) return;
    const newItem: Appointment = {
      id: crypto.randomUUID(),
      clientName: form.clientName.trim(),
      date: form.date,
      time: form.time,
      notes: form.notes.trim(),
    };
    const updated = [...items, newItem];
    setItems(updated);
    saveAgenda(updated);
    setForm({ clientName: "", date: "", time: "", notes: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((a) => a.id !== id);
    setItems(updated);
    saveAgenda(updated);
  };

  const clients = getClients();

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-foreground text-sm tracking-wider uppercase">Agenda</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-cinzel text-xs tracking-wider gap-1 bg-foreground text-background hover:bg-foreground/90">
              <Plus className="h-4 w-4" /> Agendar
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-cinzel tracking-wider text-sm uppercase">Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Cliente *</Label>
                <Input
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="bg-secondary border-border"
                  placeholder="Nome do cliente"
                  list="client-suggestions"
                />
                {clients.length > 0 && (
                  <datalist id="client-suggestions">
                    {clients.map((c) => <option key={c.id} value={c.name} />)}
                  </datalist>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Data *</Label>
                  <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Hora *</Label>
                  <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="bg-secondary border-border" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-[10px] uppercase tracking-wider">Observações</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="bg-secondary border-border" placeholder="Notas" />
              </div>
              <Button onClick={handleAdd} className="w-full font-cinzel text-xs tracking-wider bg-foreground text-background hover:bg-foreground/90">
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {upcoming.length === 0 && past.length === 0 ? (
        <div className="card-mystical rounded-lg p-8 border border-border text-center">
          <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm font-crimson">Nenhum agendamento.</p>
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="space-y-2">
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-cinzel">Próximos</p>
              {upcoming.map((a) => (
                <AppointmentCard key={a.id} appointment={a} onDelete={handleDelete} onAtender={onAtender} clients={clients} />
              ))}
            </div>
          )}
          {past.length > 0 && (
            <div className="space-y-2 mt-6">
              <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-cinzel">Passados</p>
              {past.slice(0, 10).map((a) => (
                <AppointmentCard key={a.id} appointment={a} onDelete={handleDelete} isPast onAtender={onAtender} clients={clients} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function AppointmentCard({ appointment: a, onDelete, isPast, onAtender, clients }: { appointment: Appointment; onDelete: (id: string) => void; isPast?: boolean; onAtender: (clientName?: string, whatsapp?: string, birthDate?: string) => void; clients: Client[] }) {
  const client = clients.find((c) => c.name === a.clientName);
  return (
    <div className={`card-mystical rounded-lg p-4 border border-border flex items-center justify-between group ${isPast ? "opacity-50" : ""}`}>
      <div>
        <p className="font-cinzel text-foreground text-sm tracking-wider">{a.clientName}</p>
        <p className="text-muted-foreground text-[10px] mt-1">
          {new Date(a.date + "T12:00").toLocaleDateString("pt-BR")} às {a.time}
          {a.notes && ` · ${a.notes}`}
        </p>
      </div>
      <div className="flex items-center gap-1">
        {!isPast && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onAtender(a.clientName, client?.whatsapp, client?.birthDate)}
            className="text-xs gap-1 text-foreground/70 hover:text-foreground"
          >
            <ArrowRight className="h-3 w-3" /> Atender
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(a.id)}
          className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
