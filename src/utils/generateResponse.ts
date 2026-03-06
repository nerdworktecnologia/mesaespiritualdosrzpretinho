import { CardMeaning, getYesNoResult } from "@/data/cardMeanings";

const openings = [
  "Filho, a espiritualidade mostra que",
  "Presta atenção no que vou te dizer.",
  "Escuta bem o que os guias estão mostrando.",
  "Olha só o que teu caminho está revelando.",
  "A espiritualidade não mente. Olha só.",
  "Senta e escuta. O que tenho pra falar é sério.",
];

const closings = [
  "O que é seu chega. Saravá.",
  "Segue firme e confia. Saravá.",
  "Quem tem fé não treme. Saravá.",
  "Fé no caminho. Saravá.",
  "Confia no processo. Saravá.",
  "Quem anda certo não tem o que temer. Saravá.",
];

const advices: Record<string, string[]> = {
  positive: [
    "Aproveite esse momento. Quando o caminho abre, é hora de caminhar.",
    "A energia está a seu favor. Use com sabedoria.",
    "Continue fazendo sua parte. Os guias estão sorrindo pra você.",
    "Essa é a hora de plantar. A colheita vem.",
  ],
  warning: [
    "Cuidado com quem anda perto. Nem todo sorriso é verdadeiro.",
    "Não conte seus planos para qualquer um.",
    "Faça uma limpeza espiritual. Energia pesada atrasa o que é seu.",
    "Vigile suas palavras e companhias.",
  ],
  negative: [
    "Não force nada. Quem corre demais tropeça.",
    "Esse caminho precisa de tempo e paciência.",
    "A orientação é recuar, refletir e esperar.",
    "Às vezes o não também é proteção. Aceite e confie.",
  ],
};

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

export function generateFullResponse(cards: CardMeaning[], question: string): string {
  const tone = getOverallTone(cards);

  const cardAnalysis = cards
    .map((c, i) => {
      const cardTone = getCardTone(c);
      const position = cards.length === 3
        ? ["(Passado)", "(Presente)", "(Futuro)"][i]
        : cards.length === 5
          ? ["(Situação)", "(Obstáculo)", "(Conselho)", "(Influência)", "(Resultado)"][i]
          : "";

      let elaboration = "";
      if (cardTone === "positive") {
        elaboration = pick([
          "Essa energia está a seu favor.",
          "Aqui a espiritualidade mostra força.",
          "Esse ponto está aberto e positivo.",
        ]);
      } else if (cardTone === "negative") {
        elaboration = pick([
          "Aqui tem um ponto de atenção. Não ignore.",
          "Essa energia precisa ser trabalhada.",
          "Cuidado nesse aspecto. Os guias alertam.",
        ]);
      } else {
        elaboration = pick([
          "Aqui a coisa pede equilíbrio.",
          "Nem tudo está claro ainda. Observe.",
          "Depende das suas atitudes a partir de agora.",
        ]);
      }

      return `Carta ${c.number} — ${c.name} ${position}\n${c.meaning}\n→ ${elaboration}`;
    })
    .join("\n\n");

  const synthesis = cards.length >= 3 ? `\n\n${generateSynthesis(cards, tone)}` : "";

  return [
    `Sr. Zé Pretinho fala:`,
    "",
    pick(openings),
    "",
    cardAnalysis,
    synthesis,
    "",
    pick(advices[tone]),
    "",
    pick(closings),
  ].join("\n");
}

function generateSynthesis(cards: CardMeaning[], tone: "positive" | "warning" | "negative"): string {
  const hasProtection = cards.some((c) => [4, 17, 18, 32, 33].includes(c.number));
  const hasLove = cards.some((c) => [6, 14, 25, 29].includes(c.number));
  const hasObstacle = cards.some((c) => [3, 5, 8, 12, 15, 16, 22, 34].includes(c.number));
  const hasProsperity = cards.some((c) => [7, 10, 19, 23, 24, 35, 36].includes(c.number));

  const parts: string[] = ["Resumo:"];

  if (hasProtection) parts.push("A proteção espiritual está presente.");
  if (hasLove) parts.push("Existe energia de sentimento verdadeiro.");
  if (hasObstacle) parts.push("Há interferências que precisam ser trabalhadas.");
  if (hasProsperity) parts.push("O caminho aponta para conquistas.");

  if (tone === "positive") {
    parts.push("No geral, cenário favorável. Continue firme.");
  } else if (tone === "negative") {
    parts.push("As cartas pedem cautela. Não aja por impulso.");
  } else {
    parts.push("O cenário pede equilíbrio. Há caminho, mas com atenção.");
  }

  return parts.join("\n");
}

export function generateShortResponse(cards: CardMeaning[]): string {
  const tone = getOverallTone(cards);
  const summary = cards.map((c) => c.shortMeaning).join(" ");
  return [
    `Sr. Zé Pretinho:`,
    summary,
    "",
    pick(advices[tone]),
    pick(closings),
  ].join("\n");
}

export function generateYesNoResponse(card: CardMeaning): string {
  const { result } = getYesNoResult(card.number);
  const tone = getCardTone(card);

  const extras: Record<string, string[]> = {
    SIM: [
      "O caminho está aberto. Tenha paciência que o resultado vem.",
      "Sim, mas com paciência e fé. Não desista.",
      "A resposta é positiva. Confie.",
      "Sim. Mas silêncio e fé. Não conte antes da hora.",
    ],
    TALVEZ: [
      "Depende das suas atitudes a partir de agora.",
      "O caminho existe, mas precisa de trabalho espiritual.",
      "Nem sim nem não. Depende da sua fé e das suas ações.",
      "A resposta está nas suas mãos.",
    ],
    NÃO: [
      "Não é o momento. Espere o tempo certo.",
      "Esse caminho está fechado por enquanto. Cautela.",
      "Fechado por hora. Mas todo fechamento é temporário com fé.",
      "Não force. Às vezes o não é a maior proteção.",
    ],
  };

  return [
    `Sr. Zé Pretinho fala:`,
    "",
    `Resposta: ${result}`,
    "",
    `Carta ${card.number} — ${card.name}`,
    card.meaning,
    "",
    pick(extras[result] || extras["TALVEZ"]),
    "",
    pick(advices[tone]),
    "",
    pick(closings),
  ].join("\n");
}
