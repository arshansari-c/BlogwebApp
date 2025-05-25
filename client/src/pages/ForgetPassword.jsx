import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formdata = new FormData();
    formdata.append('email', email);

    try {
      const response = await axios.post(
        'http://localhost:3333/user/forgetpasswordotp',
        formdata,
        { withCredentials: true }
      );
      if(response.status===200){
        toast.success("Otp send succesfully")
        navigate('/verifyEmail',{state:{email:email}})
      }else{
        toast.error(response.data.message||"Something wrong")
      }
    } catch (error) {
      console.log('Forget password error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Forgot Password?
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            {loading ? 'Sending...' : 'Send Reset OTP'}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm">
          Remember your password?{' '}
          <Link to="/" className="text-blue-500 hover:text-blue-400 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
