import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3333/user/register', formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Registered successfully");
        navigate('/otp', { state: { email: formData.email } }); // fixed here
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSocialLogin = (provider) => {
    toast.error(`${provider} authentication is currently unavailable`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Blog-Z</h1>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-center m-2">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
          </p>
          <p className="text-center text-white mb-4">Or continue with</p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              {/* Google Logo */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12.545 10.239V14.46H18.643C18.394 15.99 17.577 17.343 16.281 18.266V21.27H19.909C22.119 19.322 23.333 16.54 23.333 13.23C23.333 12.55 23.265 11.895 23.14 11.265H12.545V10.239Z" fill="#4285F4"/>
                <path d="M5.514 14.524C5.114 13.58 4.889 12.551 4.889 11.48C4.889 10.409 5.114 9.38 5.514 8.436V5.43H1.741C0.645 7.6 0 10.04 0 12.48C0 14.92 0.645 17.36 1.741 19.53L5.514 16.524V14.524Z" fill="#34A853"/>
                <path d="M12.545 5.43C14.255 5.43 15.76 6.02 16.97 7.17L20.11 3.91C18.18 2.15 15.59 1 12.545 1C8.06 1 4.255 3.7 2.74 7.43L6.513 10.43C7.423 7.85 9.787 5.43 12.545 5.43Z" fill="#FBBC05"/>
                <path d="M12.545 19.53C15.59 19.53 18.18 18.38 20.028 16.62L16.28 13.62C15.12 14.5 13.65 15.07 12.545 15.07C9.796 15.07 7.432 12.65 6.513 10.07H2.74V13.07C4.255 16.8 8.06 19.53 12.545 19.53Z" fill="#EA4335"/>
              </svg>
            </button>

            <button
              onClick={() => handleSocialLogin('Microsoft')}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
            >
              {/* Microsoft Logo */}
              <svg className="w-6 h-6" viewBox="0 0 23 23" fill="none">
                <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
                <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
                <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
                <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
