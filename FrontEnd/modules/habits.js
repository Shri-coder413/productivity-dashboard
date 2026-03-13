export function habitTracker() {
  const tracker = document.querySelector(".tracker");
  const addHabitBtn = document.getElementById("add-habit-btn");
  const modal = document.getElementById("habit-modal");
  const closeModal = document.getElementById("close-modal");
  const habitForm = document.getElementById("habit-form");
  const habitInput = document.getElementById("habit-title");

  let habits = JSON.parse(localStorage.getItem("habits")) || [
    { name: "Workout", days: [] },
    { name: "Reading", days: [] },
    { name: "Meditation", days: [] },
  ];

  function renderHabits() {
    tracker.innerHTML = "";
    localStorage.setItem("habits", JSON.stringify(habits));

    habits.forEach((habit) => {
      const card = document.createElement("div");
      card.className = "tracker-grid";

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

  addHabitBtn.addEventListener("click", () => modal.removeAttribute("hidden"));
  closeModal.addEventListener("click", () =>
    modal.setAttribute("hidden", true),
  );

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