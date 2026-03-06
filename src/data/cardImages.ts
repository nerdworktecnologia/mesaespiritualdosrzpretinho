import card01 from "@/assets/cards/card-01.png";
import card02 from "@/assets/cards/card-02.png";
import card03 from "@/assets/cards/card-03.png";
import card04 from "@/assets/cards/card-04.png";
import card05 from "@/assets/cards/card-05.png";
import card06 from "@/assets/cards/card-06.png";
import card07 from "@/assets/cards/card-07.png";
import card08 from "@/assets/cards/card-08.png";
import card09 from "@/assets/cards/card-09.png";
import card10 from "@/assets/cards/card-10.png";
import card11 from "@/assets/cards/card-11.png";
import card12 from "@/assets/cards/card-12.png";
import card13 from "@/assets/cards/card-13.png";
import card14 from "@/assets/cards/card-14.png";
import card15 from "@/assets/cards/card-15.png";
import card16 from "@/assets/cards/card-16.png";
import card32 from "@/assets/cards/card-32.png";
import card36 from "@/assets/cards/card-36.png";

const cardImages: Record<number, string> = {
  1: card01, 2: card02, 3: card03, 4: card04, 5: card05,
  6: card06, 7: card07, 8: card08, 9: card09, 10: card10,
  11: card11, 12: card12, 13: card13, 14: card14, 15: card15,
  16: card16, 32: card32, 36: card36,
};

export function getCardImage(number: number): string | undefined {
  return cardImages[number];
}
