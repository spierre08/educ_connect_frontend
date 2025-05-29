import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  FaBook,
  FaUserGraduate,
  FaUserTie,
} from 'react-icons/fa';

const StatCard = ({ icon: Icon, label, count, color }) => (
  <div className="bg-base-200 p-6 rounded-xl shadow flex items-center gap-4">
    <div className={`p-3 rounded-full ${color} text-white text-xl`}>
      <Icon />
    </div>
    <div>
      <h3 className="text-xl font-bold">{count}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  </div>
);

const DashboardStats = () => {
  const [stats, setStats] = useState({
    enseignants: 0,
    eleves: 0,
    ressources: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [teacherRes, studentRes, docRes] = await Promise.all([
          axios.get("http://localhost:4401/api/v1/users/count-by-teacher"),
          axios.get("http://localhost:4401/api/v1/users/count-by-student"),
          axios.get("http://localhost:4401/api/v1/courses/count-documents"),
        ]);

        // Chaque response.data est un entier directement
        setStats({
          enseignants: teacherRes.data,
          eleves: studentRes.data,
          ressources: docRes.data,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={FaUserTie}
          label="Enseignants"
          count={stats.enseignants}
          color="bg-blue-500"
        />
        <StatCard
          icon={FaUserGraduate}
          label="Élèves"
          count={stats.eleves}
          color="bg-green-500"
        />
        <StatCard
          icon={FaBook}
          label="Ressources"
          count={stats.ressources}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
