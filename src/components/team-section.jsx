import 'aos/dist/aos.css'; // Importez le CSS d'AOS

import React, { useEffect } from 'react';

import AOS from 'aos';

const teamMembers = [
  {
    name: "Simon Pierre SAGNO",
    role: "Développeur Node.js",
    image: "/img3.jpg",
    description: "Chef",
  },
  {
    name: "Mamadou Abdoulaye Diallo",
    role: "Etudiant en Informatique",
    image: "/img2.jpg",
    description: "Membre",
  },
  {
    name: "Mamadou Saîdou BARRY",
    role: "Etudiant en Informatique",
    image: "/img1.jpg",
    description: "Membre",
  },
  {
    name: "Facely 2 Condé",
    role: "Etudiant en Informatique",
    image: "/img4.jpg",
    description: "Membre",
  },
];

export default function TeamSection() {
  useEffect(() => {
    // Initialiser AOS après le montage du composant avec une animation continue
    AOS.init({
      duration: 1000, // Durée de l'animation
      easing: "ease-in-out", // Type de transition
      once: false, // Réexécuter l'animation chaque fois que l'élément devient visible
      offset: 100, // Décalage pour que l'animation démarre un peu avant d'atteindre le bas de l'écran
    });
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Notre Équipe Technique
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-12">
          Une équipe passionnée, prête à relever tous les défis technologiques
          pour vous offrir la meilleure expérience.
        </p>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {member.role}
              </p>
              <p className="text-gray-500 text-sm mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
