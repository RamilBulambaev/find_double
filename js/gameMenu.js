import { createButtons } from "./ui.js";
import {
  TIME,
  confettiContainer,
  gameSectionContainer,
} from "./domElements.js";
import { createLevelTitle } from "./level.js";
import { startGame } from "./startGame.js";

export const createGameMenu = () => {
  gameSectionContainer.innerHTML = "";

  const titleLevel = createLevelTitle();
  confettiContainer.innerHTML = "";

  const createDifficultButton = () => {
    const button = createButtons("Новая игра", ["game-menu__difficult-btn"]);

    button.addEventListener("click", () => startGame(TIME, titleLevel));

    return button;
  };

  gameSectionContainer.append(titleLevel, createDifficultButton());
};
