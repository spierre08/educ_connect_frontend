import 'aos/dist/aos.css';

import {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import axios from 'axios';
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

const niveaux = ["Tous", "Maternelle", "Primaire", "Collège", "Lycée"];

const classes = [
  "Toutes",
  "1ère année",
  "2ème année",
  "3ème année",
  "4ème année",
  "5ème année",
  "6ème année",
  "7ème année",
  "8ème année",
  "9ème année",
  "10ème année",
  "11ème Série Littéraire",
  "11ème Série Scientifique",
  "12ème Série Littéraire",
  "Terminale Sciences Expérientales",
  "Terminale Sciences Sociales",
];

export default function DashboardEleve() {
  useAuthRedirect();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState(null); // Pour stocker les données de l'utilisateur
  const [niveauFiltre, setNiveauFiltre] = useState("Tous");
  const [videoPage, setVideoPage] = useState(1);
  const [pdfPage, setPdfPage] = useState(1);
  const [ongletActif, setOngletActif] = useState("videos");
  const [ressourcesVideos, setRessoucesVideos] = useState([]);
  const [ressourcesPDF, setRessourcesPDF] = useState([]);
  const [classeFiltre, setClasseFiltre] = useState("Toutes");

  const itemsPerPage = 6;

  const filtreCombiné = (ressource) =>
    ressource.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (niveauFiltre === "Tous" || ressource.niveau === niveauFiltre) &&
    (classeFiltre === "Toutes" || ressource.classe === classeFiltre);

  const filteredVideos = ressourcesVideos.filter(filtreCombiné);
  const filteredPDFs = ressourcesPDF.filter(filtreCombiné);

  const paginatedVideos = filteredVideos.slice(
    (videoPage - 1) * itemsPerPage,
    videoPage * itemsPerPage
  );
  const paginatedPDFs = filteredPDFs.slice(
    (pdfPage - 1) * itemsPerPage,
    pdfPage * itemsPerPage
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion
    navigate("/auth"); // Rediriger vers la page de connexion
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4401/api/v1/courses/by-file-type/vidéo"
        );

        // Vérifier la réponse et adapter selon la structure de la réponse
        const videos = response.data || [];
        setRessoucesVideos(
          videos.map((video, index) => ({
            id: index + 1,
            titre: video.title || "Sans titre",
            videoUrl: `http://localhost:4401/video/${video.url}`,
            classe: video.grade_id.name,
            matiere: video.subject_id.name,
            niveau: video.level_id.name,
            auteur: video.author_id.full_name,
          }))
        );
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          if (data.error) {
            toast.error(data.error);
          } else if (status === 500) {
            toast.error("Erreur interne du serveur");
          } else {
            toast.error(data.message || "Une erreur s'est produite.");
          }
        } else {
          toast.error("Erreur de connexion au serveur.");
        }
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4401/api/v1/courses/by-file-type/vidéo"
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
            niveau: pdf.level_id.name,
            auteur: pdf.author_id.full_name,
          }))
        );
      } catch (error) {
        if (error.response) {
          const { data, status } = error.response;
          if (data.error) {
            toast.error(data.error);
          } else if (status === 500) {
            toast.error("Erreur interne du serveur");
          } else {
            toast.error(data.message || "Une erreur s'est produite.");
          }
        } else {
          toast.error("Erreur de connexion au serveur.");
        }
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    // Récupérer les données de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem("user")); // Récupérer les données de l'utilisateur
    if (user) {
      setUserInfo(user); // Si les données de l'utilisateur sont présentes, les stocker dans l'état userInfo
    }
  }, []);

  useEffect(() => {
    AOS.init(); // Initialisation d'AOS
  }, []);

  if (!userInfo) {
    return;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <nav className="bg-base-100 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Espace élève</h1>

        <div className="hidden md:flex items-center gap-6">
          {/* <a
            href="#forum"
            className="btn btn-link text-lg text-secondary hover:text-primary"
          >
            Forum
          </a> */}
          <Link
            to={"/student/forum"}
            className="btn btn-link text-lg text-secondary hover:text-primary"
          >
            Forum
          </Link>
          <button onClick={handleLogout} className="btn btn-dash btn-primary">
            Déconnexion
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <TbMenuDeep size={24} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile animé */}
      <div
        className={`md:hidden bg-base-100 shadow-md p-4 flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden transform ${
          menuOpen
            ? "max-h-40 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* <a
          href="#forum"
          className="btn btn-link text-lg text-secondary hover:text-primary"
        >
          Forum
        </a> */}
        <Link
          to={"/student/forum"}
          className="btn btn-link text-lg text-secondary hover:text-primary"
        >
          Forum
        </Link>
        <button onClick={handleLogout} className="btn btn-dash btn-primary">
          Déconnexion
        </button>
      </div>

      <main className="p-4 md:p-8 space-y-10">
        {/* Prof info */}
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
              {userInfo?.type_user === "élève" ? "Elève" : ""}
            </p>
          </div>
        </section>

        {/* Recherche + Filtrage */}
        <div className="flex flex-col sm:flex-col md:flex-row flex-wrap justify-center items-stretch gap-3 md:gap-4 w-full">
          <input
            type="text"
            placeholder="🔍 Rechercher une ressource..."
            className="input input-bordered w-full sm:w-full md:max-w-md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVideoPage(1);
              setPdfPage(1);
            }}
          />

          <select
            className="select select-bordered w-full sm:w-full md:w-auto min-w-[150px]"
            value={niveauFiltre}
            onChange={(e) => {
              setNiveauFiltre(e.target.value);
              setVideoPage(1);
              setPdfPage(1);
            }}
          >
            {niveaux.map((niveau) => (
              <option key={niveau} value={niveau}>
                {niveau}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full sm:w-full md:w-auto min-w-[150px]"
            value={classeFiltre}
            onChange={(e) => {
              setClasseFiltre(e.target.value);
              setVideoPage(1);
              setPdfPage(1);
            }}
          >
            {classes.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>
        </div>

        {/* Onglets */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className={`btn ${
              ongletActif === "videos" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setOngletActif("videos")}
          >
            🎥 Vidéos
          </button>
          <button
            className={`btn ${
              ongletActif === "pdf" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setOngletActif("pdf")}
          >
            📄 PDFs
          </button>
        </div>

        {/* Vidéos */}
        {ongletActif === "videos" && (
          <section data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              🎥 Mes Vidéos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVideos.map((video, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-xl rounded-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg text-primary">
                      {video.titre}
                    </h4>
                    <span className="badge badge-info">{video.duree}</span>
                  </div>
                  <span className="text-sm text-muted">
                    Niveau : {video.niveau}
                  </span>
                  <p>Classe: {video.classe}</p>
                  <p>Auteur: {video.auteur}</p>
                  <a
                    href={video.videoUrl}
                    className="btn btn-outline btn-sm mt-2 flex items-center gap-2 hover:bg-primary hover:text-white"
                  >
                    <MdPlayCircleFilled /> Regarder
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-sm"
                disabled={videoPage === 1}
                onClick={() => setVideoPage(videoPage - 1)}
              >
                ← Précédent
              </button>
              <span className="text-sm font-medium">Page {videoPage}</span>
              <button
                className="btn btn-sm"
                disabled={videoPage * itemsPerPage >= filteredVideos.length}
                onClick={() => setVideoPage(videoPage + 1)}
              >
                Suivant →
              </button>
            </div>
          </section>
        )}

        {/* PDFs */}
        {ongletActif === "pdf" && (
          <section data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              📄 Mes PDFs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPDFs.map((pdf, index) => (
                <div
                  key={index}
                  className="card bg-base-100 shadow-xl rounded-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300"
                  data-aos="zoom-in"
                  data-aos-delay="250"
                >
                  <h4 className="font-semibold text-lg text-primary">
                    {pdf.titre}
                  </h4>
                  <span className="text-sm text-muted">
                    Niveau : {pdf.niveau}
                  </span>
                  <p>Classe: {pdf.classe}</p>
                  <p>Auteur: {pdf.auteur}</p>
                  <a
                    href={pdf.fichierUrl}
                    className="btn btn-outline btn-sm mt-2 flex items-center gap-2 hover:bg-primary hover:text-white"
                  >
                    <MdPictureAsPdf /> Visualiser
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-sm"
                disabled={pdfPage === 1}
                onClick={() => setPdfPage(pdfPage - 1)}
              >
                ← Précédent
              </button>
              <span className="text-sm font-medium">Page {pdfPage}</span>
              <button
                className="btn btn-sm"
                disabled={pdfPage * itemsPerPage >= filteredPDFs.length}
                onClick={() => setPdfPage(pdfPage + 1)}
              >
                Suivant →
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
