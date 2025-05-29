import 'aos/dist/aos.css';

import React, {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import axios from 'axios';
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserGraduate,
} from 'react-icons/fa';

export default function StatsSection() {
  const [teacherCount, setTeacherCount] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [resourceCount, setResourceCount] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchStats = async () => {
      try {
        const [teacherRes, studentRes, resourceRes] = await Promise.all([
          axios.get("http://localhost:4401/api/v1/users/count-by-teacher"),
          axios.get("http://localhost:4401/api/v1/users/count-by-student"),
          axios.get("http://localhost:4401/api/v1/courses/count-documents"),
        ]);

        setTeacherCount(teacherRes.data);
        setStudentCount(studentRes.data);
        setResourceCount(resourceRes.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques :",
          error
        );
        setTeacherCount(0);
        setStudentCount(0);
        setResourceCount(0);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Élèves inscrits",
      value: studentCount !== null ? studentCount : "...",
      icon: <FaUserGraduate className="text-3xl text-blue-800" />,
    },
    {
      label: "Ressources disponibles",
      value: resourceCount !== null ? resourceCount : "...",
      icon: <FaBookOpen className="text-3xl text-green-700" />,
    },
    {
      label: "Enseignants actifs",
      value: teacherCount !== null ? teacherCount : "...",
      icon: <FaChalkboardTeacher className="text-3xl text-purple-700" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10"
          data-aos="fade-up"
        >
          Une bibliothèque numérique au service de tous
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-600 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
