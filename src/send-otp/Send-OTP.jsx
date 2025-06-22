import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';

import axios from 'axios';
import { Mail } from 'lucide-react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function SendOTPByPhone() {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Pour rediriger

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Veuillez saisir votre adresse mail !");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4401/api/v1/auth/send-otp-by-email",
        { email: formData.email }
      );

      console.log(response.data);
      

      toast.success(`OTP envoyé au ${formData.email}`);

      // Rediriger après un court délai pour laisser le toast s'afficher
      setTimeout(() => {
        navigate("/verify-otp", { state: { phone: response.data.user.phone } });
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else if (error.response && error.response.status === 400) {
        toast.error(
          error.response.data.message ||
            "Des erreurs de validation sont survenues."
        );
      } else if (error.response && error.response.status === 502) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#e5dddd]">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
            Entrez votre adresse mail pour recevoir un OTP
          </h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Adresse mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Mail className="text-xl" />
              </span>
              <input
                type="text"
                placeholder="monemail@exemple.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-2 rounded-lg transition-colors duration-200`}
          >
            {loading ? "Envoi en cours..." : "Envoyer OTP"}
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-blue-600">
            <Link to="/auth" className="hover:underline">
              Se connecter
            </Link>
            <Link to="/register" className="hover:underline">
              Créer un compte ?
            </Link>
          </div>
        </div>
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
