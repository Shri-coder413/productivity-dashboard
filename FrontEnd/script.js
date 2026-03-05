function openCloseFeature() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const allViews = document.querySelectorAll(".app-view");
  const viewButtons = document.querySelectorAll(".view-btn");

  function renderView(viewName) {
    const targetedView = document.getElementById(`${viewName}-view`);
    if (!targetedView) {
      console.error(`View ${viewName} not found`);
      return;
    }

    // Clear all views
    allViews.forEach((view) => {
      view.classList.remove("active");
    });

    // Activate selected view
    targetedView.classList.add("active");

    // Update active button state
    viewButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });
  }

  sidebar.addEventListener("click", function (e) {
    const button = e.target.closest(".view-btn");
    if (!button) return;

    const viewName = button.dataset.view;
    renderView(viewName);
  });
}

function openSideBar() {
  const menuBtn = document.querySelector("#menu-btn");
  const sidebar = document.querySelector("#sidebar");

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

function taskEngine() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let runningTaskId = null;
  let currentFilter = "active";

  const form = document.querySelector("#task-form");
  const taskList = document.querySelector(".task-list");
  const filters = document.querySelectorAll(".filter");
  const emptyState = document.querySelector(".empty-state");

  if (!form) return;

  function todayStamp() {
    return new Date().toISOString().split("T")[0];
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function activeCount() {
    return tasks.filter((t) => !t.completed && t.dailyStamp === todayStamp())
      .length;
  }

  function dailyCount() {
    return tasks.filter((t) => t.dailyStamp === todayStamp()).length;
  }

  function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks
      .filter((task) =>
        currentFilter === "active" ? !task.completed : task.completed,
      )
      .sort((a, b) => a.priority - b.priority);

    emptyState.style.display = filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = `task ${task.completed ? "completed" : ""}`;

      taskDiv.innerHTML = `
        <div class="task-overlay"></div>

        <div>
          <div class="task-title">
            ${task.priority} ${task.title}
          </div>
          <div class="task-meta">
            ${task.minutes} minutes
          </div>
        </div>

        ${!task.completed ? `<button class="start-btn">Start</button>` : ""}
      `;

      const overlay = taskDiv.querySelector(".task-overlay");
      const startBtn = taskDiv.querySelector(".start-btn");

      if (task.startedAt && !task.completed) {
        startBtn.classList.add("running");
        startBtn.textContent = "Running";
        startTimer(task, overlay);
      }

      startBtn?.addEventListener("click", () => {
        if (runningTaskId) {
          alert("Only one task at a time.");
          return;
        }

        task.startedAt = Date.now();
        runningTaskId = task.id;

        startBtn.classList.add("running");
        startBtn.textContent = "Running";

        saveTasks();
        startTimer(task, overlay);
      });

      taskList.appendChild(taskDiv);
    });

    saveTasks();
  }

  function startTimer(task, overlay) {
    const totalTime = task.minutes * 60000;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - task.startedAt;
      const progress = Math.min(elapsedTime / totalTime, 1);

      overlay.style.width = progress * 100 + "%";

      if (progress >= 1) {
        clearInterval(interval);
        task.completed = true;
        runningTaskId = null;
        saveTasks();
        renderTasks();
      }
    }, 1000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (activeCount() >= 3) {
      alert("Complete 3 tasks first.");
      return;
    }

    if (dailyCount() >= 5) {
      alert("Daily limit reached.");
      return;
    }

    const title = document.querySelector("#task-input").value.trim();
    const minutes = parseInt(document.querySelector("#task-time").value);
    const priority = parseInt(document.querySelector("#task-priority").value);

    tasks.push({
      id: Date.now(),
      title: title,
      minutes: minutes,
      priority: priority,
      createdAt: Date.now(),
      startedAt: null,
      completed: false,
      dailyStamp: todayStamp(),
    });

    form.reset();
    saveTasks();
    renderTasks();
  });

  filters.forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".filter.active").classList.remove("active");

      this.classList.add("active");
      currentFilter = this.dataset.filter;

      renderTasks();
    });
  });

  renderTasks();
}

function dailyPlanner() {
  const dayPlanner = document.querySelector(".planner-wrapper");
  const dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  if (!dayPlanner) return;

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );
  let wholeDayPlan = "";

  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";
    wholeDayPlan += `<div class="plan">
    <p id="time">${elem}</p>
    <input id="${idx}" class="title" type="text" placeholder="...." value="${savedData}">
    </div>`;
  });
  dayPlanner.innerHTML = wholeDayPlan;

  const dayPlannerInput = document.querySelectorAll("input.title");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

