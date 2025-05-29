import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import useAuthRedirect from '../hooks/useAuthRedirect';
import ClassManager from './components/class';
import MenuAdmin from './components/menu';

export default function AdminClasse() {
  useAuthRedirect();

  const [userInfo, setUserInfo] = useState(null); // Pour stocker les données de l'utilisateur
  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const navigate = useNavigate();

  if (!userInfo) {
    navigate("/auth");
    return null;
  }
  return (
    <div className="bg-[#f6e8e8]">
      <MenuAdmin />

      <main className="p-4 md:p-8 space-y-10">
        <ClassManager />
      </main>
    </div>
  );
}
