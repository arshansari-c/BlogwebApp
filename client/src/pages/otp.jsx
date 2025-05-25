import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from previous page
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const fullOtp = Number(otp.join(''));


      console.log("OTP to send:", fullOtp);  // Add logging for debugging

      const response = await axios.post(
        'http://localhost:3333/user/verifyaccount',
        { email, otp: fullOtp }, // Send OTP as string, not number
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Verified successfully");
        navigate('/');
      } else {
        toast.error(response.data.message || "Verification failed");
      }
    } catch (error) {
      console.log("OTP error:", error);
      toast.error(error.response?.data?.message || "Server error during verification");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!isNaN(pastedData)) {
      setOtp(pastedData.split(''));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-1"></div>

      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-gray-700/90 p-8 rounded-lg shadow-md w-full max-w-md relative z-10 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Verify Email</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                className="w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                onPaste={handlePaste}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
