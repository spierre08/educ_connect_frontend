import React, { useState } from 'react';

import {
  ArrowLeft,
  Layers,
  LogOut,
  Menu,
  Plus,
  X,
} from 'lucide-react';

const NavbarResponsive = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Gestionnaires d'événements (à personnaliser)
  const handleRetour = () => {
    window.history.back();
    setIsOpen(false);
  };
  const handleAddCourse = () => {
    alert("Ajouter un cours");
    setIsOpen(false);
  };
  const handleAddSerie = () => {
    alert("Ajouter une série de cours");
    setIsOpen(false);
  };
  const handleLogout = () => {
    console.log("Déconnexion");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Titre */}
          <div className="text-lg font-bold text-blue-600 select-none">
            Kouma Academy
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              onClick={handleRetour}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
            >
              <ArrowLeft className="w-5 h-5" /> Retour
            </button>
            <button
              onClick={handleAddCourse}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
            >
              <Plus className="w-5 h-5" /> Ajouter un cours
            </button>
            <button
              onClick={handleAddSerie}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
            >
              <Layers className="w-5 h-5" /> Ajouter une série
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition"
            >
              <LogOut className="w-5 h-5" /> Déconnexion
            </button>
          </div>

          {/* Menu Mobile Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-inner border-t border-gray-200">
          <button
            onClick={handleRetour}
            className="flex items-center gap-2 w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </button>
          <button
            onClick={handleAddCourse}
            className="flex items-center gap-2 w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
          >
            <Plus className="w-5 h-5" /> Ajouter un cours
          </button>
          <button
            onClick={handleAddSerie}
            className="flex items-center gap-2 w-full text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition"
          >
            <Layers className="w-5 h-5" /> Ajouter une série
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition"
          >
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarResponsive;
