let timerInterval;

export const startTimer = (duration, onTimeUp) => {
  let timeRemaining = duration;
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

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};