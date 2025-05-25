import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';

const Anime = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/blog/category/anime`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setBlogs(response.data.findblog);
        } else {
          console.log(response.data.error);
        }
      } catch (err) {
        console.log('Fetch blog error:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">All Anime Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <Link to={`/singleblog/${item._id}`} key={item._id}>
              <div className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                {/* Image container */}
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <LazyImage
                    src={item.blogImage?.url}
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
                    src={item.creatorId?.userImage?.url}
                    alt="Creator"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm font-medium">{item.creatorId?.channelName}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Anime;
