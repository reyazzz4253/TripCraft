import { useEffect, useState } from "react";

// Third-party API: Open-Meteo (free, no API key required).
const WEATHER_CODES = {
  0: ["Clear sky", "☀️"], 1: ["Mainly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"], 48: ["Rime fog", "🌫️"], 51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"], 61: ["Light rain", "🌦️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"],
  71: ["Light snow", "🌨️"], 73: ["Snow", "🌨️"], 75: ["Heavy snow", "❄️"], 80: ["Rain showers", "🌦️"],
  81: ["Rain showers", "🌧️"], 82: ["Violent showers", "⛈️"], 95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm & hail", "⛈️"], 99: ["Thunderstorm & hail", "⛈️"],
};

export const describeWeather = (code) => WEATHER_CODES[code] || ["Unknown", "🌡️"];

export default function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) return undefined;
    const controller = new AbortController();
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto";

    setLoading(true);
    setError(null);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Weather service returned ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Could not load weather");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // cancel request if destination changes / page unmounts
  }, [lat, lon]);

  return { data, loading, error };
}
