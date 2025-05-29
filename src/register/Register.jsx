import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

import axios from 'axios';
import {
  FaPhoneAlt,
  FaUser,
} from 'react-icons/fa';
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    type_user: "élève",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, phone, email, password, confirmPassword, type_user } =
      formData;

    // Validation côté client
    if (!full_name || !phone || !email || !password || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (password.length < 4) {
      toast.error("Le mot de passe doit contenir au moins 4 caractères");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:4401/api/v1/users", {
        full_name,
        phone,
        email,
        password,
        type_user,
      });

      toast.success("Compte créé avec succès !");

      setFormData({
        full_name: "",
        phone: "",
        email: "",
        type_user: "élève",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Gérer les erreurs personnalisées venant du backend (status 500 inclus)
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      }
      if (error.response.status === 400) {
        // Gestion des erreurs de validation
        if (error.response.data && error.response.data.message) {
          // Si le backend renvoie un message d'erreur
          toast.error(error.response.data.message); // Affichage du message d'erreur spécifique
        } else {
          toast.error("Des erreurs de validation sont survenues.");
        }
      } else {
        toast.error(error.response.data.message)
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6e8e8] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Inscription
        </h2>

        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Nom complet"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="relative">
          <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Numéro de téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <select
            name="type_user"
            value={formData.type_user}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="élève">Élève</option>
            <option value="enseignant">Enseignant</option>
          </select>
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-blue-600">
          <Link to="/auth" className="hover:underline">
            Se connecter
          </Link>
          <Link to="/send-otp-phone" className="hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </div>
  );
}


