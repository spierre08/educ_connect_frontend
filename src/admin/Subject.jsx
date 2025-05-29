import {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import useAuthRedirect from '../hooks/useAuthRedirect';
import MenuAdmin from './components/menu';
import SubjectManagerData from './components/subject';

export default function AdminSubject() {
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
        <SubjectManagerData />
      </main>
    </div>
  );
}
