export interface Odu {
  number: number;
  name: string;
  orixa: string;
  meaning: string;
  personality: string;
  advice: string;
}

export const odus: Odu[] = [
  { number: 1, name: "Okaran", orixa: "Exu", meaning: "Início, individualidade e força pessoal.", personality: "Pessoa forte, determinada, que abre seus próprios caminhos. Líder nato, mas precisa cuidar da solidão e da teimosia.", advice: "Aprenda a pedir ajuda. Nem tudo se resolve sozinho." },
  { number: 2, name: "Ejiokô", orixa: "Ogum", meaning: "Dualidade, luta e conquista pelo esforço.", personality: "Guerreiro(a) nato(a). Pessoa batalhadora que vence pelo esforço próprio. Pode ser impaciente e impulsivo(a).", advice: "Controle a ansiedade. A vitória vem, mas no tempo certo." },
  { number: 3, name: "Etaogundá", orixa: "Omolú/Ogun", meaning: "Transformação, superação e cura.", personality: "Pessoa que passou ou passará por grandes transformações. Tem força interior enorme. Curador(a) natural.", advice: "Não tenha medo das mudanças. Elas são seu caminho de evolução." },
  { number: 4, name: "Irosun", orixa: "Yemanjá", meaning: "Ancestralidade, família e proteção materna.", personality: "Pessoa ligada à família e às raízes. Sensível, intuitiva e protetora. Forte conexão com o mundo espiritual.", advice: "Cuide das suas origens e ancestrais. A força vem de lá." },
  { number: 5, name: "Oxê", orixa: "Oxum", meaning: "Amor, fertilidade e doçura.", personality: "Pessoa amorosa, carinhosa e sedutora. Tem dom para cuidar dos outros. Pode sofrer por amor se não tiver equilíbrio.", advice: "Ame, mas ame a si mesmo(a) primeiro. O amor próprio é a base." },
  { number: 6, name: "Obará", orixa: "Xangô", meaning: "Justiça, comunicação e prosperidade.", personality: "Pessoa comunicativa, justa e próspera. Tem o dom da palavra e da liderança. Precisa cuidar do orgulho.", advice: "Use o poder da comunicação com sabedoria. A palavra tem força." },
  { number: 7, name: "Odi", orixa: "Oxossi", meaning: "Renovação, recomeço e mistério.", personality: "Pessoa misteriosa, inteligente e estratégica. Tem facilidade para recomeçar. Forte ligação com a natureza.", advice: "Confie na sua intuição. Ela raramente erra." },
  { number: 8, name: "Ejionilê", orixa: "Oxalá", meaning: "Paz, equilíbrio e sabedoria.", personality: "Pessoa sábia, calma e equilibrada. Tem missão de pacificador(a). Pode ser visto(a) como distante.", advice: "Mantenha o equilíbrio. Você é farol para os outros." },
  { number: 9, name: "Ossá", orixa: "Yansã", meaning: "Mudança, movimento e coragem.", personality: "Pessoa corajosa, inquieta e transformadora. Não tem medo de mudanças. Precisa de liberdade.", advice: "Canalize sua energia. Mudança sem direção é apenas agitação." },
  { number: 10, name: "Ofun", orixa: "Oxalufã", meaning: "Criação, pureza e espiritualidade elevada.", personality: "Pessoa com missão espiritual importante. Pureza de coração. Pode ser incompreendida pelo mundo.", advice: "Aceite sua missão espiritual. Você veio para algo maior." },
  { number: 11, name: "Owarin", orixa: "Nanã", meaning: "Sabedoria ancestral e profundidade.", personality: "Pessoa profunda, reflexiva e ligada ao passado. Tem sabedoria além da idade. Pode ser melancólica.", advice: "Honre seus ancestrais. A sabedoria deles vive em você." },
  { number: 12, name: "Ejilaxeborá", orixa: "Xangô/Yansã", meaning: "Poder, liderança e força espiritual.", personality: "Pessoa poderosa espiritualmente. Líder natural com muita força interior. Precisa controlar a dominação.", advice: "Use seu poder para proteger, não para dominar." },
  { number: 13, name: "Ejiologbon", orixa: "Nanã/Oxalá", meaning: "Sabedoria, paciência e maturidade.", personality: "Alma velha. Pessoa madura desde jovem. Tem paciência e visão de longo prazo.", advice: "Sua sabedoria é rara. Compartilhe com quem merece." },
  { number: 14, name: "Iká", orixa: "Obaluaê", meaning: "Superação de obstáculos e resiliência.", personality: "Pessoa que enfrenta muitas provas na vida mas sempre supera. Resiliência é sua marca.", advice: "Cada obstáculo superado te fortalece. Não desista." },
  { number: 15, name: "Ogbeogundá", orixa: "Ogum/Oxóssi", meaning: "Prosperidade, abertura de caminhos.", personality: "Pessoa com caminhos sempre abrindo. Prosperidade natural. Precisa manter a humildade.", advice: "Seja grato(a) pelas portas que se abrem. A gratidão mantém o fluxo." },
  { number: 16, name: "Alafin", orixa: "Todos os Orixás", meaning: "Totalidade, realeza espiritual e proteção completa.", personality: "Pessoa com proteção direta de todos os Orixás. Missão elevada. Forte intuição e mediunidade.", advice: "Você carrega uma coroa espiritual. Honre essa responsabilidade." },
];

