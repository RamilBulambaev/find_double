import { initializeGameElements } from "./initializeGameElements.js";
import { createAndShuffleCards } from "./createAndShuffleCards.js";
import { handleCardClick } from "./handleCardClick.js";
import { createGameMenu } from "./gameMenu.js";
import { startTimer, stopTimer } from "./timer.js";
import { showResultModal } from "./ui.js";

const TIMER_DURATION = 50; // Таймер на 1 минуту (60 секунд)

export const startGame = (difficult, level) => {
  const { gameTable, restartBtn, menuBtn } = initializeGameElements(
    difficult,
    level
  );
  const cards = createAndShuffleCards(difficult);
  gameTable.append(...cards);

  const cardsIcons = cards.map((card) => card.dataset.icon);
  handleCardClick(gameTable, cardsIcons, level); // Добавляем обработчик клика по карточкам

  restartBtn.addEventListener("click", () => {
    stopTimer();
    startGame(difficult, level);
  });
  menuBtn.addEventListener("click", () => {
    stopTimer();
    createGameMenu();
  });

  startTimer(TIMER_DURATION, () => {
    stopTimer(); // Останавливаем таймер
    showResultModal(
      "Время вышло! Попробуйте снова.",
      createGameMenu, // Функция для кнопки "Меню"
      () => startGame(difficult, level), // Функция для кнопки "Рестарт"
      "Рестарт"
    );
  });
};