function motivationalQuotes() {
  const quote = document.querySelector(".quote-text");
  const author = document.querySelector(".quote-author");
  const date = document.querySelector(".quote-date");
  const container = document.querySelector(".quote-container");

  date.textContent = new Date().toDateString();

  async function randomQuoteGenerator() {
    try {
      const URL = "https://productivity-dashboard-vnug.onrender.com/api/quote";
      const response = await fetch(URL);
      const data = await response.json();

      const quoteData = data[0];

      localStorage.setItem("dailyQuote", JSON.stringify(quoteData));

      renderQuote(quoteData);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }

  function renderQuote(data) {
    quote.classList.remove("show");

    quote.innerHTML = `<h3>${data.quote}</h3>`;
    author.innerHTML = `<p>${data.author}</p>`;

    setTimeout(() => {
      quote.classList.add("show");
    }, 100);
  }

  const saved = localStorage.getItem("dailyQuote");
  if (saved) {
    renderQuote(JSON.parse(saved));
  } else {
    randomQuoteGenerator();
  }

  container.addEventListener("click", randomQuoteGenerator);
}
function pomodoroTimer() {
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

    // dynamic overlay color
    const overlayColor = isWorkSession
      ? "rgba(0, 255, 0, 0.25)" // work = green
      : "rgba(0, 120, 255, 0.25)"; // break = blue

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
    }, 1000);
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
function visionBoard() {
  const cards = document.querySelectorAll(".grid-card");

  let visionData = JSON.parse(localStorage.getItem("visionData")) || [];

  cards.forEach((card, index) => {
    const img = card.querySelector("img");
    const input = card.querySelector(".img-input");
    const button = card.querySelector(".change-img-btn");
    const title = card.querySelector("h3");

    // Load saved data
    if (visionData[index]) {
      img.src = visionData[index].img;
      title.innerText = visionData[index].text;
    }

    // Change image
    button.addEventListener("click", () => {
      input.click();
    });

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (!file) return;
      const reader = new FileReader();

      reader.onload = function () {
        img.src = reader.result;

        visionData[index] = {
          img: reader.result,
          text: title.innerText,
        };

        localStorage.setItem("visionData", JSON.stringify(visionData));
      };

      reader.readAsDataURL(file);
    });

    title.addEventListener("input", () => {
      visionData[index] = {
        img: img.src,
        text: title.innerText,
      };

      localStorage.setItem("visionData", JSON.stringify(visionData));
    });
  });
}

function habitTracker() {
  const tracker = document.querySelector(".tracker");
  const addHabitBtn = document.getElementById("add-habit-btn");
  const modal = document.getElementById("habit-modal");
  const closeModal = document.getElementById("close-modal");
  const habitForm = document.getElementById("habit-form");
  const habitInput = document.getElementById("habit-title");

  let habits = [
    { name: "Workout", days: [] },
    { name: "Reading", days: [] },
    { name: "Meditation", days: [] },
  ];

  function renderHabits() {
    tracker.innerHTML = "";

    habits.forEach((habit, index) => {
      const card = document.createElement("div");
      card.className = "tracker-grid";

      // Title + progress %
      const title = document.createElement("h2");
      title.textContent = habit.name;

      const completedDays = habit.days.length;
      const totalDays = 21;
      const progressPercent = Math.round((completedDays / totalDays) * 100);

      const progressContainer = document.createElement("div");
      progressContainer.className = "progress-container";

      const progressBar = document.createElement("div");
      progressBar.className = "progress";
      progressBar.style.width = `${progressPercent}%`;

      progressContainer.appendChild(progressBar);
      card.appendChild(title);
      card.appendChild(progressContainer);

      // Habit days grid
      const habitGrid = document.createElement("div");
      habitGrid.className = "habit-grid";

      for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "habit-day";
        dayDiv.textContent = day;

        if (habit.days.includes(day)) {
          dayDiv.classList.add("completed");
        }

        dayDiv.addEventListener("click", () => {
          if (habit.days.includes(day)) {
            habit.days = habit.days.filter((d) => d !== day);
          } else {
            habit.days.push(day);
          }
          renderHabits();
        });

        habitGrid.appendChild(dayDiv);
      }

      card.appendChild(habitGrid);
      tracker.appendChild(card);
    });
  }

  // Modal open/close
  addHabitBtn.addEventListener("click", () => modal.removeAttribute("hidden"));
  closeModal.addEventListener("click", () =>
    modal.setAttribute("hidden", true),
  );

  // Add habit
  habitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const habitName = habitInput.value.trim();
    if (habitName) {
      habits.push({ name: habitName, days: [] });
      habitInput.value = "";
      modal.setAttribute("hidden", true);
      renderHabits();
    }
  });

  renderHabits();
}

function changeTheme() {
  const themeBtn = document.querySelector(".theme-toggle");

  const themes = [
    {
      pri: "#FFF7CD",
      sec: "#FDC3A1",
      tri1: "#FB9B8F",
      tri2: "#b35b72",
    },
    {
      pri: "#F7F8F0",
      sec: "#9CD5FF",
      tri1: "#7AAACE",
      tri2: "#355872",
    },
    {
      pri: "#FFFDF1",
      sec: "#FFCE99",
      tri1: "#FF9644",
      tri2: "#562F00",
    },
    {
      pri: "#F7F7F7",
      sec: "#777c8b",
      tri1: "#393E46",
      tri2: "#222831",
    },
  ];

  let currentIndex = parseInt(localStorage.getItem("themeIndex")) || 0;

  themeBtn.addEventListener("click", function () {
    currentIndex = (1 + currentIndex) % themes.length;

    applyTheme(currentIndex);

    localStorage.setItem("themeIndex", currentIndex);
  });

  function applyTheme(index) {
    const rootElement = document.documentElement;

    rootElement.style.setProperty("--pri", themes[index].pri);
    rootElement.style.setProperty("--sec", themes[index].sec);
    rootElement.style.setProperty("--tri1", themes[index].tri1);
    rootElement.style.setProperty("--tri2", themes[index].tri2);
  }
}

openSideBar();
openCloseFeature();
taskEngine();
visionBoard();
habitTracker();
dailyPlanner();
pomodoroTimer();
motivationalQuotes();
changeTheme();
