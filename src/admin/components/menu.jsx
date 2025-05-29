import React, { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  FaSignInAlt,
  FaUserCog,
} from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { MdDomainVerification } from 'react-icons/md';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { logout } from '../../hooks/Logout';

export default function MenuAdmin() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion
    navigate("/auth"); // Rediriger vers la page de connexion
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-blue-300">Edu</span>Connect
        </Link>

        {/* Menu Hamburger Mobile */}
        <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex space-x-8 items-center">
          <Link to="/admin" className="hover:text-blue-300 flex items-center">
            <FaUserCog className="mr-2" /> Utilisateurs
          </Link>

          <Link
            to="/admin/subject"
            className="hover:text-blue-300 flex items-center"
          >
            <MdDomainVerification className="mr-2" /> Matières
          </Link>

          <Link
            to="/admin/class"
            className="hover:text-blue-300 flex items-center"
          >
            <GiUpgrade className="mr-2" /> Classes
          </Link>
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={handleLogout}
            className="border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition flex items-center cursor-pointer"
          >
            <FaSignInAlt className="mr-2" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden px-4 pb-4 space-y-4 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <Link
              to="/admin"
              className="block hover:text-blue-300 flex items-center"
              onClick={toggleMenu}
            >
              <FaUserCog className="mr-2" /> Utilisateurs
            </Link>

            <Link
              to="/admin/subject"
              className="hover:text-blue-300 flex items-center"
            >
              <MdDomainVerification className="mr-2" /> Matières
            </Link>
            <Link
              to="/admin/class"
              className="block hover:text-blue-300 flex items-center"
              onClick={toggleMenu}
            >
              <GiUpgrade className="mr-2" /> Classes
            </Link>

            <button
              className="block border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition flex items-center cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignInAlt className="mr-2" />
              Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
