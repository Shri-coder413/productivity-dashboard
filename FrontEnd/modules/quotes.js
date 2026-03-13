export function motivationalQuotes() {
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