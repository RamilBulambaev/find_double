import { KARDS } from "./domElements.js";
import { startGame } from "./startGame.js";

export let _currentLevel = 1;

const titleLevel = document.createElement("h2");
titleLevel.classList.add("game-menu__title");

export const createLevelTitle = () => {
  titleLevel.textContent = `Уровень ${_currentLevel}`;
  return titleLevel;
};

export const nextLevel = (mode) => {
  _currentLevel++;
  if (mode === "time") {
    startGame(10 + (_currentLevel - 1) * 2, createLevelTitle(), "time");
  } else {
    startGame(KARDS + (_currentLevel - 1) * 2, createLevelTitle(), "normal");
  }
};

export const newGame = () => {
  _currentLevel = 1; // Сброс уровня до первого
  return createLevelTitle();
};

export const resetLevel = () => {
  _currentLevel = 1; // Сброс уровня до первого
};