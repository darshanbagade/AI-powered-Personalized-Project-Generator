import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!name || !email || !password) {
      setFormError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/register', { name, email, password });
      if (res.data.success) {
        toast.success('Registration successful! Please verify your email.');
        navigate('/email-verify', { state: { userId: res.data.user._id, email } });
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104] relative">
      <ToastContainer />
      {/* Logo */}
      <div className="absolute top-10 left-10 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-2xl">//</span>
        </div>
        <span className="text-2xl font-bold text-gray-700">auth</span>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#181c2f] p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-center mb-2">Create your account</p>
        {formError && <div className="mb-2 text-red-400 text-center">{formError}</div>}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 7.07-1.42-1.42M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
            </span>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 7.07-1.42-1.42M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
            </span>
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Email id"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v5a5 5 0 0 0 5 5Z"/><path d="M17 11V7a5 5 0 0 0-10 0v4"/></svg>
            </span>
            <input
              type="password"
              className="w-full pl-10 pr-3 py-3 bg-[#23294a] text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <Link to="/reset-password" className="text-blue-300 hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>
        <div className="text-center text-gray-400 text-sm mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300 hover:underline">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register; 