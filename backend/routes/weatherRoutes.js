const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    console.log("API KEY BEING USED:", apiKey);
    console.log("City requested:", city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log("Requesting from:", url); // ADD THIS


    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    const formatted = {
      name: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
    };

    res.json(formatted);
  } catch (err) {
    if (err.response) {
      // Log the error response from OpenWeather
      console.error("OpenWeather error response:", err.response.data);
      res.status(err.response.status).json({ error: err.response.data.message });
    } else {
      console.error("Unknown error:", err.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

module.exports = router;
