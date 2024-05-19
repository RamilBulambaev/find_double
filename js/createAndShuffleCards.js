import { createIconArray, duplicateArray, shuffle } from "./utils.js";
import { createGameCard } from "./gameCard.js";

export const createAndShuffleCards = (difficult) => {
  const cardsIcons = createIconArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);
  shuffle(duplicatedCardsIcons);
  const cards = duplicatedCardsIcons.map((icon) =>
    createGameCard("question-circle", icon)
  );
  return cards;
};
