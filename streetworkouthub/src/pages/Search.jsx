import { useEffect, useState } from "react";
import * as postService from "../services/postService";
import * as ratingService from "../services/ratingService";
import SearchBar from "../components/Searchbar";
import { FaStar } from "react-icons/fa";


export default function Search() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadPosts() {
      const data = await postService.getAll();
      setPosts(data);
    }
    loadPosts();
  }, []);

  function handleSearch(q, filter) {
    setQuery(q);
    q = q.toLowerCase();

    if (q.trim() === "") {
      setFiltered([]);
      return;
    }

    const results = posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(q);
      const typeMatch = post.type?.toLowerCase().includes(q);
      const authorMatch = post.authorUsername
        ?.toLowerCase()
        .includes(q);

      if (filter === "title") return titleMatch;
      if (filter === "type") return typeMatch;
      if (filter === "author") return authorMatch;

      return titleMatch || typeMatch || authorMatch;
    });

    setFiltered(results);
  }

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
    <div >
      <h2 className="text-center text-neon mb-4">My Search Posts</h2>

      <SearchBar onSearch={handleSearch} />

      {query.length === 0 && (
        <p className="text-muted">Start typing to search...</p>
      )}

      {query.length > 0 && filtered.length === 0 && (
        <p>No posts found.</p>
      )}

      <div className="row mt-3">
        {filtered.map((post) => (
          <div key={post._id} className="col-md-4 mb-3">
            <div className="card p-3 bg-dark text-light">
              <h3>Title: {post.title}</h3>
              <p><strong>Type:</strong> {post.type}</p>
              <p><strong>Author:</strong> {post.authorUsername}</p>
              <p>Desctiption: {post.description}</p>
              <span className="text-warning d-flex align-items-center gap-1 ms-2 fw-bold">
                <FaStar /> {ratingsMap[post._id] ?? "-.-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
