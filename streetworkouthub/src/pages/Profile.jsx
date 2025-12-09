import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postService";
import * as ratingService from "../services/ratingService";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaStar } from "react-icons/fa";
import { GiMuscularTorso } from "react-icons/gi";


export default function Profile() {
  const { _id,   username,  email } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then(all =>
      setPosts(all.filter(p => p._ownerId === _id))
    );
  }, [_id]);

  const [ratingsMap, setRatingsMap] = useState({});
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
          map[post._id] = null;
        }
      });

      setRatingsMap(map);
    }

    loadRatings();
  }, [posts]);
  

  return (
    <div className="fade-in">
      <h2 className="text-center mb-3">
        Welcome Back, {username}! Ready to Train <GiMuscularTorso className="mb-1" />
      </h2>
      <hr />
      {posts.length === 0 && <p className="text-center">No posts yet.</p>}

      <div className="row g-4">
        {posts.map(p => (
          <div key={p._id} className="col-md-4">
            <div className="card h-100">
              <h5>{p.title}</h5>
              <br />

            {/* <small className="d-flex gap-1 align-items-center text-danger">
              <FaUser /><strong>{p.authorUsername}</strong>
            </small> */}

            <div className="d-flex align-items-center justify-content-between">
              <small className="d-flex gap-1 align-items-center text-danger">
                <FaUser />
                <strong>{p.authorUsername}</strong>
              </small>
      
              <div className="d-flex align-items-center gap-2 mb-2">                    
                <span className="text-warning d-flex align-items-center gap-1 ms-2 fw-bold">
                  <FaStar /> {ratingsMap[p._id] ?? "-.-"}
                </span>
              </div>
            </div>

              <Link className="neon-btn mt-auto" to={`/posts/${p._id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
