import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile?email=${user.email}`, {
          withCredentials: true
        });
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pt-10">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        </div>
        <div className="px-6 py-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg text-gray-900">{profileData.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{profileData.email}</p>
          </div>
          {profileData.businessName && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <p className="mt-1 text-lg text-gray-900">{profileData.businessName}</p>
            </div>
          )}
          {profileData.businessOption && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <p className="mt-1 text-lg text-gray-900">{profileData.businessOption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;