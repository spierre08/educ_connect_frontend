import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 6;

export default function RessourcesPage() {
  const [recherche, setRecherche] = useState("");
  const [filtreClasse, setFiltreClasse] = useState("all");
  const [pageActuelle, setPageActuelle] = useState(1);
  const [ressourcesData, setRessourcesData] = useState([]);
  const [ongletActif, setOngletActif] = useState("pdf"); // onglet actif : 'pdf' ou 'video'

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4401/api/v1/courses/get-course-by-grade/maternelle,1ère année,2ème année,3ème année,4ème année,6ème année"
        );

        const data = response.data || [];
        setRessourcesData(
          data.map((item, index) => {
            const extension = item.url.split(".").pop().toLowerCase();
            let type = "autre";
            if (["mp4", "mov", "avi"].includes(extension)) {
              type = "vidéo";
            } else if (extension === "pdf") {
              type = "pdf";
            }

            return {
              id: index + 1,
              titre: item.title || "Sans titre",
              url: item.url,
              classe: item.grade_id?.name || "Inconnue",
              matiere: item.subject_id?.name || "Inconnue",
              niveau: item.level_id?.name || "Inconnu",
              auteur: item.author_id?.full_name || "Anonyme",
              description: item.description,
              type,
            };
          })
        );
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          toast.error(data?.error || data?.message || "Erreur serveur");
          if (status === 500) toast.error("Erreur interne du serveur");
        } else {
          toast.error("Erreur de connexion au serveur.");
        }
      }
    };

    fetchAll();
  }, []);

  const ressourcesFiltrées = ressourcesData.filter(
    (res) =>
      res.type === ongletActif &&
      (filtreClasse === "all" || res.classe === filtreClasse) &&
      res.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  const totalPages = Math.ceil(ressourcesFiltrées.length / ITEMS_PER_PAGE);
  const ressourcesAffichées = ressourcesFiltrées.slice(
    (pageActuelle - 1) * ITEMS_PER_PAGE,
    pageActuelle * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPageActuelle(newPage);
  };

  const changerOnglet = (type) => {
    setOngletActif(type);
    setPageActuelle(1); // Réinitialiser à la première page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Ressources éducatives
      </h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un titre..."
          className="border rounded px-4 py-2 w-full"
          value={recherche}
          onChange={(e) => {
            setRecherche(e.target.value);
            setPageActuelle(1);
          }}
        />

        <select
          className="border rounded px-4 py-2 w-full"
          value={filtreClasse}
          onChange={(e) => {
            setFiltreClasse(e.target.value);
            setPageActuelle(1);
          }}
        >
          <option value="all">Toutes les classes</option>
          <option value="maternelle">Maternelle</option>
          <option value="1ère année">1ère année</option>
          <option value="2ème année">2ème année</option>
          <option value="3ème année">3ème année</option>
          <option value="4ème année">4ème année</option>
        </select>
      </div>

      {/* Menu navigation PDF / Vidéo */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => changerOnglet("pdf")}
          className={`px-6 py-2 rounded ${
            ongletActif === "pdf" ? "bg-blue-900 text-white" : "bg-gray-200"
          }`}
        >
          PDF
        </button>
        <button
          onClick={() => changerOnglet("vidéo")}
          className={`px-6 py-2 rounded ${
            ongletActif === "vidéo" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Vidéo
        </button>
      </div>

      {/* Liste des ressources */}
      {ressourcesAffichées.length === 0 ? (
        <p className="text-center text-gray-500">Aucune ressource trouvée.</p>
      ) : ongletActif === "pdf" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ressourcesAffichées.map((res) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: res.id * 0.05 }}
              layout
              className="bg-white p-4 shadow rounded"
            >
              <h3 className="text-lg font-semibold mb-2">{res.titre}</h3>
              <p className="text-gray-600 mb-4">Classe: {res.classe}</p>
              <p className="text-gray-600 mb-4">
                Description: {res.description}
              </p>
              <a
                href={`http://localhost:4401/api/v1/storage/${res.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Voir le PDF
              </a>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {ressourcesAffichées.map((res) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: res.id * 0.05 }}
              layout
              className="bg-white p-4 shadow rounded"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={`http://localhost:4401/video/${res.url}`}
                  className="w-full h-full border-0 rounded"
                  allowFullScreen
                  title={res.titre}
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 mt-4">{res.titre}</h3>
              <p className="text-gray-600 mb-4">Classe: {res.classe}</p>
              <p className="text-gray-600 mb-4">
                Description: {res.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(pageActuelle - 1)}
            disabled={pageActuelle === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {pageActuelle} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageActuelle + 1)}
            disabled={pageActuelle === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
