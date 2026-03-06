export interface CardMeaning {
  number: number;
  name: string;
  meaning: string;
  shortMeaning: string;
  yesNo: "sim" | "talvez" | "nao";
}

export const cardMeanings: CardMeaning[] = [
  { number: 1, name: "O Malandro", meaning: "Esperteza e jogo de cintura. A malandragem necessária para vencer os obstáculos. Momento de usar a inteligência e não a força.", shortMeaning: "Use a esperteza, não a força.", yesNo: "sim" },
  { number: 2, name: "A Moça", meaning: "Pureza de intenções e novos começos. Alguém de coração limpo aparece no caminho. Renovação espiritual.", shortMeaning: "Novos começos com boas intenções.", yesNo: "sim" },
  { number: 3, name: "O Olho Grande", meaning: "Inveja e interferência de terceiros. Alguém está vigiando seus passos com más intenções. Cuidado com fofoca.", shortMeaning: "Interferência de terceiros e inveja.", yesNo: "talvez" },
  { number: 4, name: "O Dinheiro", meaning: "Prosperidade e ganhos financeiros à caminho. Momento de colher os frutos do trabalho. Abundância chegando.", shortMeaning: "Prosperidade e ganhos financeiros.", yesNo: "sim" },
  { number: 5, name: "A Demanda", meaning: "Trabalho espiritual contra você. Energia pesada enviada por alguém. Necessidade de limpeza e proteção.", shortMeaning: "Trabalho espiritual negativo, faça limpeza.", yesNo: "nao" },
  { number: 6, name: "O Amor", meaning: "Sentimento verdadeiro e reciprocidade. O amor está presente e forte. União abençoada pelos guias.", shortMeaning: "Amor verdadeiro e correspondido.", yesNo: "sim" },
  { number: 7, name: "A Coroa", meaning: "Vitória e conquista garantida. Você está no caminho certo. Reconhecimento e poder espiritual.", shortMeaning: "Vitória e conquista certa.", yesNo: "sim" },
  { number: 8, name: "O Cruzeiro", meaning: "Encruzilhada e decisão importante. Momento de escolher o caminho. Peça orientação aos guias.", shortMeaning: "Decisão importante, peça orientação.", yesNo: "talvez" },
  { number: 9, name: "A Faca", meaning: "Corte necessário. É preciso se afastar de algo ou alguém. Rompimento que traz libertação.", shortMeaning: "Corte necessário, afaste-se.", yesNo: "talvez" },
  { number: 10, name: "O Caixão", meaning: "Fim de um ciclo. Algo precisa morrer para o novo nascer. Transformação profunda.", shortMeaning: "Fim de ciclo, transformação.", yesNo: "nao" },
  { number: 11, name: "A Bebida", meaning: "Celebração ou vício. Atenção aos excessos. Pode indicar comemoração ou necessidade de moderação.", shortMeaning: "Atenção aos excessos.", yesNo: "talvez" },
  { number: 12, name: "O Caminho", meaning: "Caminho aberto mas com atrasos. A estrada existe, porém há obstáculos a superar. Paciência é necessária.", shortMeaning: "Caminho aberto, mas com atraso.", yesNo: "sim" },
  { number: 13, name: "A Caveira", meaning: "Perigo e alerta. Situação grave que exige atenção imediata. Não ignore os sinais.", shortMeaning: "Perigo, fique atento.", yesNo: "nao" },
  { number: 14, name: "A Lua", meaning: "Ilusão e engano. Nem tudo é o que parece. Alguém pode estar mentindo ou escondendo algo.", shortMeaning: "Cuidado com ilusões e mentiras.", yesNo: "talvez" },
  { number: 15, name: "O Punhal", meaning: "Traição próxima. Alguém de confiança pode decepcionar. Proteja seus segredos.", shortMeaning: "Traição, proteja seus segredos.", yesNo: "nao" },
  { number: 16, name: "A Prisão", meaning: "Bloqueio e travamento. Situação presa sem saída aparente. Necessidade de trabalho espiritual forte.", shortMeaning: "Bloqueio, precisa de trabalho espiritual.", yesNo: "nao" },
  { number: 17, name: "O Cemitério", meaning: "Energia dos mortos e ancestrais. Necessidade de cuidar das obrigações com os que já partiram.", shortMeaning: "Cuide das obrigações ancestrais.", yesNo: "nao" },
  { number: 18, name: "A Proteção", meaning: "Proteção espiritual forte. Seus guias estão atuando a seu favor. Você não está sozinho.", shortMeaning: "Proteção espiritual forte.", yesNo: "sim" },
  { number: 19, name: "O Sol", meaning: "Clareza e iluminação. A verdade vem à tona. Momento de luz e entendimento espiritual.", shortMeaning: "Clareza e verdade revelada.", yesNo: "sim" },
  { number: 20, name: "A Estrela", meaning: "Esperança e fé renovada. Os guias mostram que há luz no fim do caminho. Mantenha a fé.", shortMeaning: "Esperança, mantenha a fé.", yesNo: "talvez" },
  { number: 21, name: "O Tridente", meaning: "Poder de Exu e força espiritual intensa. Proteção dos guardiões das encruzilhadas. Respeite as forças.", shortMeaning: "Força espiritual intensa, respeite.", yesNo: "nao" },
];

export function getYesNoResult(cardNumber: number): { result: string; color: string } {
  if (cardNumber >= 1 && cardNumber <= 7) return { result: "SIM", color: "text-green-400" };
  if (cardNumber >= 8 && cardNumber <= 14) return { result: "TALVEZ", color: "text-primary" };
  if (cardNumber >= 15 && cardNumber <= 21) return { result: "NÃO", color: "text-accent" };
  return { result: "Carta inválida", color: "text-muted-foreground" };
}
