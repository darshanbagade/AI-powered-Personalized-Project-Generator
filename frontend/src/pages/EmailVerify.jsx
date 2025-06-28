import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, email } = location.state || {};
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error('OTP is required');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/verify-account', { userId, otp });
      if (res.data.success) {
        toast.success('Email verified!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        toast.error(res.data.message || 'Verification failed');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/send-verify-otp', { userId });
      if (res.data.success) {
        toast.success('OTP resent to your email');
      } else {
        toast.error(res.data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div className="flex items-center justify-center min-h-screen">Invalid access</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104]">
      <ToastContainer />
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
        <div className="mb-4 text-gray-600 text-center">An OTP has been sent to <span className="font-semibold">{email}</span></div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">OTP</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
        <button
          type="button"
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          onClick={handleResend}
          disabled={loading}
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
