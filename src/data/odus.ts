export interface Odu {
  number: number;
  name: string;
  orixa: string;
  meaning: string;
  personality: string;
  evitar: string;
  advice: string;
}

export const odus: Odu[] = [
  { number: 1, name: "Okanran", orixa: "Exu, Ogum", meaning: "Energia de força e transformação. Indica coragem e abertura de caminhos, mas pede controle da impulsividade.", personality: "Pessoa forte, corajosa e determinada. Abre seus próprios caminhos com garra. Pode ser impulsiva e teimosa quando contrariada.", evitar: "brigas, decisões precipitadas", advice: "praticar autocontrole e disciplina espiritual" },
  { number: 2, name: "Ejioko", orixa: "Ibeji, Oxum", meaning: "Energia de equilíbrio, inteligência e observação. Mostra mente analítica e sensibilidade espiritual.", personality: "Pessoa inteligente, observadora e analítica. Pensa antes de agir. Sensível espiritualmente, mas pode travar por excesso de dúvida.", evitar: "indecisão e excesso de pensamento", advice: "confiar mais na própria intuição" },
  { number: 3, name: "Etaogunda", orixa: "Ogum, Xangô", meaning: "Energia de luta e conquista. Indica crescimento através do esforço.", personality: "Guerreiro(a) nato(a). Pessoa batalhadora que vence pelo esforço. Determinada e focada, mas pode entrar em conflitos desnecessários.", evitar: "conflitos constantes", advice: "manter disciplina e foco" },
  { number: 4, name: "Irosun", orixa: "Iemanjá, Nanã", meaning: "Odù ligado à espiritualidade profunda e ancestralidade.", personality: "Pessoa ligada às raízes e à família. Forte intuição e mediunidade natural. Protetora e acolhedora, mas pode absorver energias alheias.", evitar: "ambientes negativos", advice: "fortalecer fé e espiritualidade" },
  { number: 5, name: "Oxé", orixa: "Oxum, Logunedé", meaning: "Energia de prosperidade e magnetismo pessoal.", personality: "Pessoa magnética, sedutora e próspera. Tem facilidade para atrair coisas boas. Encantadora, mas precisa cuidar da vaidade.", evitar: "vaidade excessiva", advice: "manter humildade e equilíbrio financeiro" },
  { number: 6, name: "Obará", orixa: "Xangô, Ogum", meaning: "Energia de liderança e expansão.", personality: "Líder natural com poder de comando. Pessoa justa e comunicativa. Expansiva e generosa, mas pode pecar pelo orgulho.", evitar: "orgulho e autoritarismo", advice: "liderar com sabedoria" },
  { number: 7, name: "Odi", orixa: "Omolu, Obaluaiê", meaning: "Energia de proteção e estratégia.", personality: "Pessoa estratégica, reservada e inteligente. Observa tudo antes de agir. Forte espiritualmente, mas pode guardar ressentimentos.", evitar: "guardar mágoas", advice: "praticar perdão" },
  { number: 8, name: "Ejionile", orixa: "Xangô, Oxalá", meaning: "Odù da justiça e responsabilidade.", personality: "Pessoa justa, responsável e equilibrada. Tem senso de dever forte. Pode ser rígida demais consigo e com os outros.", evitar: "rigidez e excesso de cobrança", advice: "buscar equilíbrio" },
  { number: 9, name: "Ossá", orixa: "Iansã, Logunedé", meaning: "Energia de movimento e mudança.", personality: "Pessoa inquieta, corajosa e transformadora. Não tem medo de mudanças. Precisa de liberdade, mas deve cuidar da instabilidade.", evitar: "instabilidade", advice: "manter foco" },
  { number: 10, name: "Ofun", orixa: "Oxalá, Orunmilá", meaning: "Odù da sabedoria espiritual.", personality: "Pessoa sábia, espiritual e com missão elevada. Pureza de coração e visão profunda. Pode ser incompreendida pelo mundo material.", evitar: "absorver energia negativa", advice: "cuidar da espiritualidade" },
  { number: 11, name: "Owonrin", orixa: "Exu, Iansã", meaning: "Energia da comunicação e criatividade.", personality: "Pessoa criativa, comunicativa e expressiva. Tem o dom da palavra e da arte. Carismática, mas precisa saber a hora de calar.", evitar: "falar demais", advice: "usar palavra com sabedoria" },
  { number: 12, name: "Ejilaxeborá", orixa: "Oxum, Iemanjá", meaning: "Odù da união e parceria.", personality: "Pessoa acolhedora, parceira e dedicada. Valoriza vínculos e relacionamentos. Pode se anular em prol dos outros.", evitar: "anular a própria vontade", advice: "desenvolver autonomia" },
  { number: 13, name: "Ejiologbon", orixa: "Orunmilá, Oxalá", meaning: "Energia de sabedoria e conhecimento.", personality: "Alma velha. Pessoa madura, estudiosa e com visão de longo prazo. Sábia desde jovem, mas pode se isolar.", evitar: "isolamento", advice: "compartilhar conhecimento" },
  { number: 14, name: "Iká", orixa: "Obaluaiê, Nanã", meaning: "Energia espiritual profunda e transformação.", personality: "Pessoa resiliente que supera grandes provas. Forte espiritualmente e com poder de cura. Cada obstáculo a fortalece.", evitar: "ambientes negativos", advice: "fortalecer proteção espiritual" },
  { number: 15, name: "Ogbéogundá", orixa: "Ogum, Oxóssi", meaning: "Odù de abertura de caminhos.", personality: "Pessoa com caminhos sempre se abrindo. Prosperidade natural e facilidade para conquistas. Precisa manter a humildade.", evitar: "agir sem planejamento", advice: "focar nos objetivos" },
  { number: 16, name: "Aláfia", orixa: "Oxalá, Oxum", meaning: "Energia de paz e equilíbrio.", personality: "Pessoa pacificadora, equilibrada e com proteção espiritual forte. Missão elevada. Não deve se acomodar.", evitar: "acomodação", advice: "manter espiritualidade forte" },
];

