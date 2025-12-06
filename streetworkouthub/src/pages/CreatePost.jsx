import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";

export default function CreatePost() {
  const { accessToken, username } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const data = {
      title: fd.get("title"),
      type: fd.get("type"),
      description: fd.get("description"),
      authorUsername: username,

    };

    await postService.createPost(data, accessToken);
    navigate("/catalog");
  }

  return (
    <form className="card bg-dark mx-auto col-md-5 accent-box fade-in" onSubmit={onSubmit}>
      <h2 className="text-center mb-3">Create Post</h2>

      <input className="form-control mb-2" name="title" placeholder="Title" />
      <input className="form-control mb-2" name="type" placeholder="Workout type" />
      <textarea className="form-control mb-3" name="description" placeholder="Description" rows="4" />

      <button className="neon-btn w-100">Create</button>
    </form>
  );
}
