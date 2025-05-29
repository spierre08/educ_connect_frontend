import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !refreshToken || !user) {
      // Si l'utilisateur n'est pas connecté
      navigate("/auth");
      return;
    }

    // Vérification du type d'utilisateur pour rediriger
    switch (user.type_user) {
      case "enseignant":
        navigate("/teacher");
        break;
      case "élève":
        navigate("/student");
        break;
      case "admin":
        toast.info("Vous êtes connecté en tant qu'administrateur");
        break;
      default:
        // Si l'utilisateur a un rôle inconnu
        localStorage.clear();
        navigate("/auth");
        break;
    }
  }, [navigate]);

  return null; // Ce hook ne retourne rien, il gère la redirection
}

export default useAuthRedirect;
