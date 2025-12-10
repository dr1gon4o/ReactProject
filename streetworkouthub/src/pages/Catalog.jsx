import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postService";
import * as ratingService from "../services/ratingService";
import { FaUser, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { startCatalogLoading, stopCatalogLoading } from "../store/loadingSlice";
import "../styles/loader.css";


export default function Catalog() {
  const [posts, setPosts] = useState([]);
  const [ratingsMap, setRatingsMap] = useState({});
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const loading = useSelector(s => s.loading.catalogLoading);

  useEffect(() => {
    dispatch(startCatalogLoading());

    postService
      .getAll()
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. No Posts found.");
        setPosts([]);
      })
       .finally(() => dispatch(stopCatalogLoading()));
  }, [dispatch]);


  useEffect(() => {
    if (posts.length === 0) return;

    async function loadRatings() {
      const results = await Promise.all(
        posts.map((p) => ratingService.getRatings(p._id))
      );

      const map = {};

      posts.forEach((post, i) => {
        const r = results[i];

        if (r.length > 0) {
          const avg =
            r.reduce((sum, x) => sum + x.rating, 0) / r.length;
          map[post._id] = Number(avg.toFixed(1));
        } else {
          map[post._id] = 0;
        }
      });

      setRatingsMap(map);
    }

    loadRatings();
  }, [posts]);


  if (loading) {
    return <div class="d-flex flex-column align-items-center gap-3 text-center pt-5">
              <h3>Loading posts...</h3>
              <div class="loader" role="status" aria-hidden="true"></div>
            </div>;
  }

  if (error) {
    return <h3 className="text-danger text-center pt-5">{error}</h3>;
  }

  return (
    <div className="row g-4 fade-in">
      {posts.length === 0 && <h3 className="text-center pt-5">No posts yet!</h3>}

      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="col-md-4">
            <div className="card h-100 text-center">
              
              <h5 className="mt-2">{post.title}</h5>
              <p>{post.type}</p>

              <div className="d-flex align-items-center justify-content-between">
                <small className="d-flex gap-1 align-items-center text-danger">
                  <FaUser />
                  <strong>{post.authorUsername}</strong>
                </small>
        
                <div className="d-flex align-items-center gap-2">                    
                  <span className="text-warning d-flex align-items-center gap-1 ms-2 fw-bold">
                    <FaStar /> {ratingsMap[post._id] ? ratingsMap[post._id].toFixed(1) : "-.-"}
                  </span>
                
                </div>
              </div>

              <Link className="neon-btn mt-auto" to={`/posts/${post._id}`}>
                Details
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
