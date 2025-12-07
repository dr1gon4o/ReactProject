import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=42.6977&longitude=23.3219&current_weather=true")
      .then(res => res.json())
      .then(data => setWeather(data.current_weather));
  }, []);

  if (!weather) return <p className="text-white">Loading weather...</p>;


  const emojicodes= (code) => {
    const map = {
      0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
      45: "🌫️", 48: "🌫️",
      51: "🌦️", 53: "🌧️", 55: "🌧️",
      61: "🌧️", 63: "🌧️", 65: "🌧️",
      71: "❄️", 73: "❄️", 75: "❄️",
      95: "⛈️", 96: "⛈️", 99: "⛈️"
    };
    return map[code] || "🌍";
  };
  const emoji = emojicodes(weather.weathercode);
  
  return (
    <div className="rgb text-center fs-5">
      
      <small className="text-secondary m-1">
        Feels sporty today 💪
        <br />
        let's check the weather
      </small>
      <h4 className="text-danger m-2">Sofia Weather</h4>

      <p className="m-2">Temperature {weather.temperature}°C</p>
      <span className="text-5xl fs-2">{emoji}</span>
      <p className="m-2">Wind {weather.windspeed} km/h</p>
 
      <small className="text-secondary">
        {weather.temperature > 30
          ? "Too hot for sports today 🌡️"
          : weather.temperature < 10
          ? "Too cold for sports today ❄️"
          : "Good weather for sports today ☀️"}
      </small>

      <p className="text-secondary m-2">
          Powered by Open-Meteo • Updated just now
      </p>

    </div>
  );
}
