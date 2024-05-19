import { TIME } from "./domElements.js";
import { startGame } from "./startGame.js";

let _currentLevel = 1;

const titleLevel = document.createElement("h2");
titleLevel.classList.add("game-menu__title");

export const createLevelTitle = () => {
  titleLevel.textContent = `Уровень ${_currentLevel}`;
  return titleLevel;
};

export const nextLevel = () => {
  _currentLevel++;
  startGame(TIME, createLevelTitle());
};
