import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiClock,
  FiHeart,
  FiSave,
  FiLogOut,
  FiX,
} from 'react-icons/fi';
import { IoSettingsSharp } from "react-icons/io5";
import { RiDislikeFill, RiFeedbackFill } from "react-icons/ri";
import { SlDislike } from "react-icons/sl";
import { FaComment, FaUpload, FaUser } from "react-icons/fa";
import axios from'axios'
const MenuBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [blogger,setblogger] = useState(false)

const handleLogout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3333/user/logout',
      {}, // empty body
      { withCredentials: true } // config object
    );

    if (response.status === 200) {
      localStorage.clear();
      navigate('/register');
    } else {
      console.log(response.data);
    }

  } catch (error) {
    console.log('Logout error:', error);
  }
};

useEffect(()=>{
  const fatchprofile = async()=>{
    try {
      const response = await axios.get('http://localhost:3333/user/profile/profile',{withCredentials:true})
      if(response.status===200){
        if(response.data.findUser.role==="blogger"){
          setblogger(true)
        }else{
          setblogger(false)
        }
      }else{
        console.log(response.data.message)
      }
    } catch (error) {
      console.log("fatchprofile error",error)
    }
  }
  fatchprofile()
},[])

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className="text-white hover:text-purple-400 transition-colors mb-8"
        >
          <FiX size={24} />
        </button>

        <nav className="space-y-6">
          <Link to="/" className="flex items-center text-white hover:text-purple-400">
            <FiHome className="mr-3" size={20} /> Home
          </Link>
          <Link to="/historyblogs" className="flex items-center text-white hover:text-purple-400">
            <FiClock className="mr-3" size={20} /> History
          </Link>
          <Link to="/likedblogs" className="flex items-center text-white hover:text-purple-400">
            <FiHeart className="mr-3" size={20} /> Liked
          </Link>
          <Link to="/savedblogs" className="flex items-center text-white hover:text-purple-400">
            <FiSave className="mr-3" size={20} /> Saved
          </Link>
          { blogger? <Link to="/uploadblog" className="flex items-center text-white hover:text-purple-400">
            <FaUpload className="mr-3" size={20} /> Upload
          </Link>: <Link to="/savedblogs" className="flex items-center text-white hover:text-purple-400">
            <FaUser className="mr-3" size={20} /> Convert
          </Link>}
           <Link to="/setting" className="flex items-center text-white hover:text-purple-400">
            <IoSettingsSharp color='white' className="mr-3" size={20} /> Setting
          </Link>
          <Link to="/feedback" className="flex items-center text-white hover:text-purple-400">
            <RiFeedbackFill color='white' className="mr-3" size={20} /> Feedback
          </Link>
          <Link to="/saved-posts" className="flex items-center text-white hover:text-purple-400">
            <SlDislike color='white' className="mr-3" size={20} /> Dislike
          </Link>
          <Link to="/saved-posts" className="flex items-center text-white hover:text-purple-400">
            <FaComment color='white' className="mr-3" size={20} /> Comment
          </Link>
          <button
            onClick={() => {
              handleLogout();
              onClose();
            }}
            className="w-full flex items-center text-white hover:text-purple-400"
          >
            <FiLogOut className="mr-3" size={20} /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MenuBar;
