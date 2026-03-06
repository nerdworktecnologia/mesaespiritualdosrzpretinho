import { CardMeaning, getYesNoResult } from "@/data/cardMeanings";

const entities = ["Zé Pelintra", "Zé Pretinho"] as const;
const randomEntity = () => entities[Math.floor(Math.random() * entities.length)];

const openings = [
  "Meu filho, a espiritualidade mostra que",
  "Filho, presta atenção no que vou te dizer:",
  "Escuta bem o que os guias estão mostrando:",
  "A malandragem divina fala assim:",
  "Olha só o que teu caminho está revelando:",
];

const closings = [
  "Se manter firme na fé que o que é seu chega. Saravá.",
  "Segue firme e confia nos guias. Laroyê!",
  "A rua nunca mente, filho. Saravá!",
  "Quem tem fé não treme. Axé!",
  "O Malandro protege quem caminha certo. Saravá!",
];

const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export function generateFullResponse(cards: CardMeaning[], question: string): string {
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";

  const cardAnalysis = cards
    .map((c) => `Carta ${c.number} — ${c.name}: ${c.meaning}`)
    .join("\n\n");

  const summary = cards.map((c) => c.shortMeaning).join(" ");

  return `${emoji} Mensagem de ${entity}:\n\n${pick(openings)}\n\n${cardAnalysis}\n\n${summary}\n\n${pick(closings)}`;
}

export function generateShortResponse(cards: CardMeaning[]): string {
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";
  const summary = cards.map((c) => c.shortMeaning).join(" ");
  return `${emoji} ${entity}:\n${summary}\n${pick(closings)}`;
}

export function generateYesNoResponse(card: CardMeaning): string {
  const entity = randomEntity();
  const emoji = entity === "Zé Pelintra" ? "🎩" : "✨";
  const { result } = getYesNoResult(card.number);

  const extras: Record<string, string[]> = {
    SIM: [
      "O caminho está aberto, porém não é imediato.",
      "Sim, mas com necessidade de paciência.",
      "A resposta é positiva, confie nos guias.",
    ],
    TALVEZ: [
      "Depende das suas atitudes a partir de agora.",
      "O caminho existe, mas precisa de trabalho.",
      "Nem sim nem não — depende da sua fé.",
    ],
    NÃO: [
      "Não é o momento. Espere o tempo certo.",
      "Os guias pedem cautela. Não force.",
      "Esse caminho está fechado por hora.",
    ],
  };

  return `${emoji} Mensagem de ${entity}:\n\nResposta espiritual: ${result}\n\nCarta ${card.number} — ${card.name}\n${card.meaning}\n\n${pick(extras[result] || extras["TALVEZ"])}\n\n${pick(closings)}`;
}
