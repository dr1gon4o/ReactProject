import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { _id, accessToken } = useAuth();
  const [post, setPost] = useState({});

  useEffect(() => {
    postService.getOne(id).then(setPost);
  }, [id]);

  const isOwner = post._ownerId === _id;

  async function onDelete() {
    await postService.deletePost(id, accessToken);
    navigate("/catalog");
  }

  return (
    <div className="card mx-auto col-md-6 fade-in">
      <h2>{post.title}</h2>
      <p>{post.type}</p>
      <p>{post.description}</p>
       <p className="text-danger">Posted by {post.authorUsername}</p>


      {isOwner && (
        <div className="d-flex gap-3 justify-content-center">
          <Link className="neon-btn" to={`/edit/${id}`}>Edit</Link>
          <button className="neon-btn" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
