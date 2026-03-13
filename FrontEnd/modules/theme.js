export function changeTheme() {
  const themeBtn = document.querySelector(".theme-toggle");

  const themes = [
    { pri: "#FFF7CD", sec: "#FDC3A1", tri1: "#FB9B8F", tri2: "#b35b72" },
    { pri: "#F7F8F0", sec: "#9CD5FF", tri1: "#7AAACE", tri2: "#355872" },
    { pri: "#FFFDF1", sec: "#FFCE99", tri1: "#FF9644", tri2: "#562F00" },
    { pri: "#F7F7F7", sec: "#777c8b", tri1: "#393E46", tri2: "#222831" },
    { pri: "#f7ebaf", sec: "#f8e4af", tri1: "#ee8d42", tri2: "#842a3b" },
  ];

  let currentIndex = parseInt(localStorage.getItem("themeIndex")) || 0;

  function applyTheme(index) {
    const rootElement = document.documentElement;

    rootElement.style.setProperty("--pri", themes[index].pri);
    rootElement.style.setProperty("--sec", themes[index].sec);
    rootElement.style.setProperty("--tri1", themes[index].tri1);
    rootElement.style.setProperty("--tri2", themes[index].tri2);
  }

  applyTheme(currentIndex);

  themeBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % themes.length;

    applyTheme(currentIndex);

    localStorage.setItem("themeIndex", currentIndex);
  });
}