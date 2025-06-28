import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="mb-4">
          <span className="font-semibold">Name:</span> {user?.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Verified:</span> {user?.isAccountVerified ? 'Yes' : 'No'}
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        <div className="mt-8">
          {/* Placeholder for CRUD data table/cards */}
          <div className="text-gray-500">Your data will appear here.</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 