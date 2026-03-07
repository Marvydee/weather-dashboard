# Weather Dashboard

Search any city and get live weather conditions plus a 5-day forecast.
Uses the OpenWeatherMap API.

## Features

- Current temperature, humidity, wind speed, visibility, pressure
- 5-day forecast strip
- Handles wrong city names and rate limit errors separately
- Falls back to mock data if no API key is present

## Tech

React · OpenWeatherMap API · CSS

## Run locally

```bash
npm install
npm start
```

Create a `.env` file in the root:

```
REACT_APP_WEATHER_KEY=your_api_key_here
```

Get a free key at [openweathermap.org](https://openweathermap.org/api)

## Live
