import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaPlus,
  FaSearch,
} from 'react-icons/fa';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

const SubjectManager = () => {
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ nom: "" });

  // Fonction pour récupérer les matières depuis l'API
  const fetchSubjects = () => {
    axios
      .get("http://localhost:4401/api/v1/subjects")
      .then((response) => {
        // On récupère les vrais ids et noms
        const formattedSubjects = response.data.map((item) => ({
          id: item._id, // Assure-toi que ton API retourne bien 'id' ici
          nom: item.name,
        }));
        setSubjects(formattedSubjects);
      })
      .catch((error) => {
        toast.error("Erreur lors du chargement des matières.");
      });
  };

  useEffect(() => {
    fetchSubjects();

    const interval = setInterval(() => {
      fetchSubjects();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filtrage à chaque recherche ou mise à jour des matières
    if (search) {
      setFilteredSubjects(
        subjects.filter((s) =>
          s.nom.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredSubjects(subjects);
    }
  }, [search, subjects]);

  // Ajout d'une nouvelle matière
  const handleAddSubject = () => {
    if (!newSubject.nom) return;

    axios
      .post("http://localhost:4401/api/v1/subjects", { name: newSubject.nom })
      .then((res) => {
        const added = { id: res.data._id, nom: res.data.name };
        setSubjects((prev) => [...prev, added]);
        setNewSubject({ nom: "" });
        setIsModalOpen(false);
        toast.success("Matière ajoutée avec succès !");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 500) {
            toast.error(err.response.data.error);
          } else if (err.response.data && err.response.data.error) {
            toast.error(err.response.data.error);
          } else {
            toast.error("Une erreur est survenue.");
          }
        } else {
          toast.error(
            "Impossible de contacter le serveur. Vérifiez votre connexion."
          );
        }
      });
  };

  // Suppression d'une matière
  const handleDeleteSubject = (id) => {
    axios
      .delete(`http://localhost:4401/api/v1/subjects/${id}`)
      .then(() => {
        setSubjects((prev) => prev.filter((subject) => subject.id !== id));
        toast.success("Matière supprimée avec succès !");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Erreur lors de la suppression.");
        }
      });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold">Gestion des matières</h2>
        <button
          className="btn btn-success flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Ajouter une matière
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Barre de recherche */}
        <label className="input input-bordered flex items-center gap-2 mb-6 w-full max-w-md">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une matière"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow"
          />
        </label>

        {/* Liste des matières */}
        <div className="space-y-4">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <motion.div
                key={subject.id}
                className="p-4 bg-base-200 rounded-xl shadow flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-bold">{subject.nom}</h3>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeleteSubject(subject.id)}
                >
                  Supprimer
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">Aucune matière trouvée.</p>
          )}
        </div>
      </div>

      {/* MODALE Ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Ajouter une matière</h3>

            <input
              type="text"
              placeholder="Nom de la matière"
              className="input input-bordered w-full mb-6"
              value={newSubject.nom}
              onChange={(e) =>
                setNewSubject((prev) => ({ ...prev, nom: e.target.value }))
              }
            />

            <div className="flex justify-end gap-4">
              <button
                className="btn btn-primary"
                onClick={handleAddSubject}
                disabled={!newSubject.nom}
              >
                Ajouter
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
            </div>
          </motion.div>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeButton
          />
        </div>
      )}
    </>
  );
};

export default SubjectManager;
