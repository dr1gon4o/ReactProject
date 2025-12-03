import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postService";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { _id,   username,  email } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService.getAll().then(all =>
      setPosts(all.filter(p => p._ownerId === _id))
    );
  }, [_id]);

  return (
    <div className="fade-in">
      <h2 className="text-center mb-3">{username}'s Posts</h2>
      <hr />
      {posts.length === 0 && <p className="text-center">No posts yet.</p>}

      <div className="row g-4">
        {posts.map(p => (
          <div key={p._id} className="col-md-4">
            <div className="card h-100">
              <h5>{p.title}</h5>
              <p className="text-danger">Posted by {p.authorUsername}</p>
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
