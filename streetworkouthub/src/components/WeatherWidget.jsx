import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=42.6977&longitude=23.3219&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  if (!weather) return <p className="text-white">Loading weather...</p>;

  return (
    <div className="p-3 border border-danger rounded" style={{ width: "220px" }}>
      <h6 className="text-danger">Sofia Weather</h6>
      <p className="m-0">{weather.temperature}°C</p>
      <small className="text-secondary">Feels sporty today 💪</small>
    </div>
  );
}
