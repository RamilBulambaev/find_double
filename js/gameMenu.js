import { createButtons, createDiv } from "./ui.js";
import { gameSectionContainer, confettiContainer, KARDS, START_TIME } from "./domElements.js";
import { _currentLevel, createLevelTitle, newGame, getLevelParameters } from "./level.js";
import { startGame } from "./startGame.js";

export const createGameMenu = () => {
  gameSectionContainer.innerHTML = "";

  const titleLevel = createLevelTitle();
  confettiContainer.innerHTML = "";

  const menuBtns = createDiv(["menu-btns"]);

  const createDifficultButton = () => {
    const buttonNewGame = createButtons("Новая игра", ["game-menu__difficult-btn"]);

    buttonNewGame.addEventListener("click", () => {
      const { cardsCount, timeLimit } = getLevelParameters(1);
      startGame(cardsCount, newGame(), timeLimit); // Сброс уровня до первого при новой игре
    });

    if (_currentLevel > 1) {
      const buttonContinue = createButtons("Продолжить", ["game-menu__difficult-btn"]);
      buttonContinue.addEventListener("click", () => {
        const { cardsCount, timeLimit } = getLevelParameters(_currentLevel);
        startGame(cardsCount, createLevelTitle(), timeLimit); // Продолжение игры с текущего уровня
      });
      menuBtns.append(buttonContinue);
    }

    menuBtns.append(buttonNewGame);

    return menuBtns;
  };

  gameSectionContainer.append(titleLevel, createDifficultButton());
};