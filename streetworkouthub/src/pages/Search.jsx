import { useEffect, useState } from "react";
import * as postService from "../services/postService";
import SearchBar from "../components/Searchbar";

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
              <h3>{post.title}</h3>
              <p><strong>Type:</strong> {post.type}</p>
              <p><strong>Author:</strong> {post.authorUsername}</p>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
