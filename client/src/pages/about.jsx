import Navbar from "../components/Navbar";
import pubg from '../assets/pubg.png'
export default function About() {
    return (
        <div>
            <Navbar/>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Blog-Z</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Where Thoughts Meet the Digital Canvas
            </p>
          </div>
        </div>
  
        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Author Section */}
            <div className="col-span-1">
              <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
                <img 
                  src={pubg}
                  alt="Author" 
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-500"
                />
                <h3 className="text-2xl font-bold text-center mb-2">John Doe</h3>
                <p className="text-gray-400 text-center mb-4">Founder & Writer</p>
                <p className="text-gray-300 text-center">
                  Passionate storyteller and tech enthusiast exploring the digital frontier.
                </p>
              </div>
            </div>
  
            {/* About Text */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Blog-Z was born from a simple idea: to create a space where technology, 
                  creativity, and personal growth intersect. What started as a personal 
                  journal has evolved into a thriving community of curious minds.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We believe in the power of words to inspire change and spark innovation. 
                  Our mission is to deliver content that challenges perspectives, 
                  celebrates human achievement, and explores the boundaries of 
                  digital expression.
                </p>
              </div>
  
              {/* Skills/Interests */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-purple-400 font-bold mb-3">Focus Areas</h4>
                  <ul className="space-y-2">
                    {['Tech Innovation', 'Digital Art', 'AI Ethics', 'Web Development'].map((item) => (
                      <li key={item} className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
  
                <div className="bg-gray-800 rounded-xl p-6">
                  <h4 className="text-purple-400 font-bold mb-3">Community</h4>
                  <div className="flex flex-wrap gap-2">
                    {['100K+ Readers', 'Weekly Posts', 'Open Source', 'Guest Writers'].map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1 bg-purple-800/30 text-purple-300 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Join Our Journey</h3>
            <p className="text-gray-400 mb-8">
              Stay updated with our latest explorations and become part of our growing community.
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
              Explore More
            </button>
          </div>
        </div>
  
        {/* Footer Note */}
        <div className="border-t border-gray-800 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-gray-400">
            <p>© 2024 Blog-Z. All rights reserved. Crafted with passion in the digital world.</p>
          </div>
        </div>
      </div>
      </div>
    );
  }