import React, { useState } from 'react';
import Navbar from '../Navbar';
import MenuBar from '../Menubar';
import { FiMenu } from 'react-icons/fi';
const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const [submitted, setSubmitted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', feedback: '' });
  };

  return (
    <div>
        <Navbar/>
         <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-4 right-4 z-40 text-white hover:text-purple-400 transition-colors"
        >
          <FiMenu size={28} />
        </button>
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">We Value Your Feedback</h1>
        
        {submitted ? (
          <div className="text-green-400 text-center text-lg font-semibold">
            Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Your Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 bg-gray-700 rounded-xl border border-gray-600 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default FeedbackPage;
