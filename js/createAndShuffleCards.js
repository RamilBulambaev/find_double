import { createIconArray, duplicateArray, shuffle } from "./utils.js";
import { createGameCard } from "./gameCard.js";

export const createAndShuffleCards = (cardsCount) => {
  const cardsIcons = createIconArray(cardsCount);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);
  shuffle(duplicatedCardsIcons);
  const cards = duplicatedCardsIcons.map((icon) =>
    createGameCard("question-circle", icon)
  );
  return cards;
};
