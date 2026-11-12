# 🧩 JS Mini Projects

Two small programs built with JavaScript.

---

## 1. Small Program (`small_program.js`)

A simple program that processes numbers from 1 to 100 with specific rules.

**Rules:**
- Prime numbers → skipped
- Divisible by both 3 & 5 → `FooBar`
- Divisible by 3 → `Foo`
- Divisible by 5 → `Bar`
- Otherwise → print the number

Output is printed in reverse order (100 → 1) horizontally.

**Usage:**
```bash
node small_program.js
```

---

## 2. Weather Forecast (`weather_forecast.js`)

Displays the weather forecast for Jakarta for the next 5 days using the [OpenWeatherMap API](https://openweathermap.org).

**Example output:**
```
Weather Forecast:
Wed, 12 Nov 2026: 28.45°C
Thu, 13 Nov 2026: 29.12°C
Fri, 14 Nov 2026: 27.83°C
Sat, 15 Nov 2026: 30.01°C
Sun, 16 Nov 2026: 28.67°C
```

**Setup:**

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root folder:
```
OPENWEATHER_API_KEY=your_api_key_here
```

3. Run:
```bash
node weather_forecast.js
```

> You can get a free API key at [openweathermap.org](https://openweathermap.org).

---

## Tech Stack

- **Runtime:** Node.js
- **Libraries:** `axios`, `dotenv`
