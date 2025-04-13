import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Connections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/connections', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch connections');
        }

        const data = await response.json();

        setConnections(data.connections || []);
        setPendingConnections(data.pendingConnections || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return <div>Loading connections...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Connections</h2>
      {connections.length === 0 ? (
        <p className="text-gray-600 mb-6">No connections yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {connections.map((connection) => (
            <div key={connection._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{connection.name}</h3>
              <p className="text-gray-600">{connection.email}</p>
              {connection.businessName && (
                <p className="text-gray-600">{connection.businessName}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Pending Connection Requests</h2>
      {pendingConnections.length === 0 ? (
        <p className="text-gray-600">No pending requests</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingConnections.map((pending) => (
            <div key={pending._id} className="bg-yellow-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{pending.name}</h3>
              <p className="text-gray-600">{pending.email}</p>
              {pending.businessName && (
                <p className="text-gray-600">{pending.businessName}</p>
              )}
              {/* You can add Accept/Reject buttons here if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
