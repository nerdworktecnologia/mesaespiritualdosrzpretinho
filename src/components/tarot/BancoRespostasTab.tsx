import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Category = "amor" | "volta" | "traicao" | "trabalho" | "inveja" | "protecao" | "dinheiro";

const categories: { key: Category; label: string; icon: string }[] = [
  { key: "amor", label: "Amor", icon: "❤️" },
  { key: "volta", label: "Volta", icon: "🔄" },
  { key: "traicao", label: "Traição", icon: "💔" },
  { key: "trabalho", label: "Trabalho", icon: "💼" },
  { key: "inveja", label: "Inveja", icon: "🧿" },
  { key: "protecao", label: "Proteção", icon: "🛡️" },
  { key: "dinheiro", label: "Dinheiro", icon: "💰" },
];

const respostas: Record<Category, { rapida: string; media: string; completa: string }[]> = {
  amor: [
    {
      rapida: "Existe sentimento, mas precisa de paciência.",
      media: "A espiritualidade mostra que existe sentimento nessa situação, mas o tempo precisa trabalhar.",
      completa: "Filho(a), a espiritualidade mostra que o sentimento existe e é verdadeiro. Mas nem tudo que é real acontece no tempo que a gente quer. O conselho é ter paciência e cuidar da sua energia. O que for seu, chega. Saravá.",
    },
    {
      rapida: "Tem amor, mas tem obstáculo no caminho.",
      media: "O sentimento é forte, mas existe algo que ainda precisa ser resolvido antes de seguir.",
      completa: "Filho(a), a espiritualidade mostra amor verdadeiro, mas tem pedra no caminho. Pode ser orgulho, pode ser outra pessoa, pode ser o próprio medo. O conselho é não forçar. Deixa o tempo limpar o que precisa ser limpo. Saravá.",
    },
    {
      rapida: "Caminho aberto para o amor.",
      media: "A energia é favorável. O amor pode florescer se houver entrega verdadeira.",
      completa: "Filho(a), o caminho do amor está aberto. A espiritualidade sorri para essa situação. Mas lembre: amor de verdade pede verdade. Seja honesto(a) com seus sentimentos. O que é seu, ninguém tira. Saravá.",
    },
  ],
  volta: [
    {
      rapida: "Pode voltar, mas depende do tempo.",
      media: "A volta é possível, mas não será imediata. O tempo precisa amadurecer essa situação.",
      completa: "Filho(a), a espiritualidade mostra que a volta é possível. Mas tudo tem seu tempo. Não adianta forçar porta que ainda não está pronta pra abrir. Cuide de você, e o que for seu vai encontrar o caminho de volta. Saravá.",
    },
    {
      rapida: "Existe chance de retorno, mas com mudanças.",
      media: "A pessoa pode voltar, mas não será do mesmo jeito. Algo precisa mudar dos dois lados.",
      completa: "Filho(a), a espiritualidade mostra chance de retorno. Mas preste atenção: se voltar do mesmo jeito, vai embora de novo. Algo precisa mudar. O conselho é trabalhar em você primeiro. Saravá.",
    },
    {
      rapida: "Não é o momento da volta.",
      media: "O caminho da volta está difícil agora. A espiritualidade pede paciência e desapego.",
      completa: "Filho(a), agora não é o momento da volta. A espiritualidade pede que você cuide de si. Às vezes o não é proteção do guia. Não force o que não quer fluir. Faça uma limpeza espiritual e confie. Saravá.",
    },
  ],
  traicao: [
    {
      rapida: "Existe energia de falsidade ao redor.",
      media: "A espiritualidade mostra que nem tudo é o que parece. Alguém não está sendo verdadeiro.",
      completa: "Filho(a), a espiritualidade mostra energia de falsidade. Nem todo sorriso é sincero. Fique atento(a) aos sinais. O conselho é observar mais e falar menos. A verdade sempre aparece no tempo certo. Saravá.",
    },
    {
      rapida: "Tem algo escondido nessa situação.",
      media: "Existe algo que está sendo ocultado. A verdade vai aparecer, mas é preciso ter olhos abertos.",
      completa: "Filho(a), a espiritualidade mostra que tem coisa escondida. Pode ser traição, pode ser mentira, pode ser omissão. O espelho vai mostrar a verdade. O conselho é não confrontar agora — observe e espere o momento certo. Saravá.",
    },
    {
      rapida: "A situação é limpa. Não há traição.",
      media: "A espiritualidade não mostra energia de traição nessa situação. Existe lealdade.",
      completa: "Filho(a), pode ficar tranquilo(a). A espiritualidade não mostra traição. O sentimento é verdadeiro do outro lado. Mas cuide da sua insegurança — ela pode afastar o que é bom. Confie mais. Saravá.",
    },
  ],
  trabalho: [
    {
      rapida: "Oportunidade chegando no trabalho.",
      media: "A espiritualidade mostra que uma porta vai se abrir. Esteja preparado(a).",
      completa: "Filho(a), a espiritualidade mostra oportunidade no caminho profissional. Pode ser uma proposta, uma mudança, uma abertura. O conselho é estar preparado(a) e não deixar passar. Quem tem fé e ação, conquista. Saravá.",
    },
    {
      rapida: "Momento de paciência no trabalho.",
      media: "O trabalho vai melhorar, mas não será agora. A espiritualidade pede persistência.",
      completa: "Filho(a), o momento pede paciência na área profissional. Não desista. O caminho existe, mas cada degrau tem seu tempo. Continue fazendo sua parte e confiando. A virada vem. Saravá.",
    },
    {
      rapida: "Mudança profissional no horizonte.",
      media: "A espiritualidade mostra que uma mudança importante está vindo na área do trabalho.",
      completa: "Filho(a), prepare-se porque vem mudança no trabalho. Pode ser novo emprego, nova função, novo caminho. O conselho é aceitar o novo sem medo. Quem não muda, não cresce. Saravá.",
    },
  ],
  inveja: [
    {
      rapida: "Existe energia de inveja ao redor.",
      media: "A espiritualidade mostra olho gordo nessa situação. Faça uma limpeza espiritual.",
      completa: "Filho(a), a espiritualidade mostra energia de inveja forte. Tem gente olhando sua vida com mau olho. O conselho é fazer uma limpeza espiritual, acender uma vela branca e pedir proteção. Não comente seus planos com qualquer pessoa. Saravá.",
    },
    {
      rapida: "A inveja não está te alcançando.",
      media: "Pode existir inveja, mas sua proteção espiritual está forte. Continue firme.",
      completa: "Filho(a), mesmo que exista inveja ao redor, sua proteção está ativa. O guia está cuidando de você. O conselho é manter a fé e não dar atenção a quem não merece. Quem anda certo, não tem o que temer. Saravá.",
    },
  ],
  protecao: [
    {
      rapida: "Sua proteção espiritual está ativa.",
      media: "A espiritualidade mostra que você está coberto(a). O guia está presente.",
      completa: "Filho(a), pode ficar tranquilo(a). Sua proteção espiritual está forte. Zé Pelintra está olhando por você. O conselho é manter a fé, acender sua vela e agradecer. Quem agradece, recebe mais. Saravá.",
    },
    {
      rapida: "Precisa reforçar sua proteção.",
      media: "A espiritualidade pede que você faça uma limpeza e reforce sua proteção espiritual.",
      completa: "Filho(a), sua proteção precisa ser reforçada. Acenda uma vela branca, faça um banho de ervas e peça a proteção do seu guia. Não descuide da sua espiritualidade. Quem cuida do espírito, cuida da vida. Saravá.",
    },
  ],
  dinheiro: [
    {
      rapida: "Dinheiro chegando, mas com paciência.",
      media: "A espiritualidade mostra prosperidade no caminho. Não será imediato, mas vem.",
      completa: "Filho(a), a espiritualidade mostra que o dinheiro vai chegar. Mas tudo tem seu tempo. Não faça dívida pensando no que ainda não veio. O conselho é organizar o que tem e confiar. A prosperidade está no caminho. Saravá.",
    },
    {
      rapida: "Energia forte de prosperidade.",
      media: "O caminho financeiro está aberto. Oportunidade de ganho surgindo.",
      completa: "Filho(a), a energia financeira está muito forte. Pode vir dinheiro de onde você não espera. O conselho é estar aberto(a) às oportunidades e não desperdiçar. Quem é sábio com pouco, recebe muito. Saravá.",
    },
    {
      rapida: "Cuidado com gastos agora.",
      media: "A espiritualidade pede cautela financeira. Não é hora de arriscar.",
      completa: "Filho(a), a espiritualidade pede cuidado com o dinheiro agora. Não é momento de gastar à toa nem de emprestar. Segure o que tem e espere a situação melhorar. Faça um trabalho espiritual para abrir os caminhos da prosperidade. Saravá.",
    },
  ],
};

