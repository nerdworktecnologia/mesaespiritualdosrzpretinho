import { CardMeaning, getYesNoResult } from "@/data/cardMeanings";

const entities = ["Zé Pelintra", "Zé Pretinho"] as const;
const randomEntity = () => entities[Math.floor(Math.random() * entities.length)];

const openings = [
  "Meu filho, a espiritualidade mostra que",
  "Filho, presta atenção no que vou te dizer:",
  "Escuta bem o que os guias estão mostrando:",
  "A malandragem divina fala assim:",
  "Olha só o que teu caminho está revelando:",
  "Os guias da encruzilhada mandam dizer:",
  "A espiritualidade não mente, filho. Olha só:",
];

const transitions = [
  "Agora presta atenção no que vem a seguir...",
  "E tem mais coisa pra te falar...",
  "Olha o que a próxima carta revela...",
  "A espiritualidade continua mostrando...",
];

const closings = [
  "Se manter firme na fé que o que é seu chega. Saravá.",
  "Segue firme e confia nos guias. Laroyê!",
  "A rua nunca mente, filho. Saravá!",
  "Quem tem fé não treme. Axé!",
  "O Malandro protege quem caminha certo. Saravá!",
  "Confia no processo e não desanima. O tempo de cada um é diferente. Saravá!",
  "Fé no caminho, firmeza na alma. Quem anda certo não tem o que temer. Axé!",
];

const advices: Record<string, string[]> = {
  positive: [
    "Aproveite esse momento de abertura. Quando o caminho abre, é hora de caminhar.",
    "A energia está a seu favor. Use essa fase com sabedoria.",
    "Os guias estão sorrindo para você. Continue fazendo sua parte.",
    "Essa é a hora de plantar. A colheita vem no tempo certo.",
  ],
  warning: [
    "Cuidado com quem anda perto de você. Nem todo sorriso é verdadeiro.",
    "A espiritualidade pede que você não conte seus planos para qualquer um.",
    "Faça uma limpeza espiritual. Energia pesada atrasa o que é seu.",
    "Vigile suas palavras e suas companhias. Nem todo mundo quer seu bem.",
  ],
  negative: [
    "Não é hora de forçar nada. Quem corre demais tropeça.",
    "Esse caminho precisa de tempo e paciência. Não adianta querer apressar.",
    "A orientação é recuar, refletir e esperar o momento certo.",
    "Às vezes o não também é proteção. Aceite e confie.",
  ],
};

const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

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
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";
  const tone = getOverallTone(cards);

  // Build elaborate card-by-card analysis
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
          "Essa é uma energia boa que está atuando.",
          "Aqui a espiritualidade mostra força e abertura.",
          "Os guias mostram que esse ponto está a seu favor.",
        ]);
      } else if (cardTone === "negative") {
        elaboration = pick([
          "Aqui tem um ponto de atenção. Não ignore.",
          "Essa energia precisa ser trabalhada. Fique esperto.",
          "Os guias alertam para cuidado nesse aspecto.",
        ]);
      } else {
        elaboration = pick([
          "Aqui a coisa pede equilíbrio e reflexão.",
          "Nem tudo está claro ainda. Observação é a palavra.",
          "Esse ponto depende das suas atitudes a partir de agora.",
        ]);
      }

      return `📜 Carta ${c.number} — ${c.name} ${position}\n${c.meaning}\n→ ${elaboration}`;
    })
    .join("\n\n");

  // Overall spiritual advice
  const advice = pick(advices[tone]);

  // Closing synthesis
  const synthesis = cards.length >= 3
    ? `\n\n🔮 Resumo Espiritual:\n${generateSynthesis(cards, tone)}`
    : "";

  return [
    `${emoji} Mensagem de ${entity}:`,
    "",
    pick(openings),
    "",
    cardAnalysis,
    synthesis,
    "",
    `💡 Conselho: ${advice}`,
    "",
    pick(closings),
  ].join("\n");
}

function generateSynthesis(cards: CardMeaning[], tone: "positive" | "warning" | "negative"): string {
  const hasProtection = cards.some((c) => [4, 17, 18, 32, 33].includes(c.number));
  const hasLove = cards.some((c) => [6, 14, 25, 29].includes(c.number));
  const hasObstacle = cards.some((c) => [3, 5, 8, 12, 15, 16, 22, 34].includes(c.number));
  const hasProsperity = cards.some((c) => [7, 10, 19, 23, 24, 35, 36].includes(c.number));

  const parts: string[] = [];

  if (hasProtection) parts.push("A proteção espiritual está presente e atuante.");
  if (hasLove) parts.push("Existe energia de amor e sentimento verdadeiro nessa situação.");
  if (hasObstacle) parts.push("Há interferências ou obstáculos que precisam ser trabalhados.");
  if (hasProsperity) parts.push("O caminho aponta para conquistas e realizações.");

  if (tone === "positive") {
    parts.push("No geral, as cartas mostram um cenário favorável. Continue firme.");
  } else if (tone === "negative") {
    parts.push("As cartas pedem cautela. Não é hora de agir por impulso.");
  } else {
    parts.push("O cenário pede equilíbrio. Nem tudo está resolvido, mas há caminho.");
  }

  return parts.join("\n");
}

export function generateShortResponse(cards: CardMeaning[]): string {
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";
  const tone = getOverallTone(cards);
  const summary = cards.map((c) => c.shortMeaning).join(" ");
  const advice = pick(advices[tone]);
  return `${emoji} ${entity}:\n${summary}\n${advice}\n${pick(closings)}`;
}

export function generateYesNoResponse(card: CardMeaning): string {
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";
  const { result } = getYesNoResult(card.number);
  const tone = getCardTone(card);

  const extras: Record<string, string[]> = {
    SIM: [
      "O caminho está aberto, porém não é imediato. Tenha paciência que o resultado vem.",
      "Sim, mas com necessidade de paciência e fé. Não desista agora.",
      "A resposta é positiva, confie nos guias. A vitória já está desenhada.",
      "Sim! Mas lembre: quem conta o passo antes de dar, pode tropeçar. Silêncio e fé.",
    ],
    TALVEZ: [
      "Depende das suas atitudes a partir de agora. O destino não está selado.",
      "O caminho existe, mas precisa de trabalho espiritual e mudança de atitude.",
      "Nem sim nem não — depende da sua fé e das suas ações nos próximos dias.",
      "A resposta está nas suas mãos. Os guias mostram possibilidade, mas você decide.",
    ],
    NÃO: [
      "Não é o momento. Espere o tempo certo e não force o que não é pra ser.",
      "Os guias pedem cautela. Esse caminho está fechado por enquanto.",
      "Esse caminho está fechado por hora. Mas todo fechamento é temporário se houver fé.",
      "Não force. Às vezes o não é a maior proteção que a espiritualidade pode dar.",
    ],
  };

  return [
    `${emoji} Mensagem de ${entity}:`,
    "",
    `Resposta espiritual: ${result}`,
    "",
    `📜 Carta ${card.number} — ${card.name}`,
    card.meaning,
    "",
    `→ ${pick(extras[result] || extras["TALVEZ"])}`,
    "",
    `💡 Conselho: ${pick(advices[tone])}`,
    "",
    pick(closings),
  ].join("\n");
}
