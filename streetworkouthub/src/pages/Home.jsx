import WeatherWidget from "../components/WeatherWidget";

export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-danger fw-bold mb-4">Unlock Your Potential</h1>
      <p className="text-white">Train anywhere. Push your limits.</p>

      <div className="d-flex justify-content-center mt-4">
        <WeatherWidget />
      </div>
    </div>
  );
}
