import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import ConfirmModal from "../components/ConfirmModal";

export default function EditPost() {
  const { accessToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    postService.getOne(id).then(setPost);
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
  
    const fd = new FormData(e.currentTarget);

    setFormData({
      title: fd.get("title"),
      type: fd.get("type"),
      description: fd.get("description"),
      authorUsername: post.authorUsername,
    });

    setShowConfirm(true);
  }

  async function confirmUpdate() {
    await postService.updatePost(id, formData, accessToken);
    navigate(`/posts/${id}`);
  }

  return (
    <>
    <form className="mx-auto col-md-5 accent-box fade-in" onSubmit={onSubmit}>
      <h2 className="text-center mb-3">Edit Post</h2>

      <input className="form-control mb-2" name="title" defaultValue={post.title} />
      <input className="form-control mb-2" name="type" defaultValue={post.type} />
      <textarea className="form-control mb-3" name="description" defaultValue={post.description} rows="4" />

      <button className="neon-btn w-100">Save</button>
    </form>

     <ConfirmModal
        show={showConfirm}
        message="Are you sure you want to save changes to this post?"
        onConfirm={confirmUpdate}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
