import WeatherWidget from "../components/WeatherWidget";

export default function Weather() {
  return (
    <div className="mx-auto col-md-5 text-center fade-in">
      <h2 className="text-center text-neon mb-4">My Sporty Weather</h2>

      <div className="d-flex justify-content-center">
        <WeatherWidget />
      </div>
    </div>
  );
}