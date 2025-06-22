import { useEffect } from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { toast } from 'react-toastify';

function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !refreshToken || !user) {
      navigate("/auth");
      return;
    }

    // Vérification du chemin pour éviter redirection inutile
    const currentPath = location.pathname;

    if (user.type_user === "enseignant" && !currentPath.startsWith("/teacher")) {
      navigate("/teacher");
    } else if (user.type_user === "élève" && !currentPath.startsWith("/student")) {
      navigate("/student");
    } else if (user.type_user === "admin" && !currentPath.startsWith("/admin")) {
      toast.info("Vous êtes connecté en tant qu'administrateur");
    } else if (!["enseignant", "élève", "admin"].includes(user.type_user)) {
      localStorage.clear();
      navigate("/auth");
    }
  }, [navigate, location]);

  return null;
}

export default useAuthRedirect;
