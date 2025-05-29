import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserList2() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Pour stocker les données de l'utilisateur

  useEffect(() => {
    axios
      .get("http://localhost:4401/api/v1/users")
      .then((res) => {
        setUsers(res.data); // suppose que res.data est un tableau d'utilisateurs
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des utilisateurs :", error);
        setLoading(false);
      });
  }, []);

  const handleUserSelect = (user) => {
    navigate(`/student/forum/chat/${user._id}`, { state: { user } });
  };

  // Exclure les utilisateurs dont type_user === "aucun"
  const filteredUsers =
    filter === "all"
      ? users.filter((user) => user.type_user !== "aucun")
      : users.filter((user) => user.type_user === filter);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  if (!userInfo) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Bouton retour */}
      <button
        onClick={() => navigate("/student")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Retour
      </button>

      <h1 className="text-2xl font-bold text-center mb-6">
        Choisissez un utilisateur
      </h1>

      {/* Barre de filtre */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          className={`px-4 py-2 rounded-full font-medium border ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border-blue-600"
          }`}
          onClick={() => setFilter("all")}
        >
          Tous
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium border ${
            filter === "enseignant"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border-green-600"
          }`}
          onClick={() => setFilter("enseignant")}
        >
          Enseignants
        </button>
        <button
          className={`px-4 py-2 rounded-full font-medium border ${
            filter === "élève"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600 border-purple-600"
          }`}
          onClick={() => setFilter("élève")}
        >
          Élèves
        </button>
      </div>

      {/* Liste des utilisateurs */}
      <div className="max-w-md mx-auto space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500">Aucun utilisateur trouvé.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-lg px-6 py-4 flex justify-between items-center hover:bg-blue-50 cursor-pointer transition"
              onClick={() => handleUserSelect(user)}
            >
              <div>
                <span className="text-lg font-semibold text-gray-800">
                  {user.full_name}
                </span>
                <p className="text-sm text-gray-500 capitalize">
                  {user.type_user}
                </p>
              </div>
              <button className="text-blue-600 hover:underline">
                Discuter
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
