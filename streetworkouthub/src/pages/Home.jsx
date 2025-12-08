// import WeatherWidget2 from "../components/WeatherWidget2";
import { GiStrong } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaDumbbell, FaRobot } from "react-icons/fa";


export default function Home() {
  return (
    <div className="text-center mt-4">
      <h1 className="text-danger fw-bold mb-4 rgb">
        Unlock Your Potential  
        <br />
       <Link to="/profile" >
          <GiStrong className="gistrong-icon neon-btn" />
        </Link>

      </h1>

      <p className="text-white">
        <FaDumbbell size={35}/>
        ...Train anywhere. Push your limits...
        <FaDumbbell size={35}/>
      </p>
        
      <p>
        <FaRobot size={35} />
      ...Log in to get personalized guidance from our AI Coach...
        <FaRobot size={35} />
      </p>

      {/* <div className="d-flex justify-content-center mt-4">
        <WeatherWidget2 />
      </div> */}
    </div>
  );
}
