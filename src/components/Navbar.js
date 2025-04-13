import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Adjust path as necessary

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user ,isAdmin} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const commonLinks = (
    <>
      <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-gray-900">
        Home
      </Link>
      <Link to="/about" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-gray-900">
        About
      </Link>
      <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-gray-900">
        Contact
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 inline-block mr-2" />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-gray-800">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {commonLinks}
            {isAuthenticated || isAdmin? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <FaUser />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 flex flex-col">
            {commonLinks}
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={toggleMenu} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                  <FaUser />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
