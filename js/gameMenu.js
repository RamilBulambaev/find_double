import { createButtons, createDiv } from "./ui.js";
import { gameSectionContainer, confettiContainer } from "./domElements.js";
import {
  continueGame,
  createLevelTitle,
  getCurrentLevel,
  newGame,
} from "./level.js";
import { startGame } from "./startGame.js";
import { KARDS } from "./gameSettings.js";

export const createGameMenu = () => {
  gameSectionContainer.innerHTML = ""; // Отчистка меню

  const titleLevel = createLevelTitle("normal"); // Создание заголовка
  confettiContainer.innerHTML = ""; // Убераем конфети

  const menuBtns = createDiv(["menu-btns"]); // Создание контейнера для кнопок

  // Функция создания кнопок
  const createDifficultButton = () => {
    // Создание кнопки Новая игра
    const buttonNewGame = createButtons("Новая игра", [
      "game-menu__difficult-btn",
    ]);

    // Сброс уровня до первого при новой игре
    buttonNewGame.addEventListener("click", () => {
      startGame(KARDS, newGame("normal"), "normal");
    });

    // Создание кнопки "Режим времени"
    const buttonTimeMode = createButtons("Режим времени", [
      "game-menu__difficult-btn",
    ]);

    // Начать игру с колличеством KARDS карточками и режимом времени
    buttonTimeMode.addEventListener("click", () => {
      startGame(KARDS, newGame("time"), "time");
    });

    // Если уровень > 1 добавляем кнопку "Продолжить"
    if (getCurrentLevel() > 1) {
      const buttonContinue = createButtons("Продолжить", [
        "game-menu__difficult-btn",
      ]);
      buttonContinue.addEventListener("click", continueGame);
      menuBtns.append(buttonContinue);
    }

    // Добавление кнопок в контейнер кнопок
    menuBtns.append(buttonNewGame, buttonTimeMode);

    return menuBtns;
  };

  // Добовление Заголовка и кнопок в меню
  gameSectionContainer.append(titleLevel, createDifficultButton());
};
