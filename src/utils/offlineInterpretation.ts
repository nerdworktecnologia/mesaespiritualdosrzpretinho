import { CabalaResult } from "@/data/odus";
import { CardMeaning } from "@/data/cardMeanings";

interface BuziosState {
  buzios: number[];
  abertos: number;
  odu: { name: string; orixa: string; meaning: string };
}

export interface OfflineInterpretation {
  temaDetectado?: string;
  relampago: string;
  media: string;
  completa: string;
  destino: string;
  energia: string;
  situacao: string;
  orientacao: string;
  resumo: string;
  isOffline: boolean;
}

export function gerarInterpretacaoOffline(
  pergunta: string,
  tema: string,
  cabala: CabalaResult | null,
  buzios: BuziosState | null,
  tarot: CardMeaning[]
): OfflineInterpretation {
  const partes: string[] = [];

  // Cabala
  let destinoText = "Cabala não consultada nesta leitura.";
  if (cabala) {
    destinoText = `Seu Odu superior é ${cabala.superior.name} (${cabala.superior.orixa}), indicando ${cabala.superior.meaning || "energias de transformação"}. O Odu central ${cabala.central.name} revela o eixo da sua missão, enquanto o Odu final ${cabala.final.name} aponta o caminho de resolução.`;
    partes.push(`Cabala: ${cabala.superior.name} / ${cabala.central.name} / ${cabala.final.name}`);
  }

  // Búzios
  let energiaText = "Búzios não consultados nesta leitura.";
  if (buzios) {
    energiaText = `Caíram ${buzios.abertos} búzios abertos de 16, revelando o Odu ${buzios.odu.name} regido por ${buzios.odu.orixa}. ${buzios.odu.meaning}`;
    partes.push(`Búzios: ${buzios.odu.name} (${buzios.abertos}/16)`);
  }

  // Tarot
  let situacaoText = "Tarot não consultado nesta leitura.";
  if (tarot.length > 0) {
    const nomes = tarot.map((c) => c.name).join(", ");
    const significados = tarot.map((c) => `${c.name}: ${c.meaning}`).join(". ");
    situacaoText = `As cartas tiradas foram: ${nomes}. ${significados}`;
    partes.push(`Tarot: ${nomes}`);
  }

  // Build levels
  const relampago = partes.length > 0
    ? `🔮 Leitura rápida sobre "${tema}": ${partes.join(" | ")}. Energia predominante aponta para atenção e reflexão.`
    : "Nenhuma leitura realizada para gerar interpretação.";

  const media = [
    `📖 Consulta sobre: ${pergunta || "tema geral"}`,
    cabala ? `\n\n🔢 Cabala de Ifá: O cruzamento dos Odus ${cabala.superior.name} (superior) e ${cabala.final.name} (final) indica um ciclo de ${tema === "amor" ? "transformação afetiva" : tema === "trabalho" ? "evolução profissional" : "mudanças importantes"}.` : "",
    buzios ? `\n\n🐚 Búzios: ${buzios.odu.name} traz a energia de ${buzios.odu.orixa}. Com ${buzios.abertos} abertos, o momento pede ${buzios.abertos > 8 ? "ação e movimento" : "cautela e reflexão"}.` : "",
    tarot.length > 0 ? `\n\n🃏 Tarot: ${tarot.map((c) => `${c.name} (${c.energy})`).join(", ")}. As cartas reforçam a necessidade de ${tarot[0]?.energy === "positiva" ? "confiança no caminho" : "atenção redobrada"}.` : "",
  ].filter(Boolean).join("");

  const completa = [
    `✨ Leitura Espiritual Completa`,
    `\nTema: ${tema}`,
    `\nPergunta: ${pergunta || "Consulta geral"}`,
    `\n\n${destinoText}`,
    `\n\n${energiaText}`,
    `\n\n${situacaoText}`,
    `\n\nCruzando as leituras: o momento espiritual indica que ${tema === "amor" ? "o coração precisa de paciência" : tema === "trabalho" ? "oportunidades estão se formando" : tema === "dinheiro" ? "a prosperidade vem com disciplina" : "a energia pede equilíbrio e fé"}.`,
  ].join("");

  const orientacao = cabala && buzios
    ? `A combinação de ${cabala.superior.name} com ${buzios.odu.name} sugere que você deve buscar equilíbrio entre ação e espiritualidade. ${buzios.abertos > 8 ? "O momento favorece iniciativas." : "Aguarde o momento certo para agir."}`
    : "Busque conexão com sua espiritualidade e confie no processo.";

  const resumo = `Interpretação gerada localmente com base no cruzamento de ${partes.length} sistema(s) oracular(es).`;

  return {
    temaDetectado: tema,
    relampago,
    media,
    completa,
    destino: destinoText,
    energia: energiaText,
    situacao: situacaoText,
    orientacao,
    resumo,
    isOffline: true,
  };
}
