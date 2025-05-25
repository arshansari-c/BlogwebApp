import React, { useEffect, useState } from 'react';
import {
  FaCog,
  FaUser,
  FaMoon,
  FaSun,
  FaBell,
  FaShieldAlt,
  FaQuestionCircle,
  FaArrowRight,
} from 'react-icons/fa';
import Navbar from '../Navbar';
import MenuBar from '../Menubar';
import { FiMenu } from 'react-icons/fi';
import axios from 'axios'
const Settings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fatchProfile,setfatchProfile] = useState({})
  useEffect(()=>{
    const fatchprofile = async()=>{
      try {
        const response = await axios.get(`http://localhost:3333/user/profile/profile`,{withCredentials:true})
        if(response.status===200){
          setfatchProfile(response.data.findUser)
        }else{
          console.log(response.data.message)
        }
      } catch (error) {
        console.log("fatchProfile error",error)
      }
    }
    fatchprofile()
  },[])
  return (
    <div>
      <Navbar />
      <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-40 text-white hover:text-purple-400 transition-colors"
      >
        <FiMenu size={28} />
      </button>

      <div className="min-h-screen w-full bg-gray-900 text-gray-100 p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <FaCog className="text-blue-500 text-2xl" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          {/* Profile Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                <img src={fatchProfile?.userImage?.url} className="" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{fatchProfile.username}</h2>
                <p className="text-gray-400">Arshansari@example.com</p>
              </div>
            </div>
          </div>

          {/* Settings Items */}
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Account Settings</h3>

              <SettingItem
                icon={<FaUser className="text-xl" />}
                title="Account Information"
                action={<FaArrowRight className="text-gray-400" />}
              />

              <SettingItem
                icon={<FaShieldAlt className="text-xl" />}
                title="Security"
                action={<FaArrowRight className="text-gray-400" />}
              />
            </div>

            {/* Preferences */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Preferences</h3>

              <SettingItem
                icon={<FaMoon className="text-xl" />}
                title="Dark Mode"
                action={<ToggleSwitch />}
              />

              <SettingItem
                icon={<FaBell className="text-xl" />}
                title="Notifications"
                action={<FaArrowRight className="text-gray-400" />}
              />
            </div>

            {/* Support */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Support</h3>

              <SettingItem
                icon={<FaQuestionCircle className="text-xl" />}
                title="Help & Support"
                action={<FaArrowRight className="text-gray-400" />}
              />

              <SettingItem
                icon={<FaShieldAlt className="text-xl" />}
                title="Privacy Policy"
                action={<FaArrowRight className="text-gray-400" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, title, action }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className="text-blue-500">{icon}</div>
      <span className="text-lg">{title}</span>
    </div>
    {action}
  </div>
);

const ToggleSwitch = () => (
  <div className="relative inline-block w-12 h-6">
    <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
    <div className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-600 rounded-full peer-checked:bg-blue-500 transition-colors duration-300">
      <div className="absolute h-4 w-4 left-1 top-1 bg-white rounded-full peer-checked:translate-x-6 transition-transform duration-300" />
    </div>
  </div>
);

export default Settings;
