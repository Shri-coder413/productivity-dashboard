require("dotenv").config();

const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/quote", async (req, res) => {
  try {
    if (!process.env.API_KEY) {
      return res.status(500).json({
        error: "API_KEY not found in environment variables",
      });
    }

    const response = await fetch(
      "https://api.api-ninjas.com/v2/quoteoftheday",
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Status Code:", response.status);

    const text = await response.text();
    console.log("Raw API Response:", text);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "API request failed",
        details: text,
      });
    }

    const data = JSON.parse(text);
    res.json(data);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});