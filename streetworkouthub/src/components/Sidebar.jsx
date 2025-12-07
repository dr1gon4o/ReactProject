import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import '../styles/sidebar.css';
import { FaCloudSun, FaRobot, FaRegEnvelope, FaInfoCircle, FaSearch, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

export default function Sidebar() {
    const { isAuthenticated } = useAuth();
  return (
    <div className="sidebar">
      <Link to="/Search" className="sidebar-item">
        <FaSearch className="icon" /> <span>Search</span>
      </Link>
      {isAuthenticated && (
        <Link to="/Aichat" className="sidebar-item">
          <FaRobot className="icon" /> <span>AI</span>
        </Link>
        )     
      }
      

      <Link to="/Weather" className="sidebar-item">
        <FaCloudSun className="icon" /> <span>Weather</span>
      </Link>
      <Link to="/Calendar" className="sidebar-item">
        <FaRegCalendarAlt className="icon" /> <span>Calendar</span>
      </Link>
      <Link to="/Maps" className="sidebar-item">
        <FaMapMarkerAlt className="icon" /> <span>Maps</span>
      </Link>
      <Link to="/About" className="sidebar-item">
        <FaInfoCircle className="icon" /> <span>About</span>
      </Link>
      <Link to="/Contact" className="sidebar-item">
        <FaRegEnvelope className="icon" /> <span>Contact</span>
      </Link>
      
    </div>
  );
}