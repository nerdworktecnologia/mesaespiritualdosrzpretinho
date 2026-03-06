import card01 from "@/assets/cards/card-01.png";
import card04 from "@/assets/cards/card-04.png";
import card06 from "@/assets/cards/card-06.png";
import card15 from "@/assets/cards/card-15.png";
import card32 from "@/assets/cards/card-32.png";
import card36 from "@/assets/cards/card-36.png";

const cardImages: Record<number, string> = {
  1: card01,
  4: card04,
  6: card06,
  15: card15,
  32: card32,
  36: card36,
};

export function getCardImage(number: number): string | undefined {
  return cardImages[number];
}
