import 'aos/dist/aos.css';

import { useEffect } from 'react';

import AOS from 'aos';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleClick = () => {
    navigate("/auth");
  };

  return (
    <section className="bg-blue-900 text-white px-6 py-20 text-center md:text-left md:px-16">
      <div className="max-w-5xl mx-auto" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Bienvenue sur <span className="text-yellow-300">EduConnect</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          La meilleure solution numérique pour apprendre de manière autonome et
          enrichissante.
        </p>
        <button
          className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 mx-auto md:mx-0 cursor-pointer transform hover:scale-105 hover:shadow-lg"
          onClick={handleClick}
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          Commencer maintenant <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
