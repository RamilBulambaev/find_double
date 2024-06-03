import { createButtons, createDiv } from "./ui.js";
import { gameSectionContainer, confettiContainer } from "./domElements.js";
import { getCurrentLevel } from "./level.js";

export const initializeGameElements = (level, mode) => {
  confettiContainer.innerHTML = "";
  gameSectionContainer.innerHTML = "";

  // Создаем уровень
  gameSectionContainer.appendChild(level);

  // Создаем элементы для таймера
  const timerContainer = createDiv(["timer-container"]);
  const timerDisplay = document.createElement("span");
  timerDisplay.classList.add("timer-display");
  timerDisplay.textContent = "01:00"; // Начальное значение таймера
  timerContainer.appendChild(timerDisplay);

  // Создание элемента с допустимыми ошибками
  const mistakeContainer = createDiv(["mistake=container"]);
  const mistake = document.createElement("span");
  mistake.classList.add("mistake");
  const currentLevel = getCurrentLevel();
  let mistakeCount = Math.ceil(currentLevel / 10) * 10;
  mistakeCount = mistakeCount > 50 ? 50 : mistakeCount;
  mistake.textContent = `Доступно ошибок: ${mistakeCount}`;
  mistakeContainer.append(mistake);

  // Добавление необходимого элемента в соответствии с режимом игры
  if (mode === "time") {
    gameSectionContainer.appendChild(timerContainer);
  } else {
    gameSectionContainer.appendChild(mistakeContainer);
  }

  // Создаем игровую таблицу
  const gameTable = createDiv(["game-table"]);
  gameSectionContainer.appendChild(gameTable);

  // Создаем кнопки "Рестарт" и "Меню"
  const gameBtns = createDiv(["gameBtn__container"]);
  const restartBtn = createButtons("Рестарт", ["restart-btn", "btn-game"]);
  const menuBtn = createButtons("Меню", ["menu-btn", "btn-game"]);
  gameBtns.append(restartBtn, menuBtn);
  gameSectionContainer.appendChild(gameBtns);

  // Возвращаем объект, содержащий все созданные элементы
  return { gameTable, restartBtn, menuBtn, mistakeCount, mistake };
};
