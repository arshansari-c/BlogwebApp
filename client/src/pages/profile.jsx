import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import LazyImage from '../components/LazyImage';
import MenuBar from '../components/Menubar';
import Footer from '../components/Footer'
const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchHistory, setFetchHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fatchLikedblog,setfatchLikedblog] = useState([])
  const [savedblog,setSavedblog] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/user/profile/profile`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setProfileData(response.data.findUser);
        } else {
          toast.error(response.data.message || 'Something went wrong');
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/user/profile/getuserbloghistory`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setFetchHistory(response.data.history);
        } else {
          toast.error(response.data.message || 'Something went wrong');
        }
      } catch (error) {
        toast.error('Failed to fetch history');
      } finally {
        setHistoryLoading(false);
      }
    };

    const fatchAllLikedBLog = async()=>{
      try {
        const response = await axios.get(`http://localhost:3333/blog/fatchlikedblog`,{withCredentials:true})
        if(response.status===200){
          setfatchLikedblog(response.data.likedBlogs)
        }else{
          toast.error(response.data.message||"Something Wrong")
        }
      } catch (error) {
        console.log("FatchAllLikedBlog error",error)
      }
    }

    const fatchAllSavedBlog = async()=>{
    try {
        const response = await axios.get(`http://localhost:3333/user/profile/fatchallsavedblog`,{withCredentials:true})
      if(response.status===200){
        setSavedblog(response.data.blogs)       
      }else{
        toast.error("Something Wrong")
        console.log(response.data.message)
      }
    } catch (error) {
      console.log("FatchAllSavedBlog error",error)
    }
    }
    fatchAllSavedBlog()
    fetchProfile();
    fetchUserHistory();
    fatchAllLikedBLog()
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar />

      <div className="text-white pt-8 pb-16">
        <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-40 text-white hover:text-purple-400 transition-colors"
      >
        <FiMenu size={28} />
      </button>
        <div className="max-w-6xl mx-auto bg-[#1e293b] rounded-2xl shadow-lg p-8 mb-8">
          {loading ? (
            <p className="text-center text-gray-400">Loading profile...</p>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={profileData?.userImage?.url || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-purple-500 object-cover"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {profileData?.username || 'Unknown User'}
                </h1>
                <p className="text-gray-400 mb-4">{profileData?.role || 'User'}</p>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-purple-400">{profileData?.postCount || 0}</p>
                    <p className="text-gray-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-purple-400">{profileData?.followersCount || 0}</p>
                    <p className="text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-purple-400">{profileData?.followingCount || 0}</p>
                    <p className="text-gray-400">Following</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">History</h1>

          {historyLoading ? (
            <p className="text-gray-400">Loading history...</p>
          ) : fetchHistory.length === 0 ? (
            <p className="text-gray-500">No history found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetchHistory.splice(0,3).map((item) => (
                <Link
                  key={item._id}
                  to={`/singleblog/${item._id}`}
                  className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                    <LazyImage
                      src={item.blogImage?.url || 'https://via.placeholder.com/300'}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-semibold mb-2 truncate">{item.blogTitle}</h2>
                  <p className="text-gray-400 text-sm mb-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={item.creatorId?.userImage?.url || 'https://via.placeholder.com/50'}
                      alt="Creator"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-medium truncate">
                      {item.creatorId?.channelName || 'Unknown Creator'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">Liked Blogs</h1>

          {historyLoading ? (
            <p className="text-gray-400">Loading Liked...</p>
          ) : fetchHistory.length === 0 ? (
            <p className="text-gray-500">No Liked Blog found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fatchLikedblog.splice(0,3).map((item) => (
                <Link
                  key={item._id}
                  to={`/singleblog/${item._id}`}
                  className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                    <LazyImage
                      src={item.blogImage?.url || 'https://via.placeholder.com/300'}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-semibold mb-2 truncate">{item.blogTitle}</h2>
                  <p className="text-gray-400 text-sm mb-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={item.creatorId?.userImage?.url || 'https://via.placeholder.com/50'}
                      alt="Creator"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-medium truncate">
                      {item.creatorId?.channelName || 'Unknown Creator'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">Saved Blogs</h1>

          {historyLoading ? (
            <p className="text-gray-400">Loading Liked...</p>
          ) : fetchHistory.length === 0 ? (
            <p className="text-gray-500">No Liked Blog found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedblog.splice(0,3).map((item) => (
                <Link
                  key={item._id}
                  to={`/singleblog/${item._id}`}
                  className="bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                    <LazyImage
                      src={item.blogImage?.url || 'https://via.placeholder.com/300'}
                      alt="Blog"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-semibold mb-2 truncate">{item.blogTitle}</h2>
                  <p className="text-gray-400 text-sm mb-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={item.creatorId?.userImage?.url || 'https://via.placeholder.com/50'}
                      alt="Creator"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-medium truncate">
                      {item.creatorId?.channelName || 'Unknown Creator'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;