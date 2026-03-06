import { CardMeaning, getYesNoResult } from "@/data/cardMeanings";

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function getCardTone(card: CardMeaning): "positive" | "warning" | "negative" {
  const positiveNums = [1, 4, 6, 7, 10, 14, 17, 18, 19, 24, 27, 29, 31, 32, 33, 35, 36];
  const negativeNums = [5, 8, 13, 16, 22];
  if (positiveNums.includes(card.number)) return "positive";
  if (negativeNums.includes(card.number)) return "negative";
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
  ],
  warning: [
    "Mas existe energia de interferência ou dúvida ao redor.",
    "Nem tudo está claro ainda. Cuidado com quem está perto.",
    "A espiritualidade pede atenção. Observe antes de agir.",
  ],
  negative: [
    "Existe energia pesada interferindo nesse caminho.",
    "Cuidado. Nem tudo que parece ser, é de verdade.",
    "A espiritualidade mostra obstáculo que precisa ser trabalhado.",
  ],
};

// ── Spiritual counsel ──
const counsels: Record<string, string[]> = {
  positive: [
    "O conselho é seguir firme e aproveitar esse momento.",
    "Continue no caminho. O que é seu está chegando.",
    "Mantenha a fé. A espiritualidade está do seu lado.",
  ],
  warning: [
    "O conselho é não comentar seus planos com qualquer pessoa.",
    "Faça uma limpeza espiritual e vigile suas companhias.",
    "Tenha paciência. O caminho existe, mas pede equilíbrio.",
  ],
  negative: [
    "O conselho é recuar, refletir e esperar o momento certo.",
    "Não force nada. Às vezes o não também é proteção.",
    "Cuide da sua energia. Nem todo caminho deve ser seguido agora.",
  ],
};

const closings = [
  "O que for seu chega no tempo certo. Saravá.",
  "Quem tem fé não treme. Saravá.",
  "Segue firme e confia. Saravá.",
  "Fé no caminho. Saravá.",
  "Quem anda certo não tem o que temer. Saravá.",
];

// ── Full response: 3-part structure ──
export function generateFullResponse(cards: CardMeaning[], question: string): string {
  const tone = getOverallTone(cards);

  // Part 1: Card-by-card energy reading
  const reading = cards
    .map((c, i) => {
      const position = cards.length === 3
        ? ["(Passado)", "(Presente)", "(Futuro)"][i]
        : cards.length === 5
          ? ["(Situação)", "(Obstáculo)", "(Conselho)", "(Influência)", "(Resultado)"][i]
          : "";
      return `Carta ${c.number} — ${c.name} ${position}\n${c.meaning}`;
    })
    .join("\n\n");

  // Part 2: Alert/orientation
  const alert = pick(alerts[tone]);

  // Part 3: Spiritual counsel
  const counsel = pick(counsels[tone]);

  // Synthesis for 3+ cards
  const synthesis = cards.length >= 3 ? buildSynthesis(cards, tone) : "";

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

function buildSynthesis(cards: CardMeaning[], tone: "positive" | "warning" | "negative"): string {
  const parts: string[] = [];
  if (cards.some((c) => [4, 17, 18, 32, 33].includes(c.number)))
    parts.push("A proteção espiritual está presente.");
  if (cards.some((c) => [6, 14, 25, 29].includes(c.number)))
    parts.push("Existe energia de sentimento verdadeiro.");
  if (cards.some((c) => [3, 5, 8, 12, 15, 16, 22, 34].includes(c.number)))
    parts.push("Há interferências que precisam ser trabalhadas.");
  if (cards.some((c) => [7, 10, 19, 23, 24, 35, 36].includes(c.number)))
    parts.push("O caminho aponta para conquistas.");

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
      "A resposta é positiva. Confie.",
    ],
    TALVEZ: [
      "Depende das suas atitudes a partir de agora.",
      "O caminho existe, mas precisa de trabalho espiritual.",
      "A resposta está nas suas mãos.",
    ],
    NÃO: [
      "Não é o momento. Espere o tempo certo.",
      "Esse caminho está fechado por enquanto.",
      "Não force. Às vezes o não é proteção.",
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
