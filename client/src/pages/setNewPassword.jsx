import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        'http://localhost:3333/user/setnewpassword',
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
        navigate('/login');
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log('Set new password error:', error);
      toast.error(error.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  // if email is missing from state, redirect
  if (!email) {
    toast.error('Invalid access to password reset');
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Set New Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition-colors duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                       rounded-lg transition-all duration-200 transform hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
