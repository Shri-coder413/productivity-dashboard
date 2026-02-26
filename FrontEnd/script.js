function openCloseFeature() {
  const cards = document.querySelectorAll(".card");
  const fullPages = document.querySelectorAll(".full-page");
  const closeBtns = document.querySelectorAll(".page-nav .close-btn");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      fullPages[card.id].style.display = "block";
    });
  });

  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      fullPages[closeBtn.id].style.display = "none";
    });
  });
}
function todoList() {
  let allTasks = [];

  if (localStorage.getItem("allTasks")) {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
  } else {
    console.log("Task is empty");
  }

  function renderTasks() {
    let taskElem = "";

    const taskList = document.querySelector(".task-list");

    allTasks.forEach((elem, idx) => {
      taskElem += `<div class="task">
    <h2>${elem.title}<span id="${elem.imp}">Imp</span></h2>
    <button class="done-btn" id="${idx}">done</button>
    </div>`;
    });

    taskList.innerHTML = taskElem;

    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    document.querySelectorAll(".done-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        allTasks.splice(btn.id, 1);
        renderTasks();
      });
    });
  }

  renderTasks();

  const form = document.querySelector("#add-todo-box form");
  const taskInput = document.querySelector("#task-input");
  const taskDetail = document.querySelector("#task-detail");
  const checkMark = document.querySelector("#mark");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    allTasks.push({
      title: taskInput.value,
      description: taskDetail.value,
      imp: checkMark.checked,
    });

    renderTasks();

    taskInput.value = "";
    taskDetail.value = "";
    checkMark.checked = false;
  });
}
function dailyPlanner() {
  const dayPlanner = document.querySelector(".day-planner");
  const dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );
  let wholeDayPlan = "";

  hours.forEach(function (elem, idx) {
    let savedData = dayPlanData[idx] || "";
    wholeDayPlan += `<div class="daily-plan">
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
  const quote = document.querySelector(".middle-quote h2");
  const author = document.querySelector(".bottom-author p");

  async function randomQuoteGenerator() {
    try {
      const response = await fetch("http://localhost:3000/api/quote");
      const data = await response.json();

      quote.innerHTML = `<h2>${data[0].quote}</h2>`;
      author.innerHTML = `<p>- ${data[0].author}</p>`;
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }
  randomQuoteGenerator();
}
function pomodoroTimer() {
  const startBtn = document.querySelector(".timer-action-btns .start-timer");
  const pauseBtn = document.querySelector(".timer-action-btns .pause-timer");
  const resetBtn = document.querySelector(".timer-action-btns .reset-timer");

  const timer = document.querySelector(".timer-container h1");
  let isWorkSession = true;
  let totalSeconds = 25 * 60; //1500
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    console.log(minutes, seconds);

    timer.innerHTML = `${String(minutes).padStart("2", "0")} : ${String(seconds).padStart("2", "0")}`;
  }

  const session = document.querySelector(".session h4");

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerInterval);
          isWorkSession = false;
          totalSeconds = 5 * 60;
          timer.innerHTML = `05:00`;
          session.innerHTML = "Take A Break";
          session.style.backgroundColor = `const(--blue)`;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          clearInterval(timerInterval);
          isWorkSession = true;
          totalSeconds = 25 * 60;
          timer.innerHTML = `25:00`;
          session.innerHTML = "Deep Work";
          session.style.backgroundColor = " const(--green)";
        }
      }, 1000);
    }
  }
  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    timer.innerHTML = `25:00`;
    session.innerHTML = "Deep Work";
    session.style.backgroundColor = " const(--green)";
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
function changeTheme() {
  const theme = document.querySelector(".theme");
  const rootElement = document.documentElement;

  let flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#FFF7CD");
      rootElement.style.setProperty("--sec", "#FDC3A1");
      rootElement.style.setProperty("--tri1", "#FB9B8F");
      rootElement.style.setProperty("--tri2", "#b35b72");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#F7F8F0");
      rootElement.style.setProperty("--sec", "#9CD5FF");
      rootElement.style.setProperty("--tri1", "#7AAACE");
      rootElement.style.setProperty("--tri2", "#355872");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#FFFDF1");
      rootElement.style.setProperty("--sec", "#FFCE99");
      rootElement.style.setProperty("--tri1", "#FF9644");
      rootElement.style.setProperty("--tri2", "#562F00");
      flag = 3;
    } else if (flag == 3) {
      rootElement.style.setProperty("--pri", "#E8F5BD");
      rootElement.style.setProperty("--sec", "#C7EABB");
      rootElement.style.setProperty("--tri1", "#A2CB8B");
      rootElement.style.setProperty("--tri2", "#84B179");
      flag = 0;
    }
  });
}

changeTheme();
openCloseFeature();
todoList();
dailyPlanner();
motivationalQuotes();
pomodoroTimer();
