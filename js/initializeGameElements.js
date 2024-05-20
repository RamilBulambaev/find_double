import { createButtons, createDiv } from "./ui.js";
import { gameSectionContainer, confettiContainer } from "./domElements.js";

export const initializeGameElements = (level) => {
  confettiContainer.innerHTML = "";
  gameSectionContainer.innerHTML = "";

  // Создаем элементы для таймера
  const timerContainer = createDiv(["timer-container"]);
  const timerDisplay = document.createElement("span");
  timerDisplay.classList.add("timer-display");
  timerDisplay.textContent = "01:00"; // Начальное значение таймера

  // Добавляем элементы для таймера на страницу
  timerContainer.appendChild(timerDisplay);
  gameSectionContainer.appendChild(timerContainer);

  // Создаем уровень
  gameSectionContainer.appendChild(level);

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
  return { timerDisplay, gameTable, restartBtn, menuBtn };
};
