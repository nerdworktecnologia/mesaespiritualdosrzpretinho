export interface CardMeaning {
  number: number;
  name: string;
  meaning: string;
  shortMeaning: string;
  icon: string;
  energy: "positive" | "neutral" | "alert";
}

export const cardMeanings: CardMeaning[] = [
  { number: 1, name: "Os Cristais", meaning: "A espiritualidade pede limpeza. Existe energia acumulada que precisa ser trabalhada antes de seguir em frente.", shortMeaning: "Limpeza espiritual necessária.", icon: "💎", energy: "alert" },
  { number: 2, name: "O Lápis", meaning: "Hora de planejar. A espiritualidade mostra que a situação precisa de organização antes de agir.", shortMeaning: "Planejamento necessário.", icon: "✏️", energy: "neutral" },
  { number: 3, name: "A Carteira", meaning: "Energia de prosperidade. O caminho financeiro pode se abrir. Existe fartura chegando.", shortMeaning: "Prosperidade no caminho.", icon: "👛", energy: "positive" },
  { number: 4, name: "A Navalha", meaning: "Corte energético necessário. Algo precisa ser encerrado para que o novo chegue. Proteção espiritual ativa.", shortMeaning: "Corte e proteção.", icon: "🔪", energy: "alert" },
  { number: 5, name: "O Chapéu", meaning: "Proteção de Zé Pelintra. Você está coberto espiritualmente. O guia está olhando por você.", shortMeaning: "Proteção do guia.", icon: "🎩", energy: "positive" },
  { number: 6, name: "O Terno Branco", meaning: "Pureza e proteção espiritual. O caminho está limpo e a energia é favorável.", shortMeaning: "Pureza e proteção.", icon: "🤍", energy: "positive" },
  { number: 7, name: "A Cerveja", meaning: "Energia de celebração. Algo bom pode acontecer. Momento de comemorar conquistas.", shortMeaning: "Celebração chegando.", icon: "🍺", energy: "neutral" },
  { number: 8, name: "O Baralho", meaning: "Sorte e risco caminham juntos. A situação tem chances, mas exige atenção.", shortMeaning: "Sorte com risco.", icon: "🃏", energy: "neutral" },
  { number: 9, name: "O Violão", meaning: "Energia de alegria e harmonia. A situação tende a se resolver de forma leve.", shortMeaning: "Alegria e harmonia.", icon: "🎸", energy: "positive" },
  { number: 10, name: "A Encruzilhada", meaning: "Momento de decisão. A espiritualidade mostra que existe mais de um caminho possível.", shortMeaning: "Decisão importante.", icon: "✝️", energy: "neutral" },
  { number: 11, name: "A Moeda", meaning: "Dinheiro rápido pode chegar. Oportunidade financeira surgindo.", shortMeaning: "Dinheiro rápido.", icon: "🪙", energy: "positive" },
  { number: 12, name: "O Sapato Bicolor", meaning: "Caminhos se abrindo. A situação pode tomar um novo rumo. Movimento.", shortMeaning: "Caminhos novos.", icon: "👞", energy: "neutral" },
  { number: 13, name: "O Punhal", meaning: "Defesa espiritual necessária. Existe algo ou alguém que precisa ser afastado.", shortMeaning: "Defesa necessária.", icon: "🗡️", energy: "alert" },
  { number: 14, name: "O Fumo", meaning: "Descarrego espiritual. A espiritualidade está limpando o caminho. Energia sendo transmutada.", shortMeaning: "Descarrego espiritual.", icon: "🚬", energy: "alert" },
  { number: 15, name: "O Pandeiro", meaning: "Movimento e ritmo. A situação está em andamento. Não pare agora.", shortMeaning: "Situação em movimento.", icon: "🥁", energy: "neutral" },
  { number: 16, name: "O Paletó", meaning: "Postura e atitude. A espiritualidade pede que você se posicione com firmeza.", shortMeaning: "Postura firme.", icon: "🧥", energy: "neutral" },
  { number: 17, name: "A Mesa", meaning: "Acordos e negociações. Algo pode ser resolvido através do diálogo.", shortMeaning: "Acordos possíveis.", icon: "🍽️", energy: "positive" },
  { number: 18, name: "A Gravata Vermelha", meaning: "Energia de paixão e desejo. Sentimento forte na situação.", shortMeaning: "Paixão e desejo.", icon: "👔", energy: "neutral" },
  { number: 19, name: "O Relógio", meaning: "Tudo tem seu tempo. A espiritualidade pede paciência. O momento certo vai chegar.", shortMeaning: "Tempo e paciência.", icon: "⏰", energy: "neutral" },
  { number: 20, name: "O Anel", meaning: "Compromisso e fidelidade. Pode indicar união ou acordo firme.", shortMeaning: "Compromisso.", icon: "💍", energy: "neutral" },
  { number: 21, name: "O Espelho", meaning: "Verdade sendo revelada. O que estava oculto pode vir à tona.", shortMeaning: "Verdade aparecendo.", icon: "🪞", energy: "neutral" },
  { number: 22, name: "A Chave", meaning: "Solução encontrada. Algo que parecia fechado pode se abrir. Existe saída.", shortMeaning: "Solução e abertura.", icon: "🔑", energy: "positive" },
  { number: 23, name: "A Vela", meaning: "Fé e luz espiritual. A espiritualidade está iluminando o caminho.", shortMeaning: "Fé iluminando.", icon: "🕯️", energy: "positive" },
  { number: 24, name: "O Bilhete", meaning: "Notícia chegando. Uma mensagem ou informação importante está a caminho.", shortMeaning: "Notícia a caminho.", icon: "✉️", energy: "neutral" },
  { number: 25, name: "O Dinheiro", meaning: "Abundância e prosperidade. Energia financeira muito forte nessa situação.", shortMeaning: "Abundância.", icon: "💵", energy: "positive" },
  { number: 26, name: "O Perfume", meaning: "Atração e encanto. Existe magnetismo nessa situação.", shortMeaning: "Atração e encanto.", icon: "🧴", energy: "positive" },
  { number: 27, name: "A Bengala", meaning: "Sabedoria e experiência. A resposta está na calma e na maturidade.", shortMeaning: "Sabedoria.", icon: "🦯", energy: "positive" },
  { number: 28, name: "O Dado", meaning: "Sorte e acaso. A situação tem um componente de imprevisibilidade.", shortMeaning: "Sorte e acaso.", icon: "🎲", energy: "neutral" },
  { number: 29, name: "O Chapéu de Palha", meaning: "Humildade e simplicidade. A resposta está nas coisas simples.", shortMeaning: "Humildade.", icon: "👒", energy: "neutral" },
  { number: 30, name: "O Copo", meaning: "Partilha e generosidade. Compartilhar pode trazer bons resultados.", shortMeaning: "Partilha.", icon: "🥃", energy: "neutral" },
  { number: 31, name: "A Navalha Aberta", meaning: "Perigo e situação delicada. A espiritualidade aconselha cautela e proteção.", shortMeaning: "Perigo, cautela.", icon: "⚠️", energy: "alert" },
  { number: 32, name: "A Rosa Vermelha", meaning: "Amor verdadeiro. Sentimento forte e sincero na situação.", shortMeaning: "Amor verdadeiro.", icon: "🌹", energy: "positive" },
  { number: 33, name: "O Chapéu no Chão", meaning: "Recomeço. Algo precisa ser deixado para trás para que o novo surja.", shortMeaning: "Recomeço necessário.", icon: "🎩", energy: "alert" },
  { number: 34, name: "A Escada", meaning: "Crescimento e evolução. O caminho é de subida, mas cada degrau conta.", shortMeaning: "Crescimento gradual.", icon: "🪜", energy: "positive" },
  { number: 35, name: "A Estrela", meaning: "Esperança e destino favorável. A espiritualidade ilumina esse caminho.", shortMeaning: "Esperança e luz.", icon: "⭐", energy: "positive" },
  { number: 36, name: "Zé Pelintra", meaning: "Proteção total do guia. A carta mais forte do baralho. O mestre está presente.", shortMeaning: "Proteção total do mestre.", icon: "🎩✨", energy: "positive" },
];

// Yes/No logic adapted to Zé Pelintra deck
const yesCards = [3, 5, 6, 11, 22, 23, 25, 32, 35, 36];
const maybeCards = [2, 8, 10, 12, 19, 20, 21, 24, 28];
// alertCards (no) = [1, 4, 13, 14, 31, 33] + remaining neutrals [7, 9, 15, 16, 17, 18, 26, 27, 29, 30, 34]

export function getYesNoResult(cardNumber: number): { result: string; color: string } {
  if (yesCards.includes(cardNumber)) return { result: "SIM", color: "text-foreground" };
  if (maybeCards.includes(cardNumber)) return { result: "TALVEZ", color: "text-muted-foreground" };
  if ([1, 4, 13, 14, 31, 33].includes(cardNumber)) return { result: "NÃO", color: "text-foreground/50" };
  // Remaining neutrals default to TALVEZ
  return { result: "TALVEZ", color: "text-muted-foreground" };
}
