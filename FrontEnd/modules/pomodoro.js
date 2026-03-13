export function pomodoroTimer() {
  const startBtn = document.querySelector(".start-timer");
  const pauseBtn = document.querySelector(".pause-timer");
  const resetBtn = document.querySelector(".reset-timer");

  const timer = document.querySelector("#timer-display");
  const circle = document.querySelector(".pomodoro-timer");
  const session = document.querySelector(".session h4");

  let isWorkSession = true;
  let totalSeconds = 25 * 60;
  let initialDuration = 25 * 60;
  let timeInterval = null;

  function updateProgress() {
    const progressRatio = 1 - totalSeconds / initialDuration;
    const degrees = progressRatio * 360;

    const overlayColor = isWorkSession
      ? "rgba(0, 255, 0, 0.25)"
      : "rgba(0, 120, 255, 0.25)";

    circle.style.background = `
      conic-gradient(
        from 0deg,
        ${overlayColor} 0deg,
        ${overlayColor} ${degrees}deg,
        transparent ${degrees}deg,
        transparent 360deg
      ),
      radial-gradient(circle, var(--tri1), var(--tri2))
    `;
  }

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (!timer) return;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    updateProgress();
  }

  function switchSession() {
    isWorkSession = !isWorkSession;

    if (isWorkSession) {
      totalSeconds = 25 * 60;
      initialDuration = 25 * 60;
      session.innerHTML = "Deep Work";
      session.style.backgroundColor = "var(--green)";
    } else {
      totalSeconds = 5 * 60;
      initialDuration = 5 * 60;
      session.innerHTML = "Take A Break";
      session.style.backgroundColor = "var(--blue)";
    }

    updateTimer();
  }

  function startTimer() {
    if (timeInterval) return;

    startBtn.hidden = true;
    pauseBtn.hidden = false;

    timeInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        clearInterval(timeInterval);
        timeInterval = null;
        switchSession();
      }
    }, 10);
  }

  function pauseTimer() {
    clearInterval(timeInterval);
    timeInterval = null;

    startBtn.hidden = false;
    pauseBtn.hidden = true;
  }

  function resetTimer() {
    clearInterval(timeInterval);
    timeInterval = null;

    startBtn.hidden = false;
    pauseBtn.hidden = true;

    isWorkSession = true;
    totalSeconds = 25 * 60;
    initialDuration = 25 * 60;

    session.innerHTML = "Deep Work";

    updateTimer();
  }

  updateTimer();

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}