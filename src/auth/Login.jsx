import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

import axios from 'axios';
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from 'react-icons/fi';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Tous les champs sont requis!");
      return;
    }

    if (password.length < 4) {
      toast.error("Le mot de passe doit contenir au moins 4 caractères!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4401/api/v1/auth", {
        item: email,
        password: password,
      });

      const user = res.data.response;
      const token = res.data.token;
      const refreshToken = res.data.refreshToken;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      const type = user.type_user.toLowerCase();

      if (type === "enseignant") {
        navigate("/teacher");
      } else if (type === "élève") {
        navigate("/student");
      } else if (type === "admin") {
        navigate("/admin");
      } else {
        toast.error("Type d'utilisateur inconnu.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (data.error) {
          toast.error(data.error);
        } else if (status === 400 && data.message) {
          toast.error(data.message);
        } else {
          toast.error(data.message || "Une erreur s'est produite.");
        }
      } else {
        toast.error("Erreur de connexion au serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5dddd] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-black">Connexion</h2>

        {/* Email */}
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            name="email"
            placeholder="Email ou Téléphone"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            name="password"
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {/* Liens */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">
            Créer un compte
          </Link>
          <Link to="/send-otp-phone" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-2 px-4 rounded-lg cursor-pointer ${
            loading ? "bg-blue-400" : "bg-blue-900 hover:bg-blue-700"
          }`}
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>

        <Link
          to="/"
          className="block text-center text-blue-600 hover:underline"
        >
          Retour
        </Link>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </div>
  );
}
