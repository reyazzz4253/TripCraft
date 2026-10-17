import React from "react";
import PropTypes from "prop-types";
import useWeather, { describeWeather } from "../hooks/useWeather";
import { card, colors, h2, subtle } from "../styles";

export default function WeatherWidget({ lat, lon, place }) {
  const { data, loading, error } = useWeather(lat, lon);

  return (
    <section style={card}>
      <h2 style={h2}>🌦️ Live weather – {place}</h2>
      {loading && <p style={subtle}>Loading forecast…</p>}
      {error && <p style={{ ...subtle, color: colors.danger }}>Weather unavailable: {error}</p>}

      {!loading && !error && data && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
            <span style={{ fontSize: 44 }}>{describeWeather(data.current.weather_code)[1]}</span>
            <div>
              <div style={{ fontSize: 30, fontWeight: 700 }}>{Math.round(data.current.temperature_2m)}°C</div>
              <div style={subtle}>
                {describeWeather(data.current.weather_code)[0]} · Humidity {data.current.relative_humidity_2m}% · Wind{" "}
                {data.current.wind_speed_10m} km/h
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: 8 }}>
            {data.daily.time.map((day, i) => (
              <div key={day} style={{ textAlign: "center", padding: 8, borderRadius: 10, background: colors.bg, fontSize: 13 }}>
                <div style={{ fontWeight: 600 }}>
                  {new Date(day).toLocaleDateString("en-IN", { weekday: "short" })}
                </div>
                <div style={{ fontSize: 22 }}>{describeWeather(data.daily.weather_code[i])[1]}</div>
                <div>
                  {Math.round(data.daily.temperature_2m_max[i])}° / {Math.round(data.daily.temperature_2m_min[i])}°
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...subtle, fontSize: 12, marginTop: 10 }}>Source: Open-Meteo API</p>
        </>
      )}
    </section>
  );
}

WeatherWidget.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
};
