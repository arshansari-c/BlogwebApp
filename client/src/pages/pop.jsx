import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogComment from '../components/blogComment';

const Singleblog = () => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/blog/singleblog/${blogId}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setBlog(response.data.findblog);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

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

  if (!blog) return <div className="text-center text-gray-500 py-10">Loading blog...</div>;

  return (
    <div>
    <div className="flex gap-4 px-6 py-4 text-white">
      {/* Blog Content - 70% */}
      <div className="w-[70%] bg-gray-800 rounded-2xl shadow-md p-6 text-white">
        <div className="mb-4 text-shadow-amber-50 text-sm">
          {new Date(blog.createdAt).toLocaleString()}
        </div>
        <img src={blog.blogImage?.url} alt="Blog" className="w-full h-72 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">{blog.blogTitle}</h1>
        <p className=" text-shadow-white text-lg mb-6">{blog.description}</p>

        <div className="flex items-center gap-4 mt-6">
          <img
            src={blog.creatorId?.userImage?.url}
            alt="Creator"
            className="w-14 h-14 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">{blog.creatorId?.channelName}</h2>
            <p className="text-sm text-shadow-white">Author</p>
          </div>
        </div>
      </div>
      </div>


      {/* More Blogs - 30% Vertical */}
      <div className="w-[30%] bg-gray-800 rounded-2xl shadow-inner p-4 overflow-y-auto ">
        <h2 className="text-xl font-semibold text-white mb-4">More Blogs</h2>

        <div className="flex flex-col gap-4">
          {blogs
            .filter(item => item._id !== blog._id) // exclude current blog
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
                  <h2 className="text-lg font-semibold mb-2 text-white">{item.blogTitle}</h2>
                  <p className="text-gray-400 text-sm mb-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={item.creatorId?.userImage?.url}
                      alt="Creator"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-medium text-white">{item.creatorId?.channelName}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
    
  );
};

export default Singleblog;
