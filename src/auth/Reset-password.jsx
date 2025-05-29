import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

import axios from 'axios';
import {
  FiEye,
  FiEyeOff,
  FiLock,
} from 'react-icons/fi';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !cpassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== cpassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:4401/api/v1/auth/reset-password/${userId}`,
        {
          password,
          cpassword,
        }
      );

      toast.success("Mot de passe modifié avec succès !");
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      // Si c'est une erreur axios avec réponse serveur
      if (error.response && error.response.data) {
        // Récupérer le message d'erreur venant du backend
        const message =
          error.response.data.message ||
          error.response.data.error ||
          "Erreur survenue";
        toast.error(message);
      } else {
        // Erreur réseau ou autre
        toast.error("Erreur réseau ou serveur indisponible");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5dddd] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Nouveau mot de passe
        </h2>

        {/* Nouveau mot de passe */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Confirmer mot de passe */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword1 ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword1(!showPassword1)}
          >
            {showPassword1 ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Liens */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
          <Link to="/auth" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Modifier
        </button>

        <Link
          to="/"
          className="block mt-2 text-center text-blue-700 hover:underline"
        >
          Retour
        </Link>

        <ToastContainer position="top-center" autoClose={3000} />
      </form>
    </div>
  );
}
