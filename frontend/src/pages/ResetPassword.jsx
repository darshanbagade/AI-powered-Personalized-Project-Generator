import React, { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email) {
      setFormError('Email is required');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/send-reset-otp', { email });
      if (res.data.success) {
        toast.success('OTP sent to your email');
        setStep(2);
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!otp || !newPassword) {
      setFormError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/reset-password', { email, otp, newPassword });
      if (res.data.success) {
        toast.success('Password reset successful!');
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
      } else {
        toast.error(res.data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#000000] via-[#12001eea] to-[#000104]">
      <ToastContainer />
      <form onSubmit={step === 1 ? handleSendOtp : handleResetPassword} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        {formError && <div className="mb-4 text-red-500">{formError}</div>}
        {step === 1 ? (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
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
            <div className="mb-4">
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;