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
import card17 from "@/assets/cards/card-17.png";
import card18 from "@/assets/cards/card-18.png";
import card19 from "@/assets/cards/card-19.png";
import card20 from "@/assets/cards/card-20.png";
import card21 from "@/assets/cards/card-21.png";
import card22 from "@/assets/cards/card-22.png";
import card23 from "@/assets/cards/card-23.png";
import card24 from "@/assets/cards/card-24.png";
import card25 from "@/assets/cards/card-25.png";
import card26 from "@/assets/cards/card-26.png";
import card27 from "@/assets/cards/card-27.png";
import card28 from "@/assets/cards/card-28.png";
import card29 from "@/assets/cards/card-29.png";
import card30 from "@/assets/cards/card-30.png";
import card31 from "@/assets/cards/card-31.png";
import card32 from "@/assets/cards/card-32.png";
import card33 from "@/assets/cards/card-33.png";
import card34 from "@/assets/cards/card-34.png";
import card35 from "@/assets/cards/card-35.png";
import card36 from "@/assets/cards/card-36.png";

const cardImages: Record<number, string> = {
  1: card01, 2: card02, 3: card03, 4: card04, 5: card05,
  6: card06, 7: card07, 8: card08, 9: card09, 10: card10,
  11: card11, 12: card12, 13: card13, 14: card14, 15: card15,
  16: card16, 17: card17, 18: card18, 19: card19, 20: card20,
  21: card21, 22: card22, 23: card23, 24: card24, 25: card25,
  26: card26, 27: card27, 28: card28, 29: card29, 30: card30,
  31: card31, 32: card32, 33: card33, 34: card34, 35: card35,
  36: card36,
};

export function getCardImage(number: number): string | undefined {
  return cardImages[number];
}
