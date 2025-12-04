import WeatherWidget from "../components/WeatherWidget";
import { GiStrong } from "react-icons/gi";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="text-center mt-5">
      <h1 className="text-danger fw-bold mb-4 rgb">
        Unlock Your Potential  
        <br />
       <Link to="/profile" >
          <GiStrong className="gistrong-icon neon-btn" />
        </Link>

      </h1>
      <p className="text-white">Train anywhere. Push your limits.</p>

      <div className="d-flex justify-content-center mt-4">
        <WeatherWidget />
      </div>
    </div>
  );
}
