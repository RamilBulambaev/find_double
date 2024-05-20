import { initializeGameElements } from "./initializeGameElements.js";
import { createAndShuffleCards } from "./createAndShuffleCards.js";
import { handleCardClick } from "./handleCardClick.js";
import { createGameMenu } from "./gameMenu.js";
import { startTimer, stopTimer } from "./timer.js";
import { _currentLevel, resetLevel } from "./level.js";

const BASE_TIMER_DURATION_NORMAL = 60; // Начальное время 60 секунд для обычного режима
const TIMER_DURATION_TIME_MODE = 15; // Таймер на 15 секунд для режима времени

export const startGame = (difficult, level, mode) => {
  const { gameTable, restartBtn, menuBtn } = initializeGameElements(level);
  const cards = createAndShuffleCards(difficult);
  gameTable.append(...cards);

  const cardsIcons = cards.map((card) => card.dataset.icon);
  handleCardClick(gameTable, cardsIcons, level, mode); // Добавляем обработчик клика по карточкам

  if (mode === "normal") {
    restartBtn.addEventListener("click", () => {
      stopTimer();
      startGame(difficult, level, mode);
    });
  } else {
    restartBtn.style.display = "none"; // Скрыть кнопку "Рестарт" в режиме времени
  }

  menuBtn.addEventListener("click", () => {
    stopTimer();
    createGameMenu();
  });

  let timerDuration;
  if (mode === "time") {
    timerDuration = TIMER_DURATION_TIME_MODE;
  } else {
    timerDuration = BASE_TIMER_DURATION_NORMAL - (_currentLevel - 1) * 5;
  }

  startTimer(timerDuration, () => {
    stopTimer(); // Останавливаем таймер
    showResultModal(
      "Время вышло! Попробуйте снова.",
      createGameMenu, // Функция для кнопки "Меню"
      () => {
        if (mode === "time") {
          resetLevel(); // Сбрасываем уровень до первого в режиме времени
          startGame(10, createLevelTitle(), "time"); // Начинаем с первого уровня режима времени
        } else {
          startGame(difficult, level, mode); // Функция для кнопки "Рестарт"
        }
      },
      "Рестарт"
    );
  });
};

