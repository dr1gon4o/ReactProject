import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent! Thank you for reaching out.");
  }

  return (
    <div className="fade-in">
      <h1 className="text-neon text-center mb-4">Contact Us</h1>

      <div className="card p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <p className="mb-3">
          Have questions, feedback, or collaboration ideas? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-neon">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-neon">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-neon">Message</label>
            <textarea
              className="form-control"
              rows="4"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="neon-btn w-100" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
