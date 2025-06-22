import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  ArrowLeft,
  Book,
  ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Code,
  FilePlus,
  Film,
  Globe,
  GraduationCap,
  Layers3,
  LogOut,
  Menu,
  PenTool,
  School,
  Trash2,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

import { logout } from '../../hooks/Logout';
import useAuthRedirect from '../../hooks/useAuthRedirect';

const CourseItem = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Gestion menu responsive
  const [menuOpen, setMenuOpen] = useState(false);

  // Séries et cours
  const [seriesList, setSeriesList] = useState([]);
  const [seriesList1, setSeriesList1] = useState([]);
  const [courses, setCourses] = useState([]);

  // Filtres et recherche
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedClass, setSelectedClass] = useState("Tout");
  const [searchTerm, setSearchTerm] = useState("");

  //Classes, niveaux et matières
  const [classes, setClasses] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [matieres, setMatieres] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Modales ajout séries et cours
  const [isSeriesFormOpen, setIsSeriesFormOpen] = useState(false);
  const [seriesFormData, setSeriesFormData] = useState({
    titre: "",
    description: "",
    classe: "",
    niveau: "",
    matiere: "",
    image: null,
  });

  const [isCoursesFormOpen, setIsCoursesFormOpen] = useState(false);
  const [coursesFormList, setCoursesFormList] = useState([
    { titre: "", duree: "", serie: "", fichier: null },
  ]);

  // Classe par catégorie pour filtre
  const classLevelsByCategories = {
    Primaire: [
      "Tout",
      "Maternelle",
      "1ère année",
      "2ème annee",
      "3ème annee",
      "4ème année",
      "5ème année",
      "6ème année",
    ],
    Collège: ["Tout", "7ème année", "8ème année", "9ème année", "10ème année"],
    Lycée: [
      "Tout",
      "11ème Série Littéraire",
      "11ème Série Scientifique",
      "12ème Série Scientifique",
      "12ème Série Littéraire",
      "Terminale Sciences Mathématiques",
      "Terminale Sciences Sociales",
      "Terminale Sciences Expérientales",
    ],
    Tout: ["Tout"],
  };

  const getAllData = async () => {
    const response = await axios.get(
      `http://localhost:4401/api/v1/course-series/by-teacher/${userInfo._id}`
    );
    setSeriesList(response.data);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:4401/api/v1/grades");
        const data = await response.data;
        setClasses(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  });

  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const response = await axios.get("http://localhost:4401/api/v1/levels");
        const data = await response.data;
        setNiveaux(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNiveaux();
  });

  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const response = await axios.get("http://localhost:4401/api/v1/levels");
        const data = await response.data;
        setNiveaux(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNiveaux();
  });
  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4401/api/v1/subjects"
        );
        const data = await response.data;
        setMatieres(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMatieres();
  });

  useEffect(() => {
    if (userInfo) {
      const fetchSeries = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4401/api/v1/course-series/by-teacher/${userInfo._id}`
          );
          const data = await response.data;
          setSeriesList(data);
        } catch (error) {
          console.log("Erreur lors de la récupération des PDFs :", error);
        }
      };

      fetchSeries();
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      const fetchSeries = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4401/api/v1/course-series/by-teacher/${userInfo._id}`
          );
          const data = await response.data;
          setSeriesList1(data);
        } catch (error) {
          console.log("Erreur lors de la récupération des PDFs :", error);
        }
      };

      fetchSeries();
    }
  }, [userInfo]);

  // Adaptation des séries reçues au format courses
  useEffect(() => {
    if (seriesList.length === 0) return;

    const adaptedCourses = seriesList.map((s) => ({
      id: s._id,
      title: s.title,
      description: s.description,
      category: s.subject_id?.name || "Sans catégorie",
      icon: "Book",
      level: s.level_id?.name || "Niveau inconnu",
      levelCategory: s.level_id?.name || "Niveau inconnu",
      classLevel: s.grade_id?.name || "Classe inconnue",
      image: `http://localhost:4401/uploads/${s.URL_Image_Miniature}`,

      url: `/teacher/course/detail/${s._id}`,
    }));

    setCourses(adaptedCourses);
    setCurrentPage(1);
  }, [seriesList]);

  // Gestion déconnexion
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };
  const handleRedirect = () => {
    navigate("/teacher");
  };

  // Gestion formulaire série
  const handleSeriesChange = (e) => {
    const { name, value, files } = e.target;
    setSeriesFormData({
      ...seriesFormData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSeriesSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", seriesFormData.titre);
    formData.append("description", seriesFormData.description);
    formData.append("grade_id", seriesFormData.classe);
    formData.append("level_id", seriesFormData.niveau);
    formData.append("teacher_id", userInfo._id);
    formData.append("subject_id", seriesFormData.matiere);
    formData.append("file", seriesFormData.image);

    try {
      const response = await axios.post(
        "http://localhost:4401/api/v1/course-series",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setIsSeriesFormOpen(false);
      setSeriesFormData({
        titre: "",
        description: "",
        classe: "",
        niveau: "",
        matiere: "",
        image: null,
      });
      toast.success("Cours série créé avec succès");
      getAllData();
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

  // Gestion formulaire cours
  const handleCoursesChange = (index, e) => {
    const { name, value, files } = e.target;
    const updated = [...coursesFormList];
    updated[index][name] = name === "fichier" ? files[0] : value;
    setCoursesFormList(updated);
  };

  const addCourseForm = () => {
    setCoursesFormList([
      ...coursesFormList,
      { titre: "", duree: "", serie: "", fichier: null },
    ]);
  };

  const removeCourseForm = (index) => {
    const updated = coursesFormList.filter((_, i) => i !== index);
    setCoursesFormList(updated);
  };

  const handleCoursesSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const coursesData = coursesFormList.map(({ titre, duree, serie }) => ({
        title_module: titre,
        duration: duree,
        course_serie_id: serie,
      }));

      formData.append("data", JSON.stringify(coursesData));

      coursesFormList.forEach(({ fichier }) => {
        if (fichier) {
          formData.append("file", fichier);
        }
      });

      const response = await axios.post(
        "http://localhost:4401/api/v1/course-modules/insertMany",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // axios le gère automatiquement mais on peut le préciser
          },
        }
      );

      setCoursesFormList([{ titre: "", duree: "", serie: "", fichier: null }]);
      setIsCoursesFormOpen(false);
      toast.success("Cours série créé avec succès");
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

  // Icones Lucide en fonction de nom
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Book":
        return <Book className="w-6 h-6 text-indigo-600" />;
      case "Code":
        return <Code className="w-6 h-6 text-blue-600" />;
      case "Globe":
        return <Globe className="w-6 h-6 text-green-600" />;
      case "Film":
        return <Film className="w-6 h-6 text-red-600" />;
      case "School":
        return <School className="w-6 h-6 text-purple-600" />;
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-teal-600" />;
      case "Users":
        return <Users className="w-6 h-6 text-orange-600" />;
      case "PenTool":
        return <PenTool className="w-6 h-6 text-pink-600" />;
      default:
        return <Book className="w-6 h-6 text-gray-500" />;
    }
  };

  // Filtrage des cours par catégorie, classe et recherche
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "Tout" || course.levelCategory === selectedCategory;

    const matchesClass =
      selectedClass === "Tout" ||
      course.classLevel?.toLowerCase() === selectedClass.toLowerCase();

    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(lowerSearch) ||
      course.description.toLowerCase().includes(lowerSearch);

    return matchesCategory && matchesClass && matchesSearch;
  });

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (page) => setCurrentPage(page);

  const levelCategories = [
    "Tout",
    "Maternelle",
    "Primaire",
    "Collège",
    "Lycée",
  ];
  const currentClassLevels = classLevelsByCategories[selectedCategory] || [
    "Tout",
  ];

  // Reset filtre classe et page quand catégorie change
  useEffect(() => {
    setSelectedClass("Tout");
    setCurrentPage(1);
  }, [selectedCategory]);

  // Reset page quand recherche ou classe change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedClass]);

  // Chargement infos utilisateur au démarrage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && Object.keys(user).length > 0) setUserInfo(user);
    } catch (error) {
      console.error("Erreur parsing user:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      {/* Navbar */}
      <nav className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-700">
              Gestion des Cours
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <div
              className={`${
                menuOpen ? "flex" : "hidden"
              } lg:flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 lg:items-center`}
            >
              <button
                onClick={handleRedirect}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                <ArrowLeft size={16} /> Retour
              </button>

              <button
                onClick={() => setIsCoursesFormOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                <FilePlus size={16} /> Ajouter un cours
              </button>

              <button
                onClick={() => setIsSeriesFormOpen(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                <Layers3 size={16} /> Ajouter une série
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          </div>

          {/* Modale Ajouter une série */}
          {isSeriesFormOpen && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border border-gray-300">
                <h2 className="text-lg font-semibold mb-4">
                  Ajouter une série
                </h2>
                <form onSubmit={handleSeriesSubmit} className="space-y-4">
                  <input
                    name="titre"
                    placeholder="Titre"
                    value={seriesFormData.titre}
                    onChange={handleSeriesChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={seriesFormData.description}
                    onChange={handleSeriesChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <select
                    name="classe"
                    value={seriesFormData.classe}
                    onChange={handleSeriesChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Classe --</option>
                    {classes.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="niveau"
                    value={seriesFormData.niveau}
                    onChange={handleSeriesChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Niveau --</option>
                    {niveaux.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="matiere"
                    value={seriesFormData.matiere}
                    onChange={handleSeriesChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-- Matière --</option>
                    {matieres.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <input
                    name="image"
                    type="file"
                    onChange={handleSeriesChange}
                    className="w-full"
                    required
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsSeriesFormOpen(false)}
                      className="px-4 py-2 border rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modale Ajouter des cours */}
          {isCoursesFormOpen && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border border-gray-300 max-h-[90vh] overflow-auto">
                <h2 className="text-lg font-semibold mb-4">
                  Ajouter des cours
                </h2>
                <form onSubmit={handleCoursesSubmit} className="space-y-4">
                  {coursesFormList.map((course, index) => (
                    <div key={index} className="border p-4 rounded-md relative">
                      <input
                        name="titre"
                        placeholder="Titre du cours"
                        value={course.titre}
                        onChange={(e) => handleCoursesChange(index, e)}
                        required
                        className="w-full px-3 py-2 border rounded-md mb-2"
                      />
                      <input
                        name="duree"
                        placeholder="Durée"
                        value={course.duree}
                        onChange={(e) => handleCoursesChange(index, e)}
                        required
                        className="w-full px-3 py-2 border rounded-md mb-2"
                      />
                      <select
                        name="serie"
                        value={course.serie}
                        onChange={(e) => handleCoursesChange(index, e)}
                        required
                        className="w-full px-3 py-2 border rounded-md mb-2"
                      >
                        <option value="">-- Série --</option>
                        {seriesList1.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                      <input
                        name="fichier"
                        type="file"
                        onChange={(e) => handleCoursesChange(index, e)}
                        required
                        className="w-full"
                      />
                      {coursesFormList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCourseForm(index)}
                          className="absolute top-2 right-2 text-red-600"
                          aria-label="Supprimer ce cours"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCourseForm}
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <FilePlus size={16} /> Ajouter un cours
                  </button>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsCoursesFormOpen(false)}
                      className="px-4 py-2 border rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md flex-1"
        >
          {levelCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 border rounded-md flex-1"
        >
          {currentClassLevels.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md flex-2"
        />
      </div>

      {/* Liste des cours */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentCourses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Aucun cours trouvé.
          </p>
        ) : (
          currentCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-2">
                {renderIcon(course.icon)}
                <h3 className="text-lg font-semibold">{course.title}</h3>
              </div>
              <p className="text-sm text-gray-600 flex-grow">
                {course.description}
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>Niveau: {course.level}</p>
                <p>Classe: {course.classLevel}</p>
              </div>
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Voir plus
              </a>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-3">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeftIcon size={18} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </div>
  );
};

export default CourseItem;
