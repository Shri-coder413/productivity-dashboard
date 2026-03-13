export function dailyPlanner() {
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