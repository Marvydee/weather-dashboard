import { useState } from "react";
import {
  Search,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  MapPin,
  RefreshCw,
  CloudRain,
  Sun,
  Gauge,
} from "lucide-react";
import styles from "../style";
import { MOCK_DATA, MOCK_FORECAST } from "../utils/data";
import { WeatherIcon, getDay } from "../utils/helpers";
import { API_KEY, USE_MOCK } from "../config/api";

export default function WeatherDashboard() {
  // useState stores the city the user typed
  const [city, setCity] = useState("");
  // weather holds the current conditions returned from the API
  const [weather, setWeather] = useState(null);
  // forecast holds the 5-day forecast data
  const [forecast, setForecast] = useState(null);
  // loading tracks whether a fetch is in progress — used to show spinner
  const [loading, setLoading] = useState(false);
  // error holds any error message to show the user
  const [error, setError] = useState("");

  // fetchWeather is called when the user clicks Search or presses Enter
  async function fetchWeather() {
    if (!city.trim()) return; // do nothing if input is empty
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    // If no real API key yet, load mock data after a fake delay
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 900));
      setWeather(MOCK_DATA);
      setForecast(MOCK_FORECAST);
      setLoading(false);
      return;
    }

    try {
      // Two fetches happen in parallel using Promise.all — faster than waiting for each one
      // console.log("Fetching weather for", city);
      // console.log("API_KEY:", API_KEY);
      const [wRes, fRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5`,
        ),
      ]);

      // If the response isn't OK (e.g. city not found = 404), throw a readable error
      if (!wRes.ok)
        throw new Error("City not found. Check spelling and try again.");

      // Parse both JSON responses
      const wData = await wRes.json();
      const fData = await fRes.json();
      console.log("Current:", wData);
      console.log("Forecast:", fData);

      setWeather(wData);
      setForecast(fData);
    } catch (err) {
      // err.message comes from our throw above OR from a network failure
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      // finally always runs — hides the spinner whether fetch succeeded or failed
      setLoading(false);
    }
  }

  // Allow pressing Enter to trigger search — cleaner UX
  function handleKey(e) {
    if (e.key === "Enter") fetchWeather();
  }

  // ── RENDER ──────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>

      <div className="app">
        {/* Header */}
        <div className="header">
          <h1>
            Weather <span>Dashboard</span>
          </h1>
          <p>real-time conditions for any city</p>
        </div>

        {/* API Key notice — only shows when using mock data */}
        {USE_MOCK && (
          <div className="setup-notice">
            <strong>Demo Mode — No API Key</strong>
            Get a free key at <code>openweathermap.org</code>, then replace{" "}
            <code>YOUR_API_KEY_HERE</code> in the code. Currently showing mock
            data for Lagos, NG.
          </div>
        )}

        {/* Search bar */}
        <div className="search-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search city — e.g. Lagos, London, Tokyo..."
              value={city}
              onChange={(e) => setCity(e.target.value)} // update state on every keystroke
              onKeyDown={handleKey}
            />
            <button onClick={fetchWeather} disabled={loading}>
              {/* Spin the icon while loading */}
              {loading ? (
                <RefreshCw
                  size={16}
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
              ) : (
                <Search size={16} />
              )}
              {loading ? "Loading" : "Search"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="error-box">
            <CloudRain size={16} /> {error}
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="loading">
            <div className="spinner" />
            Fetching weather data...
          </div>
        )}

        {/* Main weather card — only shows after a successful fetch */}
        {weather && !loading && (
          <div className="main-card">
            {/* Top: temperature + icon */}
            <div className="card-top">
              <div>
                <div className="city-name">
                  <MapPin size={13} />
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="temp-main">
                  {Math.round(weather.main.temp)}
                  <sup>°C</sup>
                </div>
                <div className="condition-label">
                  {weather.weather[0].description}
                </div>
                <div className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </div>
              </div>

              <div className="weather-icon-box">
                {/* Icon picks itself based on the condition code */}
                <WeatherIcon code={weather.weather[0].id} />
                <div className="hi-lo">
                  H: <span>{Math.round(weather.main.temp_max)}°</span> L:{" "}
                  <span>{Math.round(weather.main.temp_min)}°</span>
                </div>
              </div>
            </div>

            {/* Stat grid — humidity, wind, visibility, pressure */}
            <div className="stats-grid">
              {[
                {
                  icon: <Droplets size={14} />,
                  label: "Humidity",
                  value: weather.main.humidity,
                  unit: "%",
                },
                {
                  icon: <Wind size={14} />,
                  label: "Wind Speed",
                  value: weather.wind.speed,
                  unit: "m/s",
                },
                {
                  icon: <Eye size={14} />,
                  label: "Visibility",
                  // API gives visibility in metres — divide by 1000 for km
                  value: (weather.visibility / 1000).toFixed(1),
                  unit: "km",
                },
                {
                  icon: <Gauge size={14} />,
                  label: "Pressure",
                  value: weather.main.pressure,
                  unit: "hPa",
                },
                {
                  icon: <Thermometer size={14} />,
                  label: "Feels Like",
                  value: Math.round(weather.main.feels_like),
                  unit: "°C",
                },
                {
                  icon: <Sun size={14} />,
                  label: "Condition",
                  value: weather.weather[0].id,
                  unit: "code",
                },
              ].map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <div className="stat-label">
                    {stat.icon} {stat.label}
                  </div>
                  <div className="stat-value">
                    {stat.value}
                    <span className="stat-unit"> {stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 5-day forecast strip */}
            {forecast && (
              <div className="forecast-section">
                <div className="forecast-title">5-Day Outlook</div>
                <div className="forecast-strip">
                  {forecast.list.map((day, i) => (
                    <div className="forecast-item" key={i}>
                      <div className="forecast-day">
                        {getDay(day.dt, forecast.city.timezone)}
                      </div>
                      {/* Small icon per forecast day */}
                      <WeatherIcon code={day.weather[0].id} size={22} />
                      <div className="forecast-temp">
                        {Math.round(day.main.temp)}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state — shown before any search */}
        {!weather && !loading && !error && (
          <div className="empty-state">
            <CloudRain size={52} />
            <h3>No city selected</h3>
            <p>
              Type any city name above and hit Search
              <br />
              to see live weather conditions.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
