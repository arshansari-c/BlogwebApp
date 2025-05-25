import axios from 'axios';
import React, { useState } from 'react';

const Searchblog = () => {
  const [query, setQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // to track if a search was done

  const uploadSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3333/blogsearch/searchblog',
        { search: query },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setBlogs(response.data.blogs);
        setSearched(true);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log('Upload search error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="flex mb-6 space-x-2">
        <input
          placeholder="Search"
          className="p-2 rounded bg-gray-800 text-white w-full"
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          onClick={uploadSearch}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : searched && blogs.length === 0 ? (
        <h1 className="text-xl">Blog not found</h1>
      ) : blogs.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                  <img
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
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Searchblog;
