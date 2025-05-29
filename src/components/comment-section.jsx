import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import axios from 'axios';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function CommentSection() {
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 100,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        await axios.post("http://localhost:4401/api/v1/comments", {
          user_name: "Anonyme",
          comment: comment,
        });

        setIsSubmitted(true);
        setComment("");
        setTimeout(() => setIsSubmitted(false), 3000);
      } catch (error) {
        // Gérer les erreurs personnalisées venant du backend (status 500 inclus)
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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
          toast.error(error.response.data.message);
        }
      }
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Laissez votre commentaire
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-12">
          Partagez vos impressions ou vos suggestions pour améliorer notre
          bibliothèque numérique.
        </p>
        <div
          data-aos="fade-up"
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md sm:shadow-lg w-full max-w-md sm:max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Votre commentaire..."
              rows="4"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm sm:text-base transition duration-300 cursor-pointer"
            >
              Soumettre le commentaire
            </button>
          </form>

          {isSubmitted && (
            <div className="mt-4 text-green-600 font-semibold text-sm sm:text-base">
              Merci pour votre commentaire ! Nous l'apprécions beaucoup.
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </section>
  );
}
