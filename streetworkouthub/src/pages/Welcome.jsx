import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function Welcome() {
    const { username, email } = useAuth();
  return (
    <div className="text-center mt-5">
      <h3 className="text-white fw-bold">Welcome to StreetWorkoutHub</h3>
      <h4 className="text-success fw-bold">Registration Success</h4>
      
      <Link to="/profile" className="neon-btn w-10">
        Check your Profile {username}
      </Link>

      
    </div>
  );
}
