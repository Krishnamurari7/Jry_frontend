// src/components/Search.js
import React, { useState } from "react";
import axios from "axios";
import "./Search.css"; // Optional CSS for styling

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/search?query=${query}`);
      setResults(response.data);
    } catch (err) {
      setError("Error fetching search results");
    }
  };

  return (
    <div className="search-container">
      <h2>Search Users</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {results.length > 0 ? (
          results.map((user) => (
            <div key={user._id} className="search-item">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
