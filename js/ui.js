import { startGame } from "./startGame.js";
import { createLevelTitle, nextLevel } from "./level.js";

export const createButtons = (text, classes = []) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...classes);
  return button;
};

// Создание div
export const createDiv = (classes = []) => {
  const div = document.createElement("div");
  div.classList.add(...classes);
  return div;
};

// Модальное окно с результатом
export const showResultModal = (
  messageText,
  onMenuClick,
  onPrimaryActionClick,
  primaryActionText
) => {
  const modalOverlay = createDiv(["modal-overlay"]);
  const modal = createDiv(["modal"]);
  const message = document.createElement("p");
  message.textContent = messageText;

  const menuButton = createButtons("Меню", ["menu-btn", "btn-game"]);
  const primaryActionButton = createButtons(primaryActionText, [
    "primary-action-btn",
    "btn-game",
  ]);

  menuButton.addEventListener("click", () => {
    document.body.classList.remove("modal-active");
    modalOverlay.remove();
    onMenuClick();
  });

  primaryActionButton.addEventListener("click", () => {
    document.body.classList.remove("modal-active");
    modalOverlay.remove();
    onPrimaryActionClick();
  });

  modal.append(message, menuButton, primaryActionButton);
  modalOverlay.append(modal);
  document.body.append(modalOverlay);
  document.body.classList.add("modal-active");
};