export interface CabalaResult {
  superior: Odu;    // Esquerda (posições ímpares)
  inferior: Odu;    // Direita (posições pares)
  lateral: Odu;     // Soma esquerda + direita
  central: Odu;     // Soma esquerda + direita + lateral
  final: Odu;       // Soma de tudo
  summary: string;
}

function reduceToOdu(n: number): number {
  let result = n;
  while (result > 16) {
    result = result.toString().split("").reduce((s, d) => s + parseInt(d), 0);
  }
  return result || 1;
}

export function calculateCabala(birthDate: string): CabalaResult {
  // Format: YYYY-MM-DD → "DDMMAAAA" (8 dígitos)
  const parts = birthDate.split("-");
  const formatted = parts[2] + parts[1] + parts[0]; // DDMMAAAA
  const numeros = formatted.split("").map(Number);

  // PASSO 1 — separar esquerda (posições ímpares 0,2,4,6) e direita (1,3,5,7)
  const esquerda = reduceToOdu(numeros[0] + numeros[2] + numeros[4] + numeros[6]);
  const direita = reduceToOdu(numeros[1] + numeros[3] + numeros[5] + numeros[7]);

  // PASSO 2 — lateral: soma esquerda + direita
  const lateralNum = reduceToOdu(esquerda + direita);

  // PASSO 3 — central: esquerda + direita + lateral
  const centralNum = reduceToOdu(esquerda + direita + lateralNum);

  // PASSO 4 — final: esquerda + direita + lateral + central
  const finalNum = reduceToOdu(esquerda + direita + lateralNum + centralNum);

  const superior = odus[esquerda - 1];
  const inferior = odus[direita - 1];
  const lateral = odus[lateralNum - 1];
  const central = odus[centralNum - 1];
  const finalOdu = odus[finalNum - 1];

  const summary = generateCabalaSummary(superior, inferior, lateral, central, finalOdu);

  return { superior, inferior, lateral, central, final: finalOdu, summary };
}

function generateCabalaSummary(
  nuca: Odu, frente: Odu, centro: Odu, testa: Odu, costas: Odu, nascimento: Odu
): string {
  return [
    `🔮 Odu de Nascimento: ${nascimento.name} (${nascimento.orixa})`,
    `${nascimento.meaning}`,
    `Personalidade: ${nascimento.personality}`,
    "",
    `👤 Centro da Cabeça (Odu Principal): ${centro.name} (${centro.orixa})`,
    `Essa é a sua essência. ${centro.meaning}`,
    `${centro.personality}`,
    "",
    `🧠 Testa (Caminho Mental): ${testa.name} (${testa.orixa})`,
    `A forma como você pensa e toma decisões. ${testa.meaning}`,
    "",
    `👁️ Nuca (Passado/Origem): ${nuca.name} (${nuca.orixa})`,
    `De onde você vem espiritualmente. ${nuca.meaning}`,
    `Herança espiritual: ${nuca.personality}`,
    "",
    `🛤️ Frente (Futuro/Destino): ${frente.name} (${frente.orixa})`,
    `Para onde você está caminhando. ${frente.meaning}`,
    `${frente.advice}`,
    "",
    `🛡️ Costas (Proteção Espiritual): ${costas.name} (${costas.orixa})`,
    `Quem protege você por trás. ${costas.meaning}`,
    "",
    `━━━━━━━━━━━━━━━━━━`,
    `✨ Resumo da Vida Espiritual:`,
    `Você é regido(a) por ${centro.orixa} no centro da cabeça, com ${nascimento.orixa} como energia de nascimento.`,
    `Sua origem espiritual vem de ${nuca.orixa} (nuca), e seu destino caminha para ${frente.orixa} (frente).`,
    `Sua mente é guiada por ${testa.orixa} (testa) e sua proteção vem de ${costas.orixa} (costas).`,
    "",
    `💡 Conselho principal: ${centro.advice}`,
    `📿 Orixá regente: ${centro.orixa}`,
  ].join("\n");
}

// Keep backward compatibility
export function calculateOdu(fullName: string, birthDate: string) {
  const result = calculateCabala(birthDate);
  return {
    principal: result.centro,
    destino: result.frente,
    message: result.summary,
  };
}
