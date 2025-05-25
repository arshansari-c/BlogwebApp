import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';
import MenuBar from '../Menubar';
import { FiMenu } from 'react-icons/fi';


const Dislikeblog = () => {
    const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3333/blog/fatchdislikedblog', {
          withCredentials: true,
        });
        if (response.status === 200) {
          setBlogs(response.data.DislikedBlogs);
        } else {
          setError(response.data.error || 'Failed to fetch disliked blogs');
        }
      } catch (err) {
        console.error('Fetch blog error:', err);
        setError('Something went wrong while fetching blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <button
          onClick={() => setIsMenuOpen(true)}
          className="fixed top-4 right-4 z-40 text-white hover:text-purple-400 transition-colors"
        >
          <FiMenu size={28} />
        </button>

        <h1 className="text-3xl font-bold mb-6">Disliked Blogs</h1>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-gray-400">No disliked blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
            {blogs.map((item) => (
              <Link
                to={`/singleblog/${item._id}`}
                key={item._id}
                className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* Blog image */}
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <LazyImage
                    src={item.blogImage?.url || '/fallback-blog.jpg'}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog content */}
                <h2 className="text-xl font-semibold mb-2">{item.blogTitle}</h2>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

                {/* Creator info */}
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src={item.creatorId?.userImage?.url || '/default-user.png'}
                    alt="Creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm font-medium">
                    {item.creatorId?.channelName || 'Unknown'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dislikeblog