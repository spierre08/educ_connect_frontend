import React, { useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import {
  FaBookOpen,
  FaHome,
  FaInfoCircle,
  FaSignInAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
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
          <Link to="/" className="hover:text-blue-300 flex items-center">
            <FaHome className="mr-2" /> Accueil
          </Link>

          <Link to="/archive" className="hover:text-blue-300 flex items-center">
            <FaBookOpen className="mr-2" /> Cours basiques
          </Link>

          <Link to="/about" className="hover:text-blue-300 flex items-center">
            <FaInfoCircle className="mr-2" /> À propos
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/auth"
            className="border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition flex items-center"
          >
            <FaSignInAlt className="mr-2" /> Se connecter
          </Link>
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
              to="/"
              className="block hover:text-blue-300 flex items-center"
              onClick={toggleMenu}
            >
              <FaHome className="mr-2" /> Accueil
            </Link>

            {/* Sous-menu Mobile */}
            {/* <div>
              <button
                className="w-full text-left hover:text-blue-300 flex items-center"
                onClick={toggleSubMenu}
              >
                <FaBookOpen className="mr-2" /> Cour élémentaire
              </button>
              <AnimatePresence>
                {submenuOpen && (
                  <motion.div
                    className="pl-6 mt-2 space-y-2"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                  >
                    <Link
                      to="/archive"
                      className="block hover:text-blue-300"
                      onClick={toggleMenu}
                    >
                      Maternelle
                    </Link>
                    <Link
                      to="/archive"
                      className="block hover:text-blue-300"
                      onClick={toggleMenu}
                    >
                      Primaire (1ere à 4eme année)
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div> */}

            <Link
              to="/archive"
              className="hover:text-blue-300 flex items-center"
            >
              <FaBookOpen className="mr-2" /> Cours basiques
            </Link>
            <Link
              to="/about"
              className="block hover:text-blue-300 flex items-center"
              onClick={toggleMenu}
            >
              <FaInfoCircle className="mr-2" /> À propos
            </Link>

            <Link
              to="/auth"
              className="block border-2 border-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition flex items-center"
              onClick={toggleMenu}
            >
              <FaSignInAlt className="mr-2" /> Se connecter
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
