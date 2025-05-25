import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';
import MenuBar from '../Menubar';
import BlogMenu from './BlogMenu'; // Make sure path is correct
import { FiMenu } from 'react-icons/fi';
import BlogCommentMenu from '../blogCommentMenu';

const Historyblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3333/user/profile/getuserbloghistory',
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBlogs(response.data.history);
        } else {
          console.log(response.data.error);
        }
      } catch (err) {
        console.log('Fetch blog error:', err);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    console.log('Delete blog:', id);
    // Add actual delete logic here
  };

  const handleUpdate = (id) => {
    console.log('Update blog:', id);
    // Navigate or show modal here
  };

  const handleAdd = (id) => {
    console.log('Add blog:', id);
    // Use for duplicating or adding related blog
  };

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

        <h1 className="text-3xl font-bold mb-6">History Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              <Link to={`/singleblog/${item._id}`}>
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <LazyImage
                    src={item.blogImage?.url}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  {item.blogTitle}
                </h2>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </Link>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={item.creatorId?.userImage?.url}
                    alt="Creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm font-medium">
                    {item.creatorId?.channelName}
                  </p>
                </div>

                <BlogCommentMenu/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Historyblog;
