export function openSideBar() {
  const menuBtn = document.querySelector("#menu-btn");
  const sidebar = document.querySelector("#sidebar");

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

export function openCloseFeature() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const allViews = document.querySelectorAll(".app-view");
  const viewButtons = document.querySelectorAll(".view-btn");

  function renderView(viewName) {
    const targetedView = document.getElementById(`${viewName}-view`);
    if (!targetedView) return;

    allViews.forEach((view) => view.classList.remove("active"));
    targetedView.classList.add("active");

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