import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecommendBlog = ({ blogId }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3333/blog/category/allblog', {
          withCredentials: true,
        });
        if (response.status === 200 && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.log("Fetch all blog error", error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div className="w-[30%] bg-gray-800 rounded-2xl shadow-inner p-4 overflow-y-auto max-h-[90vh] overflow-scroll">
      <h2 className="text-xl font-semibold text-white mb-4">Recommended Blogs</h2>

      <div className="flex flex-col gap-4">
        {blogs
          .filter(item => item._id !== blogId)
          .map((item, index) => (
            <Link to={`/singleblog/${item._id}`} key={index}>
              <div className="bg-gray-700 rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-transform duration-300">
                <div className="w-full h-40 overflow-hidden rounded-xl mb-4">
                  <img
                    src={item.blogImage?.url}
                    loading="lazy"
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold mb-2 text-white line-clamp-2">{item.blogTitle}</h2>
                <p className="text-gray-400 text-sm mb-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <img
                    src={item.creatorId?.userImage?.url}
                    alt="Creator"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium text-white">
                    {item.creatorId?.channelName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RecommendBlog;
