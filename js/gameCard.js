export const createGameCard = (defaultIcon, flippendCardIcon) => {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const notFlippedCardI = document.createElement("i");
  const flippendCardI = document.createElement("i");

  notFlippedCardI.classList.add("fa", `fa-${defaultIcon}`);
  flippendCardI.classList.add("fa", `fa-${flippendCardIcon}`);

  // Устанавливаем атрибут data-icon для каждой карточки
  card.dataset.icon = flippendCardIcon;

  card.append(flippendCardI, notFlippedCardI);

  return card;
};
