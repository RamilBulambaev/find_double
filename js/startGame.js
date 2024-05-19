import { confetti } from "./confetti.js";
import { createGameCard } from "./gameCard.js";
import { createGameMenu } from "./gameMenu.js";
import { createIconArray, duplicateArray, shuffle } from "./utils.js";

export const startGame = (difficult) => {
  const gameSection = document.querySelector(".game-section__container");
  const gameTable = document.createElement("div");
  const cardsIcons = createIconArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);
  const restartBtn = document.createElement("button");

  gameSection.innerHTML = "";
  restartBtn.textContent = "Рестарт";
  gameTable.classList.add("game-table");
  restartBtn.classList.add("restart-btn");

  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((icon) =>
    gameTable.append(createGameCard("question-circle", icon))
  );

  gameSection.append(gameTable, restartBtn);

  let flippedCards = [];
  let clickable = true;

  gameTable.addEventListener("click", (event) => {
    if (!clickable) return; // Если карточки еще анимируются, игнорируем клики
    const clickedCard = event.target.closest(".game-card");
    if (!clickedCard || flippedCards.length === 2) return; // Если клик был вне карточек или уже открыты 2 карты, ничего не делаем

    if (!clickedCard.classList.contains("flip")) {
      clickedCard.classList.add("flip");
      flippedCards.push(clickedCard);
    }

    if (flippedCards.length === 2) {
      clickable = false; // Запрещаем клики, пока карточки анимируются
      const [firstCard, secondCard] = flippedCards;
      const firstIcon = firstCard.dataset.icon;
      const secondIcon = secondCard.dataset.icon;

      if (firstIcon !== secondIcon) {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          flippedCards = []; // Очищаем массив перевернутых карт
          // После завершения анимации разрешаем следующие действия
          clickable = true;
        }, 500); // Увеличиваем задержку до 500 миллисекунд
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.add("successfully");
          });
          flippedCards = []; // Очищаем массив перевернутых карт
          // После завершения анимации разрешаем следующие действия
          clickable = true;
          if (
            document.querySelectorAll(".successfully").length ===
            cardsIcons.length * 2
          ) {
            // Если все карты угаданы, выводим конфетти
            document.querySelector(".confetti").innerHTML = confetti;
          }
        }, 500); // Увеличиваем задержку до 500 миллисекунд
      }
    }
  });

  restartBtn.addEventListener("click", createGameMenu);
};
