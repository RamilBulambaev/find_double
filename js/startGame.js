/* 
Функция startGame запускает игру
Принимает 3 аргумента: 
1) difficult - колличество карт в игре (int)
2) level - текущий уровень игры (dom element)
3) mode - режим игры (str)
*/

import { initializeGameElements } from "./initializeGameElements.js";
import { createAndShuffleCardsArray } from "./createAndShuffleCards.js";
import { handleCardClick } from "./handleCardClick.js";
import { createGameMenu } from "./gameMenu.js";
import { endTime, startTimer, stopTimer } from "./timer.js";
import { newGame } from "./level.js";
import { TIMER_DURATION_TIME_MODE } from "./gameSettings.js";

export const startGame = (difficult, level, mode) => {
  const { gameTable, restartBtn, menuBtn, mistakeCount, mistake } =
    initializeGameElements(level, mode); // Инициализация игровых элементов
  const cards = createAndShuffleCardsArray(difficult); // Создание и перемешивание карт
  gameTable.append(...cards); // Добавление карт на поле

  const cardsIcons = cards.map((card) => card.dataset.icon);
  handleCardClick(
    gameTable,
    cardsIcons,
    mode,
    mistakeCount,
    mistake,
    difficult
  ); // Добавляем обработчик клика по карточкам

  // Кнопка "Рестарт" доступна только обычном режиме игры
  if (mode === "normal") {
    restartBtn.addEventListener("click", () => {
      newGame("time");
      stopTimer();
      startGame(difficult, level, mode);
    });
  } else {
    restartBtn.style.display = "none"; // Скрыть кнопку "Рестарт" в режиме времени
  }

  // Нажатие кнопки "Меню"
  menuBtn.addEventListener("click", () => {
    stopTimer();
    createGameMenu();
  });

  let timerDuration;
  if (mode === "time") {
    timerDuration = TIMER_DURATION_TIME_MODE;
    startTimer(timerDuration, () => endTime());
  }
};
