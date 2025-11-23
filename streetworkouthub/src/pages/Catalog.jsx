import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postService";

export default function Catalog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    postService.getAll()
      .then(data => {
        // Ensure we always have an array
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts.");
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h3>Loading posts...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className="row g-4 fade-in">
      {posts.length === 0 && <h3>No posts yet!</h3>}

      {posts.length > 0 && posts.map(post => (
        <div key={post._id} className="col-md-4">
          <div className="card h-100 text-center">
            <h5 className="mt-2">{post.title}</h5>
            <p>{post.type}</p>
            <Link className="neon-btn mt-auto" to={`/posts/${post._id}`}>
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
