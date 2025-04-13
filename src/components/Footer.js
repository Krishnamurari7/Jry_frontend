// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Network</h3>
            <img src="/logo.png" alt="Logo" className="h-14 w-14 inline-block mb-4" />
            <p className="text-gray-400">
              Connect with professionals and grow your network.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="text-gray-400 hover:text-white transition-colors">
                  Connections
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com/@businesssahyoga1?si=jUBgy7pLAa5rsX-X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-white transition-colors"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-white transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://telegram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-white transition-colors"
              >
                <FaTelegram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
