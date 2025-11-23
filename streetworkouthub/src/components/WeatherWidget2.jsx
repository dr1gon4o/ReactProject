import { useEffect, useState } from "react";

export default function WeatherWidget2() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=42.6977&longitude=23.3219&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  if (!weather) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 9999,
      background: "#1a1d23",
      padding: "8px 14px",
      borderRadius: "10px",
      border: "2px solid var(--neon)",
      color: "var(--neon)",
      fontWeight: "bold",
      boxShadow: "0 0 12px var(--neon)"
    }}>
      Sofia: {weather.temperature}°C
    </div>
  );
}
