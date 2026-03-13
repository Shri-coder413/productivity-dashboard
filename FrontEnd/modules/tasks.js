export function taskEngine() {
  const form = document.querySelector("#task-form");
  const taskList = document.querySelector(".task-list");
  const filters = document.querySelectorAll(".filter");
  const emptyState = document.querySelector(".empty-state");

  if (!form) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "active";
  let runningTaskId = null;

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function getActiveTaskCount() {
    return tasks.filter((task) => !task.completed).length;
  }

  function getDailyTaskCount() {
    const today = getTodayDate();
    return tasks.filter((task) => task.dailyStamp === today).length;
  }

  function addTask(title, minutes, priority) {
    const newTask = {
      id: Date.now(),
      title: title,
      minutes: minutes,
      priority: priority,
      startedAt: null,
      completed: false,
      dailyStamp: getTodayDate(),
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
  }

  function startTaskTimer(task, overlay) {
    const totalTime = task.minutes * 60000;

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - task.startedAt;
      const progress = elapsedTime / totalTime;

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

  function renderTasks() {
    taskList.innerHTML = "";

    const visibleTasks = tasks
      .filter((task) =>
        currentFilter === "active" ? !task.completed : task.completed,
      )
      .sort((a, b) => a.priority - b.priority);

    if (visibleTasks.length === 0) {
      emptyState.style.display = "block";
    } else {
      emptyState.style.display = "none";
    }

    visibleTasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";

      if (task.completed) {
        taskDiv.classList.add("completed");
      }

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
        startBtn.textContent = "Running";
        startBtn.classList.add("running");
        startTaskTimer(task, overlay);
      }

      if (startBtn) {
        startBtn.addEventListener("click", () => {
          if (runningTaskId) {
            alert("Finish the current task first.");
            return;
          }

          task.startedAt = Date.now();
          runningTaskId = task.id;

          startBtn.textContent = "Running";
          startBtn.classList.add("running");

          saveTasks();
          startTaskTimer(task, overlay);
        });
      }

      taskList.appendChild(taskDiv);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (getActiveTaskCount() >= 3) {
      alert("You can only have 3 active tasks.");
      return;
    }

    if (getDailyTaskCount() >= 5) {
      alert("Daily task limit reached.");
      return;
    }

    const title = document.querySelector("#task-input").value.trim();
    const minutes = parseInt(document.querySelector("#task-time").value);
    const priority = parseInt(document.querySelector("#task-priority").value);

    addTask(title, minutes, priority);

    form.reset();
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const activeButton = document.querySelector(".filter.active");

      if (activeButton) {
        activeButton.classList.remove("active");
      }

      button.classList.add("active");

      currentFilter = button.dataset.filter;

      renderTasks();
    });
  });

  renderTasks();
}