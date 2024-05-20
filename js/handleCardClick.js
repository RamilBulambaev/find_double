import { confetti } from "./confetti.js";
import { confettiContainer } from "./domElements.js";
import { createGameMenu } from "./gameMenu.js";
import { nextLevel } from "./level.js";
import { stopTimer, addTimeToTimer } from "./timer.js";
import { showResultModal } from "./ui.js";

export const handleCardClick = (gameTable, cardsIcons, level, mode) => {
  let flippedCards = [];
  let clickable = true;

  gameTable.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".game-card");
    if (!clickedCard || flippedCards.length === 2 || !clickable) return; // Если клик был вне карточек, уже открыты 2 карты или игра не кликабельна, ничего не делаем

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
          clickable = true; // После завершения анимации разрешаем следующие действия
        }, 500); // Увеличиваем задержку до 500 миллисекунд
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.add("successfully");
          });
          flippedCards = []; // Очищаем массив перевернутых карт
          clickable = true; // После завершения анимации разрешаем следующие действия
          if (mode === "time") {
            addTimeToTimer(5); // Добавляем 5 секунд к таймеру
          }
          if (document.querySelectorAll(".successfully").length === cardsIcons.length) {
            confettiContainer.innerHTML = confetti;
            stopTimer();
            showResultModal(
              "Поздравляем! Вы выиграли!",
              createGameMenu, // Функция для кнопки "Меню"
              () => nextLevel(mode), // Функция для кнопки "Следующий уровень"
              "Следующий уровень"
            );
          }
        }, 500); // Увеличиваем задержку до 500 миллисекунд
      }
    }
  });
};