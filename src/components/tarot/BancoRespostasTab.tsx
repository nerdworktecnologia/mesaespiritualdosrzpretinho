import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Category = "amor" | "volta" | "traicao" | "trabalho" | "inveja" | "protecao" | "dinheiro" | "duvidas";

const categories: { key: Category; label: string; icon: string }[] = [
  { key: "amor", label: "Amor", icon: "❤️" },
  { key: "volta", label: "Volta", icon: "🔄" },
  { key: "traicao", label: "Traição", icon: "💔" },
  { key: "trabalho", label: "Trabalho", icon: "💼" },
  { key: "inveja", label: "Inveja", icon: "🧿" },
  { key: "protecao", label: "Proteção", icon: "🕯️" },
  { key: "dinheiro", label: "Dinheiro", icon: "💰" },
  { key: "duvidas", label: "Dúvidas", icon: "🧠" },
];

const respostas: Record<Category, { rapida: string; media: string; completa: string }[]> = {
  amor: [
    {
      rapida: "Existe sentimento, mas o caminho ainda precisa amadurecer.",
      media: "Existe sentimento nessa situação, mas há fatores que ainda precisam se resolver antes de um reencontro.",
      completa: "Filha, a espiritualidade mostra que existe sentimento, mas o tempo ainda precisa trabalhar essa situação.\n\nNem tudo que demora é perda, às vezes é preparação.\n\nO conselho é não forçar o destino e deixar que a verdade apareça.\n\nSaravá.",
    },
    {
      rapida: "Tem sentimento, mas existe distância emocional.",
      media: "Esse caminho ainda não está totalmente fechado, mas depende de atitudes e tempo.",
      completa: "Filha, a espiritualidade mostra sentimento verdadeiro, mas existe uma distância que precisa ser trabalhada.\n\nNão é só o físico, é o emocional.\n\nO conselho é cuidar de si e deixar o tempo agir.\n\nSaravá.",
    },
    {
      rapida: "O sentimento existe, mas o tempo ainda precisa trabalhar essa situação.",
      media: "Existe amor, mas nem tudo que a gente sente se transforma em reencontro sem esforço dos dois lados.",
      completa: "Filha, o amor existe, a espiritualidade confirma. Mas amor sozinho não resolve. Precisa de verdade, de atitude, de coragem.\n\nO conselho é ser honesta com o que sente e esperar o momento certo.\n\nO que é seu encontra caminho. Saravá.",
    },
  ],
  volta: [
    {
      rapida: "Existe ligação ainda, mas há orgulho no caminho.",
      media: "Existe vínculo emocional, mas algo precisa mudar antes de um retorno acontecer.",
      completa: "Filha, a espiritualidade mostra que ainda existe ligação entre vocês.\n\nMas também mostra que há orgulho e situações mal resolvidas.\n\nSe houver mudança de atitude, esse caminho pode se reabrir.\n\nSaravá.",
    },
    {
      rapida: "Esse retorno depende mais de atitude do que de sentimento.",
      media: "A volta pode acontecer, mas não será do mesmo jeito. Algo precisa mudar dos dois lados.",
      completa: "Filha, o retorno é possível, mas não vai ser como antes. A espiritualidade pede transformação.\n\nSe voltar do mesmo jeito, vai embora de novo.\n\nO conselho é trabalhar em si mesma primeiro.\n\nSaravá.",
    },
    {
      rapida: "Não é o momento da volta agora.",
      media: "O caminho da volta está difícil. A espiritualidade pede paciência e desapego.",
      completa: "Filha, agora não é o momento da volta. A espiritualidade pede que você cuide de si.\n\nÀs vezes o não é proteção do guia. Não force o que não quer fluir.\n\nFaça uma limpeza espiritual e confie no tempo.\n\nSaravá.",
    },
  ],
  traicao: [
    {
      rapida: "Existe falta de clareza nessa situação.",
      media: "Existe possibilidade de falta de sinceridade nessa relação.",
      completa: "Filha, a espiritualidade mostra falta de clareza nessa situação.\n\nNem tudo está sendo mostrado da forma verdadeira.\n\nO conselho é observar mais e confiar menos em palavras.\n\nSaravá.",
    },
    {
      rapida: "Algo ainda não está totalmente revelado.",
      media: "Tem algo escondido que pode vir à tona. A verdade sempre aparece.",
      completa: "Filha, a espiritualidade mostra que tem coisa escondida. Pode ser traição, pode ser mentira, pode ser omissão.\n\nO espelho vai mostrar a verdade.\n\nO conselho é não confrontar agora — observe e espere o momento certo.\n\nSaravá.",
    },
    {
      rapida: "A situação é limpa. Não há traição.",
      media: "A espiritualidade não mostra energia de traição. Existe lealdade nessa relação.",
      completa: "Filha, pode ficar tranquila. A espiritualidade não mostra traição.\n\nO sentimento é verdadeiro do outro lado.\n\nMas cuide da sua insegurança — ela pode afastar o que é bom. Confie mais.\n\nSaravá.",
    },
  ],
  trabalho: [
    {
      rapida: "Existe possibilidade de oportunidade no caminho.",
      media: "Existe chance de oportunidade, mas o momento pede paciência.",
      completa: "Filho, a espiritualidade mostra abertura de caminho profissional.\n\nMas também mostra que o tempo precisa alinhar algumas situações.\n\nContinue buscando, porque a oportunidade aparece.\n\nSaravá.",
    },
    {
      rapida: "Esse caminho profissional pode se abrir em breve.",
      media: "A espiritualidade mostra que uma porta vai se abrir. Esteja preparado(a).",
      completa: "Filho, a espiritualidade mostra oportunidade no caminho profissional. Pode ser uma proposta, uma mudança, uma abertura.\n\nO conselho é estar preparado(a) e não deixar passar.\n\nQuem tem fé e ação, conquista. Saravá.",
    },
    {
      rapida: "Momento de paciência no trabalho.",
      media: "O trabalho vai melhorar, mas não será agora. A espiritualidade pede persistência.",
      completa: "Filho, o momento pede paciência na área profissional. Não desista.\n\nO caminho existe, mas cada degrau tem seu tempo.\n\nContinue fazendo sua parte e confiando. A virada vem.\n\nSaravá.",
    },
  ],
  inveja: [
    {
      rapida: "Existe energia de inveja ao redor.",
      media: "Existe energia de inveja ou observação excessiva ao seu redor.",
      completa: "Filho, a espiritualidade mostra presença de inveja ou energia pesada ao redor.\n\nNem todos que observam sua vida torcem pelo seu bem.\n\nO conselho é proteger sua energia e falar menos dos seus planos.\n\nSaravá.",
    },
    {
      rapida: "Tem olho grande nesse caminho.",
      media: "A inveja está presente, mas sua proteção espiritual pode blindar você.",
      completa: "Filho, tem olho gordo forte nessa situação. Gente que sorri na frente e torce contra pelas costas.\n\nO conselho é fazer uma limpeza espiritual, acender uma vela branca e pedir proteção.\n\nNão comente seus planos com qualquer pessoa.\n\nSaravá.",
    },
    {
      rapida: "A inveja não está te alcançando.",
      media: "Pode existir inveja, mas sua proteção está forte. Continue firme.",
      completa: "Filho, mesmo que exista inveja ao redor, sua proteção está ativa. O guia está cuidando de você.\n\nO conselho é manter a fé e não dar atenção a quem não merece.\n\nQuem anda certo, não tem o que temer. Saravá.",
    },
  ],
  protecao: [
    {
      rapida: "Existe proteção espiritual nesse caminho.",
      media: "A espiritualidade está acompanhando essa situação.",
      completa: "Filho, a espiritualidade mostra proteção ao seu redor.\n\nMesmo quando as coisas parecem difíceis, você não está sozinho.\n\nExiste força espiritual caminhando com você.\n\nSaravá.",
    },
    {
      rapida: "Você não está sozinho espiritualmente.",
      media: "O guia está presente e olhando por você. Mantenha a fé.",
      completa: "Filho, pode ficar tranquilo. Sua proteção espiritual está forte. Zé Pelintra está olhando por você.\n\nO conselho é manter a fé, acender sua vela e agradecer.\n\nQuem agradece, recebe mais. Saravá.",
    },
    {
      rapida: "Precisa reforçar sua proteção.",
      media: "A espiritualidade pede que você faça uma limpeza e reforce sua proteção.",
      completa: "Filho, sua proteção precisa ser reforçada. Acenda uma vela branca, faça um banho de ervas e peça a proteção do seu guia.\n\nNão descuide da sua espiritualidade.\n\nQuem cuida do espírito, cuida da vida. Saravá.",
    },
  ],
  dinheiro: [
    {
      rapida: "O caminho financeiro pode melhorar, mas exige organização.",
      media: "Existe possibilidade de melhoria financeira, mas o resultado vem com esforço e estratégia.",
      completa: "Filho, a espiritualidade mostra possibilidade de crescimento financeiro.\n\nMas também mostra que será necessário esforço e disciplina.\n\nO dinheiro vem quando o caminho é organizado.\n\nSaravá.",
    },
    {
      rapida: "Existe oportunidade de ganho, mas depende de atitude.",
      media: "O caminho financeiro está aberto. Oportunidade de ganho surgindo.",
      completa: "Filho, a energia financeira está forte. Pode vir dinheiro de onde você não espera.\n\nO conselho é estar aberto às oportunidades e não desperdiçar.\n\nQuem é sábio com pouco, recebe muito. Saravá.",
    },
    {
      rapida: "Cuidado com gastos agora.",
      media: "A espiritualidade pede cautela financeira. Não é hora de arriscar.",
      completa: "Filho, a espiritualidade pede cuidado com o dinheiro agora. Não é momento de gastar à toa nem de emprestar.\n\nSegure o que tem e espere a situação melhorar.\n\nFaça um trabalho espiritual para abrir os caminhos da prosperidade. Saravá.",
    },
  ],
  duvidas: [
    {
      rapida: "Esse caminho depende de escolhas.",
      media: "A resposta depende muito das decisões que serão tomadas agora.",
      completa: "Filho, a espiritualidade mostra que esse caminho ainda está em movimento.\n\nAs decisões que você tomar agora vão influenciar diretamente o resultado.\n\nEscolha com sabedoria.\n\nSaravá.",
    },
    {
      rapida: "Existe possibilidade, mas exige decisão.",
      media: "O caminho existe, mas não vai se abrir sozinho. Precisa de atitude.",
      completa: "Filho, a espiritualidade mostra que a resposta está nas suas mãos.\n\nNão adianta esperar que as coisas mudem se você não mudar primeiro.\n\nO conselho é agir com coragem e fé.\n\nO tempo espiritual é diferente do tempo da ansiedade. Saravá.",
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

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="card-mystical rounded-lg border border-border overflow-hidden">
            <div className="p-3 border-b border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">⚡ Relâmpago</span>
                  <p className="font-crimson text-sm text-foreground mt-0.5">{item.rapida}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => copy(item.rapida, `${idx}-r`)}>
                  {copiedIdx === `${idx}-r` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="p-3 border-b border-border/50">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">📝 Curta</span>
                  <p className="font-crimson text-sm text-foreground/90 mt-0.5">{item.media}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => copy(item.media, `${idx}-m`)}>
                  {copiedIdx === `${idx}-m` ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">🔮 Espiritual</span>
                  <pre className="font-crimson text-sm text-foreground/80 mt-0.5 leading-relaxed whitespace-pre-wrap">{item.completa}</pre>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => copy(item.completa, `${idx}-c`)}>
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
