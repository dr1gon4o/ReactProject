import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !password) {
      setError("Fields cannot be empty");
      return;
    }

    // if (password.length < 6) {
    //   setError("Password must be at least 6 characters long");
    //   return;
    // }

    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   setError("Please enter a valid email address");
    //   return;
    // }


    // setError("");


    try {
      await register(email, username, password);
      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="mx-auto col-md-4 accent-box" onSubmit={handleSubmit}>
      <h2 className="text-center mb-3">Register</h2>

      {error && <p className="text-danger">{error}</p>}

      <input className="form-control mb-2" name="email" type="email" placeholder="Email" />
      <input className="form-control mb-2" name="username" type="username" placeholder="Username" />
      <input className="form-control mb-2" name="password" type="password" placeholder="Password" />
      <input className="form-control mb-3" name="confirmPassword" type="password" placeholder="Confirm Password" />

      <button className="neon-btn w-100">Register</button>
    </form>
  );
}
