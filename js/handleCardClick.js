/*
handleCardClick - логика игры
Принимает 3 аргумента:
1) gameTable - игровое поле (dom element)
2) cardsIcons - массив данных, хранящий название карт(array[])
3) mode - Режим игры (str)
*/

import { KARDS, TIME_BONUS } from "./gameSettings.js";
import { confetti } from "./confetti.js";
import { confettiContainer } from "./domElements.js";
import { createGameMenu } from "./gameMenu.js";
import { createLevelTitle, nextLevel, resetLevel } from "./level.js";
import { stopTimer, startTimer, getTimeRemaining } from "./timer.js";
import { showResultModal } from "./ui.js";
import { startGame } from "./startGame.js";

export const handleCardClick = (
  gameTable,
  cardsIcons,
  mode,
  mistakeCount,
  mistake,
  difficult
) => {
  let flippedCards = [];
  let clickable = true;

  gameTable.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".game-card");
    if (
      !clickedCard ||
      flippedCards.length === 2 ||
      !clickable ||
      clickedCard.classList.contains("flip")
    )
      return;

    clickedCard.classList.add("flip");
    flippedCards.push(clickedCard);

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
          if (mode === "normal") {
            mistakeCount--;
            mistake.textContent = `Доступно ошибок: ${mistakeCount}`;
          }
        }, 500);
      } else {
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.add("successfully");
          });
          flippedCards = [];
          clickable = true;

          if (mode === "time") {
            stopTimer(); // Останавливаем текущий таймер
            const currentTime = getTimeRemaining();
            const newTime = currentTime + TIME_BONUS;
            startTimer(newTime, () => {
              showResultModal(
                "Время вышло! Попробуйте снова.",
                createGameMenu,
                () => {
                  resetLevel(); // Сброс уровня до первого в режиме времени
                  startGame(KARDS, createLevelTitle("time"), "time"); // Начинаем с первого уровня режима времени
                },
                "Рестарт"
              );
            });
          }

          if (
            document.querySelectorAll(".successfully").length ===
            cardsIcons.length
          ) {
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
    if (mistakeCount <= 0) {
      clickable = false;
      showResultModal(
        "Вы проиграли! Попробуйте снова.",
        createGameMenu,
        () => {
          startGame(difficult, createLevelTitle("normal"), "normal");
        },
        "Рестарт"
      );
    }
  });
};
