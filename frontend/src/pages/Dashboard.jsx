import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen cyber-mesh-bg text-white">Loading...</div>;

  return (
    <div className="min-h-screen cyber-mesh-bg flex flex-col items-center justify-center p-4">
      <div className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-lg text-white">
        <h2 className="text-3xl font-bold mb-6 privacy-text">Dashboard</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="font-semibold text-gray-300">Name:</span>
            <span className="text-white">{user?.name}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
            <span className="font-semibold text-gray-300">Verified:</span>
            <span className={`${user?.isAccountVerified ? 'text-green-400' : 'text-red-400'}`}>
              {user?.isAccountVerified ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full mt-6 privacy-gradient text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
        <div className="mt-8 p-4 rounded-lg bg-white/5">
          <div className="text-gray-400 text-center">Your data will appear here.</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 