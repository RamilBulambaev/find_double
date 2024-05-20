import { createButtons, createDiv } from "./ui.js";
import { gameSectionContainer, confettiContainer } from "./domElements.js";
import { _currentLevel, createLevelTitle, newGame } from "./level.js";
import { startGame } from "./startGame.js";

export const createGameMenu = () => {
  gameSectionContainer.innerHTML = "";

  const titleLevel = createLevelTitle();
  confettiContainer.innerHTML = "";

  const menuBtns = createDiv(["menu-btns"]);

  const createDifficultButton = () => {
    const buttonNewGame = createButtons("Новая игра", [
      "game-menu__difficult-btn",
    ]);

    buttonNewGame.addEventListener("click", () => {
      startGame(10, newGame(), "normal"); // Сброс уровня до первого при новой игре
    });

    const buttonTimeMode = createButtons("Режим времени", [
      "game-menu__difficult-btn",
    ]);

    buttonTimeMode.addEventListener("click", () => {
      startGame(10, newGame(), "time"); // Начать игру с 10 карточками и режимом времени
    });

    if (_currentLevel > 1) {
      const buttonContinue = createButtons("Продолжить", [
        "game-menu__difficult-btn",
      ]);
      buttonContinue.addEventListener("click", () => {
        const difficult = 10 + (_currentLevel - 1) * 2;
        const mode = "normal"; // Обычный режим игры
        startGame(difficult, createLevelTitle(), mode); // Продолжение игры с текущего уровня
      });
      menuBtns.append(buttonContinue);
    }

    menuBtns.append(buttonNewGame, buttonTimeMode);

    return menuBtns;
  };

  gameSectionContainer.append(titleLevel, createDifficultButton());
};
