import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import axios from "axios";

const HomePage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/search?email=${searchEmail}`
      );
      setSearchResult(response.data);
      setError("");
    } catch (error) {
      setSearchResult(null);
      setError(error.response?.data?.message || "User not found");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const [pendingRequests, setPendingRequests] = useState([]);
const [connections, setConnections] = useState([]);

const fetchPendingRequests = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:5000/api/connections", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPendingRequests(response.data.pendingConnections || []);
    setConnections(response.data.connections || []);
  } catch (err) {
    console.error("Failed to fetch pending requests", err);
  }
};


useEffect(() => {
  fetchPendingRequests();
}, []);


  const handleSendRequest = async (userId) => {
    try {
      const token = localStorage.getItem("token"); // retrieve token
  
      if (!token) {
        setError("You are not logged in.");
        return;
      }
  
      await axios.post(
        `http://localhost:5000/api/connections/request/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token here
          },
        }
      );
  
      // Clear state if request is successful
      setSearchResult(null);
      setSearchEmail("");
      setShowAddForm(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send connection request");
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleAccept = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:5000/api/connections/accept/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingRequests(); // refresh list
    } catch (err) {
      console.error("Failed to accept request", err);
    }
  };
  
  const handleReject = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:5000/api/connections/reject/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingRequests(); // refresh list
    } catch (err) {
      console.error("Failed to reject request", err);
    }
  };
  
  

  const handleAddConnection = () => {
    setShowAddForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Our Network
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with others and expand your business network
          </p>
          <button
            onClick={handleAddConnection}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto gap-2"
          >
            <FaUserPlus className="text-xl" />
            Add Connection
          </button>
        </div>

        {showAddForm && (
          <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Find New Connection</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="searchEmail" className="block text-gray-700 mb-2">
                  Search by Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    id="searchEmail"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaSearch />
                    Search
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}

{searchResult && searchResult.length > 0 && (
  <div className="mt-4 space-y-4">
    {searchResult.map((user) => (
      <div key={user._id} className="p-4 bg-gray-50 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
            {user.businessName && (
              <p className="text-gray-600 text-sm">{user.businessName}</p>
            )}
          </div>
          <button
            onClick={() => handleSendRequest(user._id)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FaUserPlus />
            Connect
          </button>
        </div>
      </div>
    ))}
  </div>
)}

          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Connections</h2></div>
          {connections.length > 0 ? (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {connections.map((conn) => (
      <div key={conn._id} className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold">{conn.name}</h3>
        <p className="text-gray-600 text-sm">{conn.email}</p>
        {conn.businessName && (
          <p className="text-gray-600 text-sm">{conn.businessName}</p>
        )}
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-600 mt-2">No connections yet.</p>
)}


{pendingRequests.length > 0 && (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-4">Pending Connection Requests</h2>
    <div className="space-y-4">
      {pendingRequests.map((user) => (
        <div key={user._id} className="p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          {user.businessName && <p className="text-gray-600 text-sm">{user.businessName}</p>}
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleAccept(user._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(user._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Connect with Others
            </h3>
            <p className="text-gray-600">
              Build meaningful connections with like-minded professionals in your
              industry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Share Your Business
            </h3>
            <p className="text-gray-600">
              Showcase your business and discover new opportunities through your
              network.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Grow Your Network
            </h3>
            <p className="text-gray-600">
              Expand your professional network and unlock new possibilities for
              collaboration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
