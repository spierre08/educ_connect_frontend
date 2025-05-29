import React from 'react';

import { motion } from 'framer-motion';

// Animation d'entrée (fade + slide from bottom)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export default function AboutElement() {
  return (
    <motion.section
      className="min-h-screen bg-white text-gray-800 py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="max-w-5xl mx-auto">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold mb-6 text-blue-900">
          À propos de EduConnect
        </h1>

        {/* Introduction adaptée aux zones rurales */}
        <p className="mb-6 text-lg leading-relaxed">
          EduConnect est une initiative technologique visant à réduire les
          inégalités d'accès à l'éducation dans les zones rurales. Grâce à des
          outils simples, accessibles même sans connexion haut débit, nous
          permettons aux élèves, parents et enseignants de bénéficier d'un
          contenu éducatif de qualité.
        </p>

        {/* Notre mission sociale */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-800">
          Notre mission
        </h2>
        <p className="mb-6 leading-relaxed">
          Apporter une solution éducative inclusive qui répond aux réalités des
          communautés rurales : manque de manuels, absence d'internet stable,
          faible encadrement pédagogique. EduConnect met à disposition des
          ressources numériques accessibles hors ligne et adaptées aux
          programmes scolaires locaux.
        </p>

        {/* Ce qui nous distingue dans un contexte rural */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-800">
          Pourquoi EduConnect en milieu rural ?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Accès aux cours même en l'absence d'internet (mode hors ligne
            disponible).
          </li>
          <li>
            Interface simple, pensée pour les utilisateurs peu familiarisés avec
            la technologie.
          </li>
          <li>Contenus légers optimisés pour les appareils bas de gamme.</li>
          <li>
            Formation des enseignants et sensibilisation des parents dans les
            villages.
          </li>
        </ul>

        {/* Équipe engagée pour les zones isolées */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-800">
          Notre équipe
        </h2>
        <p className="mb-6 leading-relaxed">
          EduConnect est porté par une équipe pluridisciplinaire de bénévoles,
          enseignants ruraux, développeurs et associations locales. Ensemble,
          nous travaillons à connecter les enfants des villages les plus isolés
          à l’éducation du XXIe siècle.
        </p>
      </div>
    </motion.section>
  );
}
