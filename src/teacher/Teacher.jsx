import 'aos/dist/aos.css';

import React, {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import axios from 'axios';
import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import {
  MdPictureAsPdf,
  MdPlayCircleFilled,
} from 'react-icons/md';
import { TbMenuDeep } from 'react-icons/tb';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

import { logout } from '../hooks/logout';
import useAuthRedirect from '../hooks/useAuthRedirect';

export default function DashboardProfesseur() {
  useAuthRedirect();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // Pour stocker les données de l'utilisateur
  const [ressourcesPDF, setRessourcesPDF] = useState([]);
  const [ressourceVideo, setRessoucesVideo] = useState([]);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("all"); //Faire un système par document par vidéo
  const [searchTerm, setSearchTerm] = useState(""); // Pour faire un système de rechercher
  const [level, setLevel] = useState([]);
  const [subject, setSubject] = useState([]);
  const [grade, setGrade] = useState([]);

  const [form, setForm] = useState({
    title: "",
    level_id: "",
    subject_id: "",
    grade_id: "",
    file_type: "document", // ou "vidéo"
    description: "",
    author_id: "",
  });
  const [file, setFile] = useState(null);

  const filterResources = (resources) => {
    return resources.filter(
      (item) =>
        item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.matiere.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(6); // Nombre de fichiers PDF par page
  // const [loading, setLoading] = useState(false);

  const [currentPage1, setCurrentPage1] = useState(1);
  const [filesPerPage1] = useState(6); // Nombre de fichiers video par page
  // const [loading1, setLoading1] = useState(false);

  const filteredPDF = filterResources(ressourcesPDF);
  const filteredVideos = filterResources(ressourceVideo);

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredPDF.slice(indexOfFirstFile, indexOfLastFile);

  const indexOfLastFile1 = currentPage1 * filesPerPage1;
  const indexOfFirstFile1 = indexOfLastFile1 - filesPerPage1;
  const currentFiles1 = filteredVideos.slice(
    indexOfFirstFile1,
    indexOfLastFile1
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= Math.ceil(ressourcesPDF.length / filesPerPage)) {
      setCurrentPage(page);
    }
  };

  const handlePageChange1 = (page) => {
    if (page >= 1 && page <= Math.ceil(ressourceVideo.length / filesPerPage1)) {
      setCurrentPage1(page);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion
    navigate("/auth"); // Rediriger vers la page de connexion
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Utilisation du useEffect pour récupérer les PDFs
  useEffect(() => {
    if (userInfo) {
      const fetchPDFs = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4401/api/v1/courses/by-author-and-file-type`,
            {
              params: {
                author_id: userInfo._id, // Utilisation de userInfo._id comme ID de l'auteur
                file_type: "document",
              },
            }
          );
          // Vérifier la réponse et adapter selon la structure de la réponse
          const pdfs = response.data || [];
          setRessourcesPDF(
            pdfs.map((pdf, index) => ({
              id: index + 1,
              titre: pdf.title || "Sans titre",
              fichierUrl: `http://localhost:4401/api/v1/storage/${pdf.url}`,
              classe: pdf.grade_id.name,
              matiere: pdf.subject_id.name,
            }))
          );
        } catch (error) {
          setError("Erreur lors de la récupération des PDFs");
          console.error("Erreur lors de la récupération des PDFs :", error);
        }
      };

      fetchPDFs();
    }
  }, [userInfo]); // La dépendance ici garantit que le useEffect se déclenche à chaque fois que userInfo change

  // Utilisation du useEffect pour récupérer les vidéos
  useEffect(() => {
    if (userInfo) {
      const fetchPDFs = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4401/api/v1/courses/by-author-and-file-type`,
            {
              params: {
                author_id: userInfo._id, // Utilisation de userInfo._id comme ID de l'auteur
                file_type: "vidéo",
              },
            }
          );
          // Vérifier la réponse et adapter selon la structure de la réponse
          const videos = response.data || [];
          setRessoucesVideo(
            videos.map((video, index) => ({
              id: index + 1,
              titre: video.title || "Sans titre",
              videoUrl: `http://localhost:4401/video/${video.url}`,
              classe: video.grade_id.name,
              matiere: video.subject_id.name,
            }))
          );
        } catch (error) {
          setError("Erreur lors de la récupération des PDFs");
          console.error("Erreur lors de la récupération des PDFs :", error);
        }
      };

      fetchPDFs();
    }
  }, [userInfo]); // La dépendance ici garantit que le useEffect se déclenche à chaque fois que userInfo change

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo || !userInfo._id) {
      console.error("Utilisateur non connecté.");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("level_id", form.level_id);
    data.append("subject_id", form.subject_id);
    data.append("grade_id", form.grade_id);
    data.append("file_type", form.file_type);
    data.append("description", form.description);
    data.append("author_id", userInfo._id); // ✅ sécurisé
    if (file) {
      data.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:4401/api/v1/courses",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Ressources créée avec succès");
      setShowModal(false);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.error(data.message || "Une erreur s'est produite.");
        }
      } else {
        toast.error("Erreur de connexion au serveur.");
      }
    }
  };

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await axios.get("http://localhost:4401/api/v1/levels");

        setLevel(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLevel();
  }, []);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4401/api/v1/subjects"
        );

        setSubject(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubject();
  }, []);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const response = await axios.get("http://localhost:4401/api/v1/grades");

        setGrade(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGrade();
  }, []);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user")); // Récupérer les données de l'utilisateur
    if (user) {
      setUserInfo(user); // Si les données de l'utilisateur sont présentes, les stocker dans l'état userInfo
    }
  }, []);

  if (!userInfo) {
    return;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (ressourcesPDF.length === 0) {
    return;
  }

  if (ressourceVideo.length === 0) {
    return;
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <nav className="bg-base-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Espace Professeur</h1>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#messages"
            className="btn btn-link text-lg text-secondary hover:text-primary"
            to={"/teacher/forum"}
          >
            Forum
          </Link>
          <Link
            href="#messages"
            className="btn btn-link text-lg text-secondary hover:text-primary"
            to={"/teacher/course"}
          >
            Mes séries de cours
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-link text-lg text-secondary hover:text-primary"
          >
            Ajouter une ressource
          </button>
          <button onClick={handleLogout} className="btn btn-dash btn-primary">
            Déconnexion
          </button>
        </div>

        {/* Menu Toggle Button Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer"
          >
            {menuOpen ? <FaTimes size={24} /> : <TbMenuDeep size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile animé */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-base-100 shadow-md p-4 flex flex-col gap-1.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              className="btn btn-link text-lg text-secondary hover:text-primary"
              onClick={() => setMenuOpen(false)}
              to={"/teacher/forum"}
            >
              Forum
            </Link>
            <Link
              className="btn btn-link text-lg text-secondary hover:text-primary"
              onClick={() => setMenuOpen(false)}
              to={"/teacher/cours"}
            >
              Mes séries de cours
            </Link>
            <button
              onClick={() => {
                setShowModal(true);
                setMenuOpen(false);
              }}
              className="btn btn-link text-lg text-secondary hover:text-primary"
            >
              Ajouter une ressource
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="btn btn-dash btn-primary"
            >
              Déconnexion
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal pour ajout de ressource */}
      {showModal && (
        <div className="fixed inset-0 bg-[#f2f2f2] bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Ajouter une nouvelle ressource
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Titre"
                name="title"
                className="input input-bordered w-full"
                required
                onChange={handleChange}
              />
              <select
                name="level_id"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Choisir le niveau</option>
                {level.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                name="subject_id"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Choisir la matière</option>
                {subject.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                name="grade_id"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Choisir une classe</option>
                {grade.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                name="file_type"
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Choisir le type fichier</option>
                <option value="vidéo">Vidéo</option>
                <option value="document">Document</option>
              </select>

              <input
                type="file"
                placeholder="Veuillez choisir un fichier"
                className="file-input file-input-md input-bordered w-full"
                accept=".pdf, .mp4"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
              <textarea
                className="textarea input-bordered w-full"
                placeholder="Description"
                required
                name="description"
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="btn btn-primary w-full">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Corps de page */}
      <main className="p-4 md:p-8 space-y-10">
        {/* Infos professeur */}
        <section
          className="bg-base-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6"
          data-aos="fade-up"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-primary">
              {userInfo.full_name || "Nom non renseigné"}
            </h2>
            <p className="text-base text-secondary">
              {userInfo.email || "Email non renseigné"}
            </p>
            <p className="text-sm text-muted mt-2">
              {userInfo?.type_user === "enseignant" ? "Enseignant" : ""}
            </p>
          </div>
        </section>

        {/* Filter par document ou par vidéo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="w-full md:w-1/3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">Tous les types</option>
              <option value="pdf">Documents PDF</option>
              <option value="video">Vidéos</option>
            </select>
          </div>

          <div className="w-full md:w-2/3">
            <input
              type="text"
              placeholder="Rechercher par titre, matière ou classe..."
              className="input input-bordered w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Vidéos */}
        {(filterType === "all" || filterType === "video") && (
          <section data-aos="fade-up">
            <h3 className="text-2xl font-bold mt-10 mb-4">Vidéos</h3>
            {currentFiles1.length === 0 ? (
              <p>Aucune vidéo trouvée.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFiles1.map((file) => (
                  <div key={file.id} className="bg-white p-4 rounded shadow">
                    <MdPlayCircleFilled
                      size={48}
                      className="text-blue-500 mb-2"
                    />
                    <h4 className="text-lg font-semibold">{file.titre}</h4>
                    <p className="text-sm">Classe : {file.classe}</p>
                    <p className="text-sm">Matière : {file.matiere}</p>
                    <a
                      href={file.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Voir la vidéo
                    </a>
                  </div>
                ))}
              </div>
            )}

            <div className="pagination mt-4">
              <button
                onClick={() => handlePageChange1(currentPage1 - 1)}
                disabled={currentPage1 === 1}
                className="btn btn-sm"
              >
                Précédent
              </button>
              <span className="mx-2">
                Page {currentPage1} sur{" "}
                {Math.ceil(ressourceVideo.length / filesPerPage1)}
              </span>
              <button
                onClick={() => handlePageChange1(currentPage1 + 1)}
                disabled={
                  currentPage1 ===
                  Math.ceil(ressourceVideo.length / filesPerPage1)
                }
                className="btn btn-sm"
              >
                Suivant
              </button>
            </div>
          </section>
        )}

        {/* PDF */}
        {(filterType === "all" || filterType === "pdf") && (
          <section data-aos="fade-up">
            <h3 className="text-2xl font-bold mb-4">Documents PDF</h3>
            {currentFiles.length === 0 ? (
              <p>Aucun document trouvé.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFiles.map((file) => (
                  <div key={file.id} className="bg-white p-4 rounded shadow">
                    <MdPictureAsPdf size={48} className="text-red-500 mb-2" />
                    <h4 className="text-lg font-semibold">{file.titre}</h4>
                    <p className="text-sm">Classe : {file.classe}</p>
                    <p className="text-sm">Matière : {file.matiere}</p>
                    <a
                      href={file.fichierUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Ouvrir
                    </a>
                  </div>
                ))}
              </div>
            )}
            <div className="pagination mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-sm"
              >
                Précédent
              </button>
              <span className="mx-2">
                Page {currentPage} sur{" "}
                {Math.ceil(ressourcesPDF.length / filesPerPage)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(ressourcesPDF.length / filesPerPage)
                }
                className="btn btn-sm"
              >
                Suivant
              </button>
            </div>
          </section>
        )}
      </main>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </div>
  );
}
