import { useState } from "react";
import "../styles/Searchbar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  function handleQueryChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value, filter);
  }

  function handleFilterChange(e) {
    const value = e.target.value;
    setFilter(value);
    onSearch(query, value);
  }

  return (
    <div className="search-bar-container rgb">
      <select
        value={filter}
        onChange={handleFilterChange}
        className="search-filter"
      >
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="type">Type</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleQueryChange}
        className="search-input"
      />
    </div>
  );
}
