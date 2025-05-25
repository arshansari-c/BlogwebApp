import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogComment from './blogComment';
import SingleBlogIcons from '../components/singleBlogIcons'
const Singleblog = ({ blogId }) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const uploadBlogHistory = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3333/user/profile/uploadbloghistory/${blogId}`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log('History uploaded successfully');
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log('UploadBlogHistory error', error);
      }
    };

    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/blog/singleblog/${blogId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBlog(response.data.findblog);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    uploadBlogHistory();
    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <div className="text-center text-gray-400 py-6">Loading blog...</div>;
  }

  return (
    <div className="w-[70%] bg-gray-800 rounded-2xl shadow-md p-6 text-white mx-auto mt-8">
      <div className="mb-4 text-gray-300 text-sm">
        {new Date(blog.createdAt).toLocaleString()}
      </div>
      <img
        src={blog.blogImage?.url || '/fallback-blog.jpg'}
        alt="Blog"
        className="w-full h-72 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{blog.blogTitle}</h1>
      <p className="text-lg mb-6 text-gray-200">{blog.description}</p>

      <div className="flex items-center gap-4 mt-6">
        <img
          src={blog.creatorId?.userImage?.url || '/default-user.png'}
          alt="Creator"
          className="w-14 h-14 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-lg font-semibold">{blog.creatorId?.channelName}</h2>
          <p className="text-sm text-gray-400">Author</p>
        </div>
      </div>
      <div className=' flex justify-center'>
        <SingleBlogIcons blogId={blogId}/>
      </div>
      <BlogComment blogId={blogId} />
    </div>
  );
};

export default Singleblog;
