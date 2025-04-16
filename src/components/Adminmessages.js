import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMessages = () => {
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/queries/admin-queries`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQueries(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch queries");
      }
    };
    fetchQueries();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Queries</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul className="space-y-4">
        {queries.map((query) => (
          <li key={query._id} className="bg-white shadow rounded p-4">
            <h4 className="text-lg font-semibold">{query.subject}</h4>
            <p><strong>From:</strong> {query.name} ({query.email})</p>
            <p className="mt-2 text-gray-700">{query.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMessages;
