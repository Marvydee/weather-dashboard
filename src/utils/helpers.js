import { CloudLightning, CloudRain, CloudSnow, Sun, Cloud } from "lucide-react";

function WeatherIcon({ code, size = 72 }) {
  if (code >= 200 && code < 300)
    return <CloudLightning size={size} color="#818cf8" />;
  if (code >= 300 && code < 600)
    return <CloudRain size={size} color="#38bdf8" />;
  if (code >= 600 && code < 700)
    return <CloudSnow size={size} color="#bae6fd" />;
  if (code === 800) return <Sun size={size} color="#fbbf24" />;
  if (code > 800) return <Cloud size={size} color="#94a3b8" />;
  return <Cloud size={size} color="#94a3b8" />;
}

// Converts a Unix timestamp + timezone offset into a short day name like "Mon"
function getDay(unixTime, timezoneOffset) {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
}

export { WeatherIcon, getDay };
