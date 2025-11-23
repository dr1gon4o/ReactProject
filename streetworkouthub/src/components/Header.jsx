import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaDumbbell, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlusCircle } from "react-icons/fa";

export default function Header() {
  const { isAuthenticated, logout, userEmail } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaDumbbell className="me-2 text-success" />
          StreetWorkoutHub
        </Link>

        <ul className="navbar-nav ms-auto gap-3">
          <li className="nav-item"><Link className="nav-link" to="/catalog">Catalog</Link></li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/create">
                <FaPlusCircle className="me-1 text-success" /> Create Post
                </Link>
              </li>      
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                <FaUserPlus className="me-1 text-success" />Profile{userEmail}
                </Link>
              </li>
              


              <li className="nav-item">
                <button className="btn btn-link nav-link d-flex align-items-center" onClick={logout}>
                  <FaSignOutAlt className="me-1 text-danger" /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/login">
                  <FaSignInAlt className="me-1 text-success" /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center" to="/register">
                  <FaUserPlus className="me-1 text-success" /> Register
                </Link>
              </li>           
             </>
          )}
        </ul>
      </div>
    </nav>
  );
}
