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
    const password = formData.get("password");

    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="mx-auto col-md-4 accent-box" onSubmit={handleSubmit}>
      <h2 className="text-center mb-3">Register</h2>

      {error && <p className="text-danger">{error}</p>}

      <input className="form-control mb-2" name="email" type="email" placeholder="Email" />
      <input className="form-control mb-3" name="password" type="password" placeholder="Password" />

      <button className="neon-btn w-100">Register</button>
    </form>
  );
}
