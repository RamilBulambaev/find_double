import { createGameMenu } from "./gameMenu.js";
import { KARDS } from "./gameSettings.js";
import { createLevelTitle, resetLevel } from "./level.js";
import { startGame } from "./startGame.js";
import { showResultModal } from "./ui.js";

let timerInterval;
let timeRemaining; // Глобальная переменная для хранения оставшегося времени

export const startTimer = (duration, onTimeUp) => {
  timeRemaining = duration;
  const timerDisplay = document.querySelector(".timer-display");
  timerDisplay.textContent = formatTime(timeRemaining);

  timerInterval = setInterval(() => {
    timeRemaining -= 1;
    timerDisplay.textContent = formatTime(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      onTimeUp();
    }
  }, 1000);
};

export const stopTimer = () => {
  clearInterval(timerInterval);
};

export const getTimeRemaining = () => {
  return timeRemaining;
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export function endTime(mode) {
  stopTimer(); // Останавливаем таймер
  showResultModal(
    "Время вышло! Попробуйте снова.",
    createGameMenu, // Функция для кнопки "Меню"
    () => {
      resetLevel(); // Сбрасываем уровень до первого в режиме времени
      startGame(KARDS, createLevelTitle("time"), "time"); // Начинаем с первого уровня режима времени
    },
    "Рестарт"
  );
}
