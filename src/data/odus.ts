export interface Odu {
  number: number;
  name: string;
  meaning: string;
}

export const odus: Odu[] = [
  { number: 1, name: "Okaran", meaning: "Início e individualidade. Pessoa forte mas que precisa cuidar da solidão. Líder nato." },
  { number: 2, name: "Ejioko", meaning: "Dualidade e escolhas. Pessoa indecisa que precisa confiar mais na intuição." },
  { number: 3, name: "Etá Ogundá", meaning: "Força guerreira e superação. Pessoa que vence pelo esforço próprio." },
  { number: 4, name: "Irosun", meaning: "Ancestralidade forte. Ligação poderosa com os antepassados e mundo espiritual." },
  { number: 5, name: "Oxê", meaning: "Amor e fertilidade. Caminho ligado a relacionamentos e criação." },
  { number: 6, name: "Obará", meaning: "Comunicação e espiritualidade. Abertura de caminhos e prosperidade pelo verbo." },
  { number: 7, name: "Odí", meaning: "Transformação e renascimento. Fechamento de ciclos necessários." },
  { number: 8, name: "Ejionoshe", meaning: "Equilíbrio e justiça. Pessoa que colhe exatamente o que planta." },
  { number: 9, name: "Ossá", meaning: "Mistério e segredos. Pessoa com forte mediunidade e sensibilidade." },
  { number: 10, name: "Ofun", meaning: "Pureza e criação. Pessoa com missão espiritual importante." },
  { number: 11, name: "Owarin", meaning: "Inteligência e estratégia. Pessoa astuta que precisa usar a sabedoria." },
  { number: 12, name: "Ejilaxeborá", meaning: "Poder e liderança espiritual. Pessoa com muita força interior." },
  { number: 13, name: "Ejiologbon", meaning: "Sabedoria ancestral. Pessoa velha de espírito com muita experiência." },
  { number: 14, name: "Iká", meaning: "Superação de obstáculos. Pessoa que enfrenta demandas e vence." },
  { number: 15, name: "Ogbeogundá", meaning: "Prosperidade e abundância. Caminho de fartura aberto." },
  { number: 16, name: "Alafin", meaning: "Realeza espiritual. Pessoa com proteção direta dos Orixás." },
];

export function calculateOdu(fullName: string, birthDate: string): { principal: Odu; destino: Odu; message: string } {
  // Reduce name to number
  const nameValue = fullName
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((sum, char) => sum + (char.charCodeAt(0) - 64), 0);
  
  // Reduce birth date
  const dateValue = birthDate
    .replace(/\D/g, "")
    .split("")
    .reduce((sum, d) => sum + parseInt(d), 0);

  const reduceToOdu = (n: number): number => {
    let result = n;
    while (result > 16) {
      result = result.toString().split("").reduce((s, d) => s + parseInt(d), 0);
    }
    return result || 1;
  };

  const principalNum = reduceToOdu(nameValue + dateValue);
  const destinoNum = reduceToOdu(dateValue);

  const principal = odus[principalNum - 1] || odus[0];
  const destino = odus[destinoNum - 1] || odus[0];

  const messages = [
    `Caminho ligado à ${principal.name.toLowerCase()} com destino em ${destino.name.toLowerCase()}.`,
    `Pessoa protegida espiritualmente, mas precisa vigiar inveja e falsidade ao redor.`,
    `A força do Odu ${principal.name} guia seus passos nesta encarnação.`,
  ];

  return { principal, destino, message: messages.join("\n") };
}
