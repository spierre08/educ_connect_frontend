import 'aos/dist/aos.css';

import { useEffect } from 'react';

import AOS from 'aos';

export default function PromoSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Texte avec animation */}
        <div data-aos="fade-right">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Une bibliothèque numérique moderne et accessible
          </h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Gérez efficacement vos ressources documentaires. Notre plateforme
            fonctionne aussi bien en local qu'en ligne pour répondre aux besoins
            des établissements scolaires, communautaires.
          </p>
          <button className="bg-blue-900 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-800 transition">
            En savoir plus
          </button>
        </div>

        {/* Image avec animation */}
        <div className="flex justify-center w-full" data-aos="fade-left">
          <div className="mockup-phone border-primary transform scale-90 sm:scale-100 max-w-xs sm:max-w-sm md:max-w-md">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display p-0">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/login.png"
                  alt="Aperçu de la bibliothèque numérique"
                  className="object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
