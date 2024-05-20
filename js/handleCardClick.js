import { confetti } from "./confetti.js";
import { confettiContainer } from "./domElements.js";
import { createGameMenu } from "./gameMenu.js";
import { nextLevel } from "./level.js";
import { stopTimer, startTimer } from "./timer.js";
import { showResultModal } from "./ui.js";

const TIME_BONUS = 5;

export const handleCardClick = (gameTable, cardsIcons, level, mode) => {
  let flippedCards = [];
  let clickable = true;

  gameTable.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".game-card");
    if (!clickedCard || flippedCards.length === 2 || !clickable) return;

    if (!clickedCard.classList.contains("flip")) {
      clickedCard.classList.add("flip");
      flippedCards.push(clickedCard);
    }

    if (flippedCards.length === 2) {
      clickable = false;
      const [firstCard, secondCard] = flippedCards;
      const firstIcon = firstCard.dataset.icon;
      const secondIcon = secondCard.dataset.icon;

      if (firstIcon !== secondIcon) {
        setTimeout(() => {
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");
          flippedCards = [];
          clickable = true;
        }, 500);
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.add("successfully");
          });
          flippedCards = [];
          clickable = true;

          if (mode === "time") {
            let timerDisplay = document.querySelector(".timer-display");
            let timeRemaining = parseInt(timerDisplay.textContent.split(":")[1]) + TIME_BONUS;
            startTimer(timeRemaining, () => {
              stopTimer();
              showResultModal(
                "Время вышло! Попробуйте снова.",
                createGameMenu,
                () => {
                  resetLevel(); // Сброс уровня до первого в режиме времени
                  startGame(10, createLevelTitle(), "time"); // Начинаем с первого уровня режима времени
                },
                "Рестарт"
              );
            });
          }

          if (document.querySelectorAll(".successfully").length === cardsIcons.length) {
            confettiContainer.innerHTML = confetti;
            stopTimer();
            showResultModal(
              "Поздравляем! Вы выиграли!",
              createGameMenu,
              () => nextLevel(mode),
              "Следующий уровень"
            );
          }
        }, 500);
      }
    }
  });
};