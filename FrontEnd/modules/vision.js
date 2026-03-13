export function visionBoard() {
  const cards = document.querySelectorAll(".grid-card");

  let visionData = JSON.parse(localStorage.getItem("visionData")) || [];

  cards.forEach((card, index) => {
    const img = card.querySelector("img");
    const input = card.querySelector(".img-input");
    const button = card.querySelector(".change-img-btn");
    const title = card.querySelector("h3");

    if (visionData[index]) {
      img.src = visionData[index].img;
      title.innerText = visionData[index].text;
    }

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