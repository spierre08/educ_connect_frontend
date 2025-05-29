import {
  FaBook,
  FaMobileAlt,
  FaUsers,
  FaWifi,
} from 'react-icons/fa';

export default function AvantagesRuraux() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-900">
          Pensée pour les zones rurales
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Notre solution s'adapte aux réalités locales : pas besoin d'internet
          constant pour accéder à la connaissance. Elle favorise l'autonomie
          éducative dans les communautés éloignées.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaWifi className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Accessible sans internet
            </h3>
            <p className="text-gray-700 text-sm">
              Fonctionne en local sans connexion, idéal pour les zones mal
              desservies.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Pour toute la communauté
            </h3>
            <p className="text-gray-700 text-sm">
              Conçue pour servir écoles, centres communautaires et bibliothèques
              de village.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaMobileAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Utilisable sur simple appareil
            </h3>
            <p className="text-gray-700 text-sm">
              Interface légère et intuitive, utilisable même sur de vieux
              ordinateurs ou smartphones.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Ressources riches et variées
            </h3>
            <p className="text-gray-700 text-sm">
              Livres, fiches pédagogiques, supports audio-visuels adaptés aux
              programmes locaux.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
