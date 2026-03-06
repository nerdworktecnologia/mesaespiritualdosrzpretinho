export interface Odu {
  number: number;
  name: string;
  orixa: string;
  orixaDescricao: string;
  elemento: string;
  meaning: string;
  personality: string;
  positivo: string;
  negativo: string;
  evitar: string;
  advice: string;
}

export const odus: Odu[] = [
  {
    number: 1, name: "Okanran", orixa: "Exu, Ogum",
    orixaDescricao: "Regido por Exu, o orixá guardião da comunicação. Representa proteção, justiça, paciência e força. Personalidade disciplinada e protetora.",
    elemento: "Fogo",
    meaning: "Energia de força e transformação. Indica coragem e abertura de caminhos, mas pede controle da impulsividade. Tudo ao redor muda com velocidade impressionante.",
    personality: "Pessoa forte, corajosa e determinada. Abre seus próprios caminhos com garra. Pode ser impulsiva e teimosa quando contrariada. Temperamento explosivo e sedutor.",
    positivo: "Sorte nos negócios, desconfiança saudável que protege de riscos, capacidade de avaliar situações antes de agir.",
    negativo: "Extremismo, envolvimentos rápidos e intempestivos, tendência à insubordinação e rebeldia. Pode gerar descontrole.",
    evitar: "brigas, decisões precipitadas", advice: "praticar autocontrole e disciplina espiritual"
  },
  {
    number: 2, name: "Ejioko", orixa: "Ibeji, Obá",
    orixaDescricao: "Regido por Ibeji (protetor dos gêmeos Taiwo e Kehide) e Obá (primeira esposa de Xangô, guerreira). Personalidade forte, objetiva e sincera.",
    elemento: "Água",
    meaning: "Energia de equilíbrio, inteligência e observação. Odu questionador, pensamento errático e mutável. Calma aparente que esconde dúvidas constantes.",
    personality: "Pessoa inteligente, observadora e analítica. Pensa antes de agir. Sensível espiritualmente, mas pode travar por excesso de dúvida. Francos e sinceros.",
    positivo: "Personalidade forte, objetivos firmes, espírito de luta, propenso ao sacrifício. Não aceita falsidade.",
    negativo: "Constante mutação devido às dúvidas, brigas e complicações na rotina. Questiona o afeto dos outros.",
    evitar: "indecisão e excesso de pensamento", advice: "confiar mais na própria intuição"
  },
  {
    number: 3, name: "Etaogunda", orixa: "Oxum, Ogum",
    orixaDescricao: "Regido por Oxum, orixá das águas doces, senhora da fertilidade, beleza, sensibilidade, dinheiro e riqueza espiritual.",
    elemento: "Água",
    meaning: "Energia de luta e conquista. Indica crescimento através do esforço. Capacidade de realizar objetivos, especialmente ligados ao trabalho.",
    personality: "Guerreiro(a) nato(a). Pessoa batalhadora que vence pelo esforço. Obstinada, apaixonada, criativa e dedicada ao trabalho. Pode entrar em conflitos desnecessários.",
    positivo: "Situações de vitória, produtividade, capacidade de realização. Forte especialmente em discussões e trabalho.",
    negativo: "Dificuldades nos negócios, rivalidades intensas, traições. Pode anular presságios positivos da carreira quando em aspecto negativo.",
    evitar: "conflitos constantes e rivalidades", advice: "manter disciplina e foco"
  },
  {
    number: 4, name: "Irosun", orixa: "Iemanjá, Eguns",
    orixaDescricao: "Regido por Iemanjá (mãe de todos os orixás, decide o destino de quem entra no mar) e Eguns (espíritos evoluídos, iluminados, ligados à família).",
    elemento: "Água",
    meaning: "Odù ligado à espiritualidade profunda e ancestralidade. Indica pessoas generosas, com intuição aguçada e forte conexão com aspectos místicos.",
    personality: "Pessoa ligada às raízes e à família. Forte intuição e mediunidade natural. Protetora e acolhedora, mas pode absorver energias alheias. Dada ao trabalho manual e vendas.",
    positivo: "Fertilidade, trabalho, vitória através do esforço e conquista material. Capacidade transformadora.",
    negativo: "Tendência a sofrer traições amorosas, acidentes, inveja dos inimigos. Constantemente caluniado. Separações e miséria.",
    evitar: "ambientes negativos e pessoas invejosas", advice: "fortalecer fé e espiritualidade"
  },
  {
    number: 5, name: "Oxê", orixa: "Oxum, Logunedé",
    orixaDescricao: "Regido por Oxum. O Odu foi gerado à beira do rio com cinco espelhos e um pano amarelo. Considerado o Odu da feitiçaria, concebido sem pecado original.",
    elemento: "Água",
    meaning: "Energia de prosperidade e magnetismo pessoal. Pessoas tranquilas, objetivas e serenas que auxiliam na resolução de situações complexas.",
    personality: "Pessoa magnética, sedutora e próspera. Tem facilidade para atrair coisas boas. Encantadora, sensível, mas precisa cuidar da vaidade.",
    positivo: "Capacidade de conseguir lucros, caráter transformador e mutável. Sabe aproveitar oportunidades com sabedoria.",
    negativo: "Perdas e problemas de saúde (especialmente ligados ao ventre), tendência a mentir, degeneração e destruição quando em aspecto negativo.",
    evitar: "vaidade excessiva e vingança", advice: "manter humildade e equilíbrio financeiro"
  },
  {
    number: 6, name: "Obará", orixa: "Xangô, Oxóssi",
    orixaDescricao: "Regido por Xangô, orixá da justiça e do trovão, representação da virilidade, atrevimento e justiça. Pune mentirosos e criminosos.",
    elemento: "Fogo",
    meaning: "Energia de liderança e expansão. Forte associação com justiça, atrevimento e ideia de provedor. Tendência a ocupar postos ligados à Justiça.",
    personality: "Líder natural com poder de comando. Pessoa justa, comunicativa, conquistadora. Expansiva e generosa, mas pode pecar pelo orgulho.",
    positivo: "Capacidade de vencer e conquistar, especialmente no trabalho. Provedor nato, transforma cumprimento da lei em dever.",
    negativo: "Quando negativo, traz problemas de ordem moral e jurídica. Pode sofrer por orgulho e autoritarismo.",
    evitar: "orgulho e autoritarismo", advice: "liderar com sabedoria"
  },
  {
    number: 7, name: "Odi", orixa: "Omolu, Obaluaiê",
    orixaDescricao: "Regido por Omolu/Obaluaiê, orixá da terra, das doenças e da cura. Senhor da transformação e renovação.",
    elemento: "Terra",
    meaning: "Energia de proteção e estratégia. Odu ligado a mistérios e à capacidade de se renovar constantemente.",
    personality: "Pessoa estratégica, reservada e inteligente. Observa tudo antes de agir. Forte espiritualmente, mas pode guardar ressentimentos.",
    positivo: "Capacidade de se renovar, inteligência estratégica, proteção espiritual forte. Resiliência diante de adversidades.",
    negativo: "Tendência a guardar mágoas, isolamento excessivo, dificuldade em perdoar.",
    evitar: "guardar mágoas", advice: "praticar perdão"
  },
  {
    number: 8, name: "Ejionile", orixa: "Xangô, Oxalá",
    orixaDescricao: "Regido por Xangô e Oxalá. Representa justiça suprema e responsabilidade espiritual elevada.",
    elemento: "Fogo",
    meaning: "Odù da justiça e responsabilidade. Equilíbrio entre firmeza e compaixão.",
    personality: "Pessoa justa, responsável e equilibrada. Tem senso de dever forte. Pode ser rígida demais consigo e com os outros.",
    positivo: "Forte senso de justiça, capacidade de mediar conflitos, responsabilidade e integridade moral.",
    negativo: "Rigidez excessiva, autocrítica destrutiva, tendência a cobrar demais dos outros.",
    evitar: "rigidez e excesso de cobrança", advice: "buscar equilíbrio"
  },
  {
    number: 9, name: "Ossá", orixa: "Iansã, Logunedé",
    orixaDescricao: "Regido por Iansã, senhora dos ventos e tempestades, e Logunedé, orixá da caça e da pesca.",
    elemento: "Ar",
    meaning: "Energia de movimento e mudança. Transformação constante e necessidade de liberdade.",
    personality: "Pessoa inquieta, corajosa e transformadora. Não tem medo de mudanças. Precisa de liberdade, mas deve cuidar da instabilidade.",
    positivo: "Adaptabilidade, coragem para mudanças, capacidade de se reinventar. Espírito livre e inovador.",
    negativo: "Instabilidade emocional, dificuldade de manter compromissos longos, inquietude constante.",
    evitar: "instabilidade", advice: "manter foco"
  },
  {
    number: 10, name: "Ofun", orixa: "Oxalá, Orunmilá",
    orixaDescricao: "Regido por Oxalá (pai de todos os orixás, criador da humanidade) e Orunmilá (senhor do destino e da sabedoria).",
    elemento: "Ar",
    meaning: "Odù da sabedoria espiritual. Pureza, visão profunda e missão elevada no mundo material.",
    personality: "Pessoa sábia, espiritual e com missão elevada. Pureza de coração e visão profunda. Pode ser incompreendida pelo mundo material.",
    positivo: "Sabedoria natural, conexão espiritual profunda, capacidade de guiar outros. Visão além do material.",
    negativo: "Incompreensão do mundo material, tendência ao isolamento espiritual, dificuldade com questões práticas.",
    evitar: "absorver energia negativa", advice: "cuidar da espiritualidade"
  },
  {
    number: 11, name: "Owonrin", orixa: "Exu, Iansã",
    orixaDescricao: "Regido por Exu (guardião dos caminhos) e Iansã (senhora dos ventos). Comunicação e expressão artística.",
    elemento: "Fogo",
    meaning: "Energia da comunicação e criatividade. Dom da palavra e expressão artística.",
    personality: "Pessoa criativa, comunicativa e expressiva. Tem o dom da palavra e da arte. Carismática, mas precisa saber a hora de calar.",
    positivo: "Carisma natural, talento artístico, poder de persuasão e comunicação. Capacidade de inspirar.",
    negativo: "Falar demais, revelar segredos, usar a palavra de forma destrutiva. Dispersão criativa.",
    evitar: "falar demais", advice: "usar palavra com sabedoria"
  },
  {
    number: 12, name: "Ejilaxeborá", orixa: "Oxum, Iemanjá",
    orixaDescricao: "Regido por Oxum e Iemanjá, as grandes mães das águas doces e salgadas. União feminina e poder maternal.",
    elemento: "Água",
    meaning: "Odù da união e parceria. Valorização dos vínculos e capacidade de construir relações duradouras.",
    personality: "Pessoa acolhedora, parceira e dedicada. Valoriza vínculos e relacionamentos. Pode se anular em prol dos outros.",
    positivo: "Dedicação aos relacionamentos, capacidade de unir pessoas, poder maternal e protetor.",
    negativo: "Anulação pessoal, dependência emocional, dificuldade de impor limites nos relacionamentos.",
    evitar: "anular a própria vontade", advice: "desenvolver autonomia"
  },
  {
    number: 13, name: "Ejiologbon", orixa: "Orunmilá, Oxalá",
    orixaDescricao: "Regido por Orunmilá (senhor do destino) e Oxalá (pai criador). Sabedoria ancestral e conhecimento profundo.",
    elemento: "Ar",
    meaning: "Energia de sabedoria e conhecimento. Alma velha com visão de longo prazo.",
    personality: "Alma velha. Pessoa madura, estudiosa e com visão de longo prazo. Sábia desde jovem, mas pode se isolar.",
    positivo: "Maturidade precoce, capacidade de ensinar, visão estratégica de longo prazo. Conhecimento ancestral.",
    negativo: "Isolamento social, dificuldade de se conectar com pessoas da mesma idade, solidão intelectual.",
    evitar: "isolamento", advice: "compartilhar conhecimento"
  },
  {
    number: 14, name: "Iká", orixa: "Obaluaiê, Nanã",
    orixaDescricao: "Regido por Obaluaiê (senhor da terra e das doenças) e Nanã (a mais velha dos orixás, senhora da lama primordial).",
    elemento: "Terra",
    meaning: "Energia espiritual profunda e transformação. Cada obstáculo fortalece o espírito.",
    personality: "Pessoa resiliente que supera grandes provas. Forte espiritualmente e com poder de cura. Cada obstáculo a fortalece.",
    positivo: "Resiliência extraordinária, poder de cura espiritual, capacidade de transformar dor em sabedoria.",
    negativo: "Tendência a atrair provações constantes, absorção de energias pesadas, desgaste espiritual.",
    evitar: "ambientes negativos", advice: "fortalecer proteção espiritual"
  },
  {
    number: 15, name: "Ogbéogundá", orixa: "Ogum, Oxóssi",
    orixaDescricao: "Regido por Ogum (senhor do ferro e da guerra) e Oxóssi (senhor da caça e das matas). Desbravadores de caminhos.",
    elemento: "Terra",
    meaning: "Odù de abertura de caminhos. Prosperidade natural e facilidade para conquistas.",
    personality: "Pessoa com caminhos sempre se abrindo. Prosperidade natural e facilidade para conquistas. Precisa manter a humildade.",
    positivo: "Caminhos sempre abertos, prosperidade natural, proteção espiritual forte nas matas e estradas.",
    negativo: "Pode se perder pela falta de planejamento, arrogância diante das conquistas fáceis.",
    evitar: "agir sem planejamento", advice: "focar nos objetivos"
  },
  {
    number: 16, name: "Aláfia", orixa: "Oxalá, Oxum",
    orixaDescricao: "Regido por Oxalá (o grande pai, criador) e Oxum (mãe das águas doces). Paz suprema e equilíbrio divino.",
    elemento: "Ar",
    meaning: "Energia de paz e equilíbrio. Proteção espiritual forte e missão elevada.",
    personality: "Pessoa pacificadora, equilibrada e com proteção espiritual forte. Missão elevada. Não deve se acomodar.",
    positivo: "Paz interior, proteção divina constante, capacidade de harmonizar ambientes e pessoas.",
    negativo: "Acomodação, passividade excessiva, pode deixar de agir por excesso de confiança na proteção espiritual.",
    evitar: "acomodação", advice: "manter espiritualidade forte"
  },
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
    `Personalidade: ${odu.personality}`,
    `Conselho: ${odu.advice}`,
    `⚠️ Evitar: ${odu.evitar}`,
  ].join("\n");
}

function generateCabalaSummary(
  superior: Odu, inferior: Odu, lateral: Odu, central: Odu, finalOdu: Odu
): string {
  return [
    `Seu caminho espiritual é guiado pelo Odu ${superior.name}.`,
    ``,
    `👤 Personalidade pelo cálculo:`,
    `${superior.personality}`,
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
    `Superior: ${superior.name} (${superior.orixa}) — ${superior.personality}`,
    `Inferior: ${inferior.name} (${inferior.orixa}) — ${inferior.personality}`,
    `Central: ${central.name} (${central.orixa}) — ${central.personality}`,
    `Final: ${finalOdu.name} (${finalOdu.orixa}) — ${finalOdu.personality}`,
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
