import { initializeGameElements } from "./initializeGameElements.js";
import { createAndShuffleCards } from "./createAndShuffleCards.js";
import { handleCardClick } from "./handleCardClick.js";
import { createGameMenu } from "./gameMenu.js";
import { startTimer, stopTimer } from "./timer.js";
import { showResultModal } from "./ui.js";

export const startGame = (cardsCount, level, timeLimit) => {
  const { gameTable, restartBtn, menuBtn } = initializeGameElements(level);
  const cards = createAndShuffleCards(cardsCount);
  gameTable.append(...cards);

  const cardsIcons = cards.map((card) => card.dataset.icon);
  handleCardClick(gameTable, cardsIcons, level); // Добавляем обработчик клика по карточкам

  restartBtn.addEventListener("click", () => {
    stopTimer();
    startGame(cardsCount, level, timeLimit);
  });
  menuBtn.addEventListener("click", () => {
    stopTimer();
    createGameMenu();
  });

  startTimer(timeLimit, () => {
    stopTimer(); // Останавливаем таймер
    showResultModal(
      "Время вышло! Попробуйте снова.",
      createGameMenu, // Функция для кнопки "Меню"
      () => startGame(cardsCount, level, timeLimit), // Функция для кнопки "Рестарт"
      "Рестарт"
    );
  });
};