export default function BancoRespostasTab() {
  const [activeCategory, setActiveCategory] = useState<Category>("amor");
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(id);
    toast.success("Copiado!");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const items = respostas[activeCategory];

  return (
    <div className="space-y-3 pb-8">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant="outline"
            size="sm"
            className={`font-crimson text-xs h-8 px-3 ${activeCategory === cat.key ? "bg-foreground text-background border-foreground" : "border-border"}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.icon} {cat.label}
          </Button>
        ))}
      </div>

      {/* Responses */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="card-mystical rounded-lg border border-border overflow-hidden">
            {/* Rápida */}
            <div className="p-3 border-b border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">⚡ 5 seg</span>
                  <p className="font-crimson text-sm text-foreground mt-0.5">{item.rapida}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => copy(item.rapida, `${idx}-r`)}
                >
                  {copiedIdx === `${idx}-r` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Média */}
            <div className="p-3 border-b border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">📝 10 seg</span>
                  <p className="font-crimson text-sm text-foreground/90 mt-0.5">{item.media}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => copy(item.media, `${idx}-m`)}
                >
                  {copiedIdx === `${idx}-m` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Completa */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">🔮 Completa</span>
                  <p className="font-crimson text-sm text-foreground/80 mt-0.5 leading-relaxed">{item.completa}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => copy(item.completa, `${idx}-c`)}
                >
                  {copiedIdx === `${idx}-c` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
