import { KARDS, START_TIME } from "./domElements.js";
import { startGame } from "./startGame.js";

export let _currentLevel = 1;

const titleLevel = document.createElement("h2");
titleLevel.classList.add("game-menu__title");

export const createLevelTitle = () => {
  titleLevel.textContent = `Уровень ${_currentLevel}`;
  return titleLevel;
};

export const nextLevel = () => {
  _currentLevel++;
  const { cardsCount, timeLimit } = getLevelParameters(_currentLevel);
  startGame(cardsCount, createLevelTitle(), timeLimit);
};

export const newGame = () => {
  _currentLevel = 1; // Сброс уровня до первого
  return createLevelTitle();
};

export const getLevelParameters = (level) => {
  const baseCardsCount = KARDS; // Начальное количество карт
  const baseTimeLimit = START_TIME; // Начальное время (в секундах)

  // Логика увеличения сложности
  const cardsCount = baseCardsCount + level * 2; // Увеличиваем количество карт на 2 с каждым уровнем
  const timeLimit = Math.max(baseTimeLimit - level * 5, 10); // Уменьшаем время на 5 секунд с каждым уровнем, минимум 10 секунд

  return { cardsCount, timeLimit };
};