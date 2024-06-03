import { createIconArray, duplicateArray, shuffle } from "./utils.js";

// Создание карты
function createGameCard(defaultIcon, flippendCardIcon) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const notFlippedCardI = document.createElement("i");
  const flippendCardI = document.createElement("i");

  notFlippedCardI.classList.add("fa", `fa-${defaultIcon}`);
  flippendCardI.classList.add("fa", `fa-${flippendCardIcon}`);

  // Устанавливаем атрибут data-icon для карточки
  card.dataset.icon = flippendCardIcon;

  card.append(flippendCardI, notFlippedCardI);

  return card;
}

// Создание и перемешивание массива карт
export const createAndShuffleCardsArray = (cardsCount) => {
  const cardsIcons = createIconArray(cardsCount);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);
  shuffle(duplicatedCardsIcons);
  const cards = duplicatedCardsIcons.map((icon) =>
    createGameCard("question-circle", icon)
  );
  return cards;
};
