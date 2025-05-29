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

const ClassManager = () => {
  const [grades, setGrades] = useState([]);
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [levels, setLevels] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({ name: "", level: "" });

  // Récupérer les niveaux
  useEffect(() => {
    axios
      .get("http://localhost:4401/api/v1/levels")
      .then((res) => setLevels(res.data))
      .catch((err) => console.error("Erreur récupération niveaux :", err));
  }, []);

  // Récupérer les classes
  useEffect(() => {
    axios
      .get("http://localhost:4401/api/v1/grades")
      .then((res) => {
        setGrades(res.data);
        setFilteredGrades(res.data);
      })
      .catch((err) => console.error("Erreur récupération classes :", err));
  }, []);

  // Filtrer selon recherche et niveau sélectionné
  useEffect(() => {
    let result = grades;

    if (selectedLevel) {
      result = result.filter((g) => g.level_id?._id === selectedLevel);
    }

    if (search) {
      result = result.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Tri alphabétique
    result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredGrades(result);
  }, [search, selectedLevel, grades]);

  // Ajouter une classe
  const handleAddGrade = async () => {
    if (!newGrade.name || !newGrade.level) return;

    try {
      const res = await axios.post("http://localhost:4401/api/v1/grades", {
        name: newGrade.name,
        level_id: newGrade.level,
      });

      const created = res.data;
      setGrades((prev) => [...prev, created]);
      setNewGrade({ name: "", level: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur ajout classe :", error);
      alert("Erreur lors de l'ajout de la classe.");
    }
  };

  const handleDeleteGrade = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette classe ?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4401/api/v1/grades/${id}`);
      setGrades((prev) => prev.filter((grade) => grade._id !== id));
      toast.success("Classe supprimée avec succès !");
    } catch (error) {
      console.error("Erreur suppression classe :", error);
      toast.error("Erreur lors de la suppression de la classe.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold">Gestion des classes</h2>
        <button
          className="btn btn-success flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Ajouter une classe
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            className="select select-bordered"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Filtrer par niveau</option>
            {levels.map((lvl) => (
              <option key={lvl._id} value={lvl._id}>
                {lvl.name}
              </option>
            ))}
          </select>

          <label className="input input-bordered flex items-center gap-2 flex-grow max-w-md">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une classe"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow"
            />
          </label>
        </div>

        {/* Liste des classes */}
        <div className="space-y-4">
          {filteredGrades.length > 0 ? (
            filteredGrades.map(({ _id, name, level_id }) => (
              <motion.div
                key={_id}
                className="p-4 bg-base-200 rounded-xl shadow flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="text-sm text-gray-600">
                    {level_id?.name || "Niveau inconnu"}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteGrade(_id)}
                  className="btn btn-error btn-sm"
                >
                  Supprimer
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">Aucune classe trouvée.</p>
          )}
        </div>
      </div>

      {/* Modale ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Ajouter une classe</h3>

            <input
              type="text"
              placeholder="Nom de la classe"
              className="input input-bordered w-full mb-4"
              value={newGrade.name}
              onChange={(e) =>
                setNewGrade((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <select
              className="select select-bordered w-full mb-6"
              value={newGrade.level}
              onChange={(e) =>
                setNewGrade((prev) => ({ ...prev, level: e.target.value }))
              }
            >
              <option value="">Choisir un niveau</option>
              {levels.map((lvl) => (
                <option key={lvl._id} value={lvl._id}>
                  {lvl.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-4">
              <button
                className="btn btn-primary"
                onClick={handleAddGrade}
                disabled={!newGrade.name || !newGrade.level}
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
        </div>
      )}
    </>
  );
};

export default ClassManager;
