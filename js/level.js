import { KARDS } from "./gameSettings.js";
import { startGame } from "./startGame.js";

let LS = localStorage;

// Текущий уровень
let _currentLevel = LS.getItem("currentLevel")
  ? +LS.getItem("currentLevel")
  : 1;
let _currentLevelTimeMode = 1;

// Функция создания заголовка уровня
export const createLevelTitle = (mode) => {
  const titleLevel = document.createElement("h2");
  titleLevel.classList.add("game-menu__title");
  mode === "normal"
    ? (titleLevel.textContent = `Уровень ${_currentLevel}`)
    : (titleLevel.textContent = `Уровень ${_currentLevelTimeMode}`);
  return titleLevel;
};

// Функция перехода на следующий уровень
export const nextLevel = (mode) => {
  // В соответствии с модификаций, запускаем уровень с необходимыми параметрами
  if (mode === "time") {
    _currentLevelTimeMode++;
    startGame(
      KARDS + (_currentLevelTimeMode - 1) * 2,
      createLevelTitle(mode),
      "time"
    );
  } else {
    _currentLevel++;
    LS.setItem("currentLevel", _currentLevel);
    startGame(
      KARDS + (_currentLevel - 1) * 2,
      createLevelTitle(mode),
      "normal"
    );
  }
};

export const newGame = (mode) => {
  if (mode === "time") {
    _currentLevelTimeMode = 1;
  } else {
    _currentLevel = 1;
    LS.setItem("currentLevel", _currentLevel); // Сброс уровня до первого
  }
  return createLevelTitle(mode);
};

export const resetLevel = () => {
  _currentLevelTimeMode = 1; // Сброс уровня до первого
};

export function continueGame() {
  const difficult = KARDS + (_currentLevel - 1) * 2;
  const mode = "normal"; // Обычный режим игры
  startGame(difficult, createLevelTitle("normal"), mode); // Продолжение игры с текущего уровня
}

export function getCurrentLevel() {
  return _currentLevel;
}