export interface CabalaResult {
  superior: Odu;
  inferior: Odu;
  lateral: Odu;
  central: Odu;
  final: Odu;
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

  const esquerda = reduceToOdu(numeros[0] + numeros[2] + numeros[4] + numeros[6]);
  const direita = reduceToOdu(numeros[1] + numeros[3] + numeros[5] + numeros[7]);

  const lateralNum = reduceToOdu(esquerda + direita);
  const centralNum = reduceToOdu(esquerda + direita + lateralNum);
  const finalNum = reduceToOdu(esquerda + direita + lateralNum + centralNum);

  const superior = odus[esquerda - 1];
  const inferior = odus[direita - 1];
  const lateral = odus[lateralNum - 1];
  const central = odus[centralNum - 1];
  const finalOdu = odus[finalNum - 1];

  const summary = generateCabalaSummary(superior, inferior, lateral, central, finalOdu);

  return { superior, inferior, lateral, central, final: finalOdu, summary };
}

function interpretarOdu(label: string, emoji: string, odu: Odu): string {
  return [
    `${emoji} ${label}: ${odu.name}`,
    `Orixás: ${odu.orixa}`,
    `${odu.meaning}`,
    `Conselho: ${odu.advice}`,
    `Evitar: ${odu.evitar}`,
  ].join("\n");
}

function generateCabalaSummary(
  superior: Odu, inferior: Odu, lateral: Odu, central: Odu, finalOdu: Odu
): string {
  return [
    `Seu caminho espiritual é guiado pelo Odu ${superior.name}.`,
    ``,
    `Este Odu indica ${superior.meaning}`,
    `O conselho espiritual é ${superior.advice}`,
    `Evite ${superior.evitar}.`,
    `Os orixás que respondem são ${superior.orixa}.`,
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    ``,
    interpretarOdu("Odu Superior", "🔮", superior),
    ``,
    interpretarOdu("Odu Inferior", "👤", inferior),
    ``,
    interpretarOdu("Odu Lateral", "🧠", lateral),
    ``,
    interpretarOdu("Odu Central", "🛤️", central),
    ``,
    interpretarOdu("Odu Final", "🛡️", finalOdu),
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `✨ Resumo Espiritual:`,
    `Superior: ${superior.name} (${superior.orixa})`,
    `Inferior: ${inferior.name} (${inferior.orixa})`,
    `Central: ${central.name} (${central.orixa})`,
    `Final: ${finalOdu.name} (${finalOdu.orixa})`,
    ``,
    `💡 Conselho principal: ${central.advice}`,
    `📿 Orixás regentes: ${central.orixa}`,
  ].join("\n");
}

// Keep backward compatibility
export function calculateOdu(fullName: string, birthDate: string) {
  const result = calculateCabala(birthDate);
  return {
    principal: result.central,
    destino: result.final,
    message: result.summary,
  };
}
