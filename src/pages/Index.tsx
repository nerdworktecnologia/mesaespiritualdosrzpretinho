import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AtendimentoTab from "@/components/tarot/AtendimentoTab";
import CabalaTab from "@/components/tarot/CabalaTab";
import TiragemTab from "@/components/tarot/TiragemTab";
import LiveModeTab from "@/components/tarot/LiveModeTab";
import HistoricoTab from "@/components/tarot/HistoricoTab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-2xl md:text-3xl gold-text font-bold tracking-wider">
              🎩 Tarot do Malandro
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-crimson italic">
              Sistema de Tarot para Lives — Zé Pelintra & Zé Pretinho
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 mt-4">
        <Tabs defaultValue="atendimento" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-secondary/50 border border-border">
            <TabsTrigger value="atendimento" className="font-cinzel text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              📋 Atendimento
            </TabsTrigger>
            <TabsTrigger value="cabala" className="font-cinzel text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🔢 Cabala
            </TabsTrigger>
            <TabsTrigger value="tiragem" className="font-cinzel text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🔮 Tiragem
            </TabsTrigger>
            <TabsTrigger value="live" className="font-cinzel text-xs md:text-sm data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              🔥 Live
            </TabsTrigger>
            <TabsTrigger value="historico" className="font-cinzel text-xs md:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              📜 Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="atendimento"><AtendimentoTab /></TabsContent>
          <TabsContent value="cabala"><CabalaTab /></TabsContent>
          <TabsContent value="tiragem"><TiragemTab /></TabsContent>
          <TabsContent value="live"><LiveModeTab /></TabsContent>
          <TabsContent value="historico"><HistoricoTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
