import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LazyImage from './LazyImage';
import { Link } from 'react-router-dom';

const Newsblog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3333/blog/category/newsblog', {
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
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">News Blogs</h1>

      <div className="flex overflow-x-auto space-x-4 pb-4">
        {blogs.map((item) => (
          <Link
            key={item._id}
            to={`/singleblog/${item._id}`}
            className="w-[300px] flex-shrink-0 bg-gray-800 rounded-2xl p-4 shadow-lg"
          >
            {/* Fixed height container for images */}
            <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
              <LazyImage
                src={item.blogImage?.url}
                alt="Blog"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{item.blogTitle}</h2>
            <p className="text-gray-400 text-sm mb-1">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <img
                src={item.creatorId?.userImage?.url}
                alt="Creator"
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm font-medium">{item.creatorId?.channelName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Newsblog;
