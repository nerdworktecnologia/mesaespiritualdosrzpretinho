import { CardMeaning, getYesNoResult } from "@/data/cardMeanings";

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function getCardTone(card: CardMeaning): "positive" | "warning" | "negative" {
  if (card.energy === "positive") return "positive";
  if (card.energy === "alert") return "negative";
  return "warning";
}

function getOverallTone(cards: CardMeaning[]): "positive" | "warning" | "negative" {
  const tones = cards.map(getCardTone);
  const pos = tones.filter((t) => t === "positive").length;
  const neg = tones.filter((t) => t === "negative").length;
  if (pos > neg) return "positive";
  if (neg > pos) return "negative";
  return "warning";
}

// ── Alerts by tone ──
const alerts: Record<string, string[]> = {
  positive: [
    "O caminho está aberto e a energia é favorável.",
    "A espiritualidade está sorrindo para essa situação.",
    "Existe força espiritual atuando a seu favor.",
    "Zé Pelintra mostra que o caminho é de luz.",
  ],
  warning: [
    "Mas existe energia de mudança ou escolha ao redor.",
    "Nem tudo está definido ainda. Observe antes de agir.",
    "A espiritualidade pede atenção. A situação está em movimento.",
    "O caminho existe, mas exige sabedoria.",
  ],
  negative: [
    "Existe energia que precisa ser trabalhada nesse caminho.",
    "Cuidado. A espiritualidade pede proteção e limpeza.",
    "Algo precisa ser cortado para que o caminho se abra.",
    "A espiritualidade mostra necessidade de descarrego.",
  ],
};

// ── Spiritual counsel ──
const counsels: Record<string, string[]> = {
  positive: [
    "O conselho é seguir firme e aproveitar esse momento.",
    "Continue no caminho. O que é seu está chegando.",
    "Mantenha a fé. Zé Pelintra está do seu lado.",
    "Segue com confiança. A proteção é forte.",
  ],
  warning: [
    "O conselho é não comentar seus planos com qualquer pessoa.",
    "Faça uma limpeza espiritual e vigile suas companhias.",
    "Tenha paciência. O caminho existe, mas pede equilíbrio.",
    "Espere o tempo certo. Nem tudo que parece ser, é.",
  ],
  negative: [
    "O conselho é recuar, refletir e esperar o momento certo.",
    "Não force nada. Às vezes o não também é proteção.",
    "Cuide da sua energia. Acenda uma vela e peça proteção.",
    "Faça um descarrego antes de tomar qualquer decisão.",
  ],
};

const closings = [
  "O que for seu chega no tempo certo. Saravá.",
  "Quem tem fé não treme. Saravá.",
  "Segue firme e confia. Saravá.",
  "Fé no caminho. Saravá.",
  "Quem anda certo não tem o que temer. Saravá.",
  "O mestre protege quem tem fé. Saravá.",
];

// ── Full response: card-by-card + synthesis ──
export function generateFullResponse(cards: CardMeaning[], question: string): string {
  const tone = getOverallTone(cards);

  const reading = cards
    .map((c, i) => {
      const position = cards.length === 3
        ? ["(Energia da Situação)", "(O Que Influencia)", "(Conselho Espiritual)"][i]
        : cards.length === 5
          ? ["(Passado)", "(Presente)", "(Influência Oculta)", "(Conselho Espiritual)", "(Desfecho)"][i]
          : "";
      return `Carta ${c.number} — ${c.name} ${position}\n${c.meaning}`;
    })
    .join("\n\n");

  const alert = pick(alerts[tone]);
  const counsel = pick(counsels[tone]);
  const synthesis = cards.length >= 3 ? buildSynthesis(cards) : "";

  return [
    "Sr. Zé Pretinho fala:",
    "",
    reading,
    "",
    alert,
    "",
    synthesis,
    counsel,
    "",
    pick(closings),
  ].filter(Boolean).join("\n");
}

function buildSynthesis(cards: CardMeaning[]): string {
  const parts: string[] = [];
  if (cards.some((c) => [5, 6, 36, 23].includes(c.number)))
    parts.push("A proteção espiritual está presente.");
  if (cards.some((c) => [32, 18, 26, 20].includes(c.number)))
    parts.push("Existe energia de sentimento verdadeiro.");
  if (cards.some((c) => [1, 4, 13, 14, 31, 33].includes(c.number)))
    parts.push("Há energia que precisa ser trabalhada ou cortada.");
  if (cards.some((c) => [3, 11, 25, 34, 35].includes(c.number)))
    parts.push("O caminho aponta para conquistas e prosperidade.");
  if (cards.some((c) => [22, 17, 27].includes(c.number)))
    parts.push("Existe solução e sabedoria disponível.");

  if (parts.length > 0) return parts.join("\n") + "\n";
  return "";
}

// ── Short response for live ──
export function generateShortResponse(cards: CardMeaning[]): string {
  const tone = getOverallTone(cards);
  const summary = cards.map((c) => c.shortMeaning).join(" ");
  return [
    "Sr. Zé Pretinho:",
    "",
    summary,
    "",
    pick(counsels[tone]),
    pick(closings),
  ].join("\n");
}

// ── Yes/No response ──
export function generateYesNoResponse(card: CardMeaning): string {
  const { result } = getYesNoResult(card.number);
  const tone = getCardTone(card);

  const extras: Record<string, string[]> = {
    SIM: [
      "O caminho está aberto. Tenha paciência que chega.",
      "Sim, mas com paciência e fé. Não desista.",
      "A resposta é positiva. Confie na espiritualidade.",
    ],
    TALVEZ: [
      "Depende das suas atitudes a partir de agora.",
      "O caminho existe, mas precisa de trabalho espiritual.",
      "A resposta está nas suas mãos. Faça a sua parte.",
    ],
    NÃO: [
      "Não é o momento. Espere o tempo certo.",
      "Esse caminho está fechado por enquanto. Faça limpeza.",
      "Não force. Às vezes o não é proteção do guia.",
    ],
  };

  return [
    "Sr. Zé Pretinho fala:",
    "",
    `Resposta: ${result}`,
    "",
    `Carta ${card.number} — ${card.name}`,
    card.meaning,
    "",
    pick(extras[result] || extras["TALVEZ"]),
    "",
    pick(counsels[tone]),
    "",
    pick(closings),
  ].join("\n");
}
