import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import * as postService from "../services/postService";
import * as ratingService from "../services/ratingService";
import StarRating from "../components/StarRating";
import { FaUser } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";


export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { _id: userId, accessToken, isAuthenticated } = useAuth();

  const [post, setPost] = useState({});
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showDelete, setShowDelete] = useState(false);


  useEffect(() => {
    postService.getOne(id).then(setPost);
    loadRatings();
  }, [id]);

  async function loadRatings() {
    const all = await ratingService.getRatings(id);
    setRatings(all);

    if (userId) {
      const mine = await ratingService.getUserRating(id, userId);
      setUserRating(mine?.rating || 0);
    }
  }

  const isOwner = post._ownerId === userId;

  function requestDelete() {
    setShowDelete(true);
  }
  async function onDelete() {
    await postService.deletePost(id, accessToken);
    navigate("/catalog");
  }

  async function handleRate(stars) {
    if (!isAuthenticated || isOwner) {
      setShowWarning(true);
      return;
    }

    await ratingService.ratePost(id, stars, userId, accessToken);
    loadRatings();
  }

  const average =
    ratings.length > 0
      ? (ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1)
      : "No ratings yet";

  return (
    <>
    <div className="card mx-auto col-md-6 fade-in">
      <h2>{post.title}</h2>
      <p>{post.type}</p>
      <p>{post.description}</p>

      <div className="d-flex align-items-center justify-content-between">
        <small className="d-flex gap-1 align-items-center text-danger">
          <FaUser />
          <strong>{post.authorUsername}</strong>
        </small>

        <div className="d-flex align-items-center gap-2">
          <StarRating className="pb-4"
            rating={userRating || (average === "No ratings yet" ? 0 : Number(average))}
            onRate={handleRate}
          />
          <span className="text-warning fw-bold pt-1">
            {average !== "No ratings yet" ? `${average}` : "-.-"}
          </span>
        </div>
      </div>

      {showWarning && (
        <p className="text-danger mt-2">
          <hr className="text-white" />
          {!isAuthenticated && "Login to rate this post"}
          {isOwner && "You cannot rate your own post"}
        </p>
      )}

      {isOwner && (
        <div className="d-flex gap-3 justify-content-center mt-3">
          <Link className="neon-btn" to={`/edit/${id}`}>Edit</Link>
          <button className="neon-btn" onClick={requestDelete}>Delete</button>
        </div>
      )}
    </div>
    <ConfirmModal
        show={showDelete}
        message="Are you sure you want to delete this post?"
        onConfirm={onDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  );
}
