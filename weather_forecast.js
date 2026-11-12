require("dotenv").config();
const axios = require("axios");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = "Jakarta";
const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

async function getWeatherForecast() {
  try {
    const response = await axios.get(URL);
    const list = response.data.list;

    // Filter: ambil 1 data per hari (yang jam 12:00:00)
    const dailyForecasts = [];
    const seenDates = new Set();

    for (const item of list) {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
      const hour = date.getUTCHours();

      // Ambil data jam 12:00 UTC, skip jika hari sudah ada
      if (hour === 12 && !seenDates.has(dateStr)) {
        seenDates.add(dateStr);
        dailyForecasts.push({
          date: date,
          temp: item.main.temp,
        });
      }

      if (dailyForecasts.length === 5) break;
    }

    // Jika jam 12:00 tidak cukup 5 hari, fallback: ambil data pertama per hari
    if (dailyForecasts.length < 5) {
      seenDates.clear();
      dailyForecasts.length = 0;

      for (const item of list) {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toISOString().split("T")[0];

        if (!seenDates.has(dateStr)) {
          seenDates.add(dateStr);
          dailyForecasts.push({
            date: date,
            temp: item.main.temp,
          });
        }

        if (dailyForecasts.length === 5) break;
      }
    }

    // Format output
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    console.log("Weather Forecast:");
    for (const forecast of dailyForecasts) {
      const d = forecast.date;
      const dayName = days[d.getUTCDay()];
      const day = String(d.getUTCDate()).padStart(2, "0");
      const month = months[d.getUTCMonth()];
      const year = d.getUTCFullYear();
      const temp = forecast.temp.toFixed(2);

      console.log(`${dayName}, ${day} ${month} ${year}: ${temp}°C`);
    }
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data.message);
    } else {
      console.error("Error:", error.message);
    }
  }
}

getWeatherForecast();

