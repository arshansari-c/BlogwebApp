import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Anime');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !file || !category) return toast.error('Fill all fields');

    const formData = new FormData();
    formData.append('blogTitle', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('blogImage', file);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3333/blog/uploadblog', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        toast.success('Blog uploaded successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
        setCategory('Anime');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Upload Blog</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write blog description"
          ></textarea>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-white"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="anime">anime</option>
            <option value="news">news</option>
            <option value="gaming">gaming</option>
            <option value="aimal">animal</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors font-semibold py-2 rounded-xl text-white disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Submit Blog'}
        </button>
      </form>
    </div>
  );
};

export default BlogUpload;
