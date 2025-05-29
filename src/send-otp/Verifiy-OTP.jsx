import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import axios from 'axios';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone;

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toast.error("Veuillez entrer un code OTP valide (4 chiffres).");
      return;
    }

    if (!phone) {
      toast.error("Numéro de téléphone manquant !");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4401/api/v1/auth/verify-otp",
        {
          phone,
          otp,
        }
      );

      if (data && data._id) {
        toast.success("OTP vérifié avec succès !");

        setTimeout(() => {
          navigate("/auth/reset-password", {
            state: { userId: data._id }, // On transmet l'ID ici
          });
        }, 1000);
      } else {
        toast.error("OTP incorrect ou utilisateur non trouvé.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur de vérification OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Vérification OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-lg font-medium text-gray-700"
            >
              Entrez le code OTP
            </label>
            <input
              type="text"
              id="otp"
              maxLength="4"
              value={otp}
              onChange={handleChange}
              className="input input-bordered w-full mt-2 text-center"
              placeholder="Entrez le code OTP"
            />
          </div>
          <button
            type="submit"
            className={`btn w-full mt-4 ${
              loading ? "btn-disabled bg-blue-300" : "btn-primary"
            }`}
            disabled={loading}
          >
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/send-otp-phone"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Renvoyer le code
          </Link>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={4000} hideProgressBar />
    </div>
  );
};

export default OTPPage;
