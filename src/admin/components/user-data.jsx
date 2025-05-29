import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaUserEdit,
} from 'react-icons/fa';

const UserManager = ({ usersData }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = usersData.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(filtered);
  }, [search, usersData]);

  const openModal = (user) => {
    // Normalisation de l'id, on crée _id s'il n'existe pas
    const normalizedUser = {
      ...user,
      _id: user._id || user.id,
    };
    setSelectedUser(normalizedUser);
    setRole(normalizedUser.type_user || normalizedUser.role || "");
    document.getElementById("role_modal").showModal();
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedUser._id) {
      alert("Erreur : utilisateur sélectionné invalide.");
      return;
    }

    setLoading(true);

    try {
      console.log("Patch user", selectedUser._id, "type_user:", role);
      await axios.patch(
        `http://localhost:4401/api/v1/users/${selectedUser._id}`,
        {
          type_user: role,
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id || u.id === selectedUser._id
            ? { ...u, type_user: role }
            : u
        )
      );

      document.getElementById("role_modal").close();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle :", error);
      if (error.response) {
        alert(
          "Erreur lors de la mise à jour : " +
            JSON.stringify(error.response.data)
        );
      } else {
        alert("Erreur réseau ou autre problème : " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 m mx-auto w-full">
      {/* Recherche */}
      <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="grow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Liste utilisateurs */}
      <div className="space-y-4 w-full">
        {users.map((user) => (
          <motion.div
            key={user._id || user.id}
            className="p-4 bg-base-100 rounded-xl shadow-md flex justify-between items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">{user.phone}</p>
              <p className="text-sm badge badge-info">
                {user.type_user || user.role || "Aucun"}
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => openModal(user)}
            >
              <FaUserEdit className="mr-1" /> Modifier
            </button>
          </motion.div>
        ))}
      </div>

      {/* MODAL pour modifier le rôle */}
      <dialog id="role_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Modifier le rôle de{" "}
            <span className="text-primary">{selectedUser?.name}</span>
          </h3>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Sélectionner un rôle</option>
            <option value="admin">Admin</option>
            <option value="enseignant">Enseignant</option>
            <option value="élève">Élève</option>
            <option value="aucun">Aucun</option>
          </select>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button
                type="button"
                onClick={handleUpdateRole}
                disabled={loading}
                className={`btn btn-primary ${loading ? "loading" : ""}`}
              >
                Sauvegarder
              </button>
              <button className="btn btn-ghost" disabled={loading}>
                Annuler
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserManager;
