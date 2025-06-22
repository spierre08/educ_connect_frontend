import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

const CourseDetailPageTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [itemCourseSerie, setIitemCourseSerie] = useState({
    _id: "",
    titre: "",
    description: "",
    classe: "",
    niveau: "",
    matiere: "",
    professeur: "",
    email: "",
    phone: "",
  });

  useState(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4401/api/v1/course-series/${id}`
        );

        const data = response.data;
        setIitemCourseSerie({
          _id: data._id,
          titre: data?.title,
          description: data?.description,
          classe: data?.grade_id.name,
          niveau: data?.level_id.name,
          matiere: data?.subject_id.name,
          professeur: data?.teacher_id.full_name,
          phone: data?.teacher_id.phone,
          email: data?.teacher_id.email,
        });
      } catch (error) {
        navigate("/teacher/course");
        console.log(error);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4401/api/v1/course-modules/by-course-serie/${id}`
        );

        setCourses(response.data);
      } catch (error) {
        navigate("/teacher/course");
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  console.log(itemCourseSerie);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Header du cours */}
      <header className="bg-gray-900 text-white p-6 md:p-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{itemCourseSerie.titre}</h1>
          <p className="mt-4 text-sm opacity-80">
            Classe: {itemCourseSerie.classe}
          </p>
          <p className="mt-4 text-sm opacity-80">
            Niveau: {itemCourseSerie.niveau}
          </p>
          <Link to={"/teacher/course"} className="underline mt-4">Retour</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:flex md:gap-8">
        <section className="md:flex-grow">
          {/* Ce que vous allez apprendre */}
          <div className="bg-white rounded-md shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Ce que vous allez apprendre
            </h2>
            <p>{itemCourseSerie.description}</p>
          </div>

          {/* Contenu du cours */}
          <div className="bg-white rounded-md shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contenu du cours</h2>
            {courses.length > 0 ? (
              <ul className="mt-2 pl-4 text-gray-700">
                {courses.map((element, index) => (
                  <li key={index} className="py-1">
                    <span>{element.title_module}</span>
                    <blockquote>Durée:{element.duration}</blockquote>
                    <Link
                      to={`http://localhost:4401/video/${element.url_course}`}
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Lire
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun élément trouvé.</p>
            )}
          </div>
        </section>

        {/* Colonne droite : instructeur */}
        <aside className="md:w-1/3 bg-white rounded-md shadow p-6 sticky top-6 h-max">
          <h2 className="text-2xl font-semibold mb-4">Instructeur</h2>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-indigo-600">
                {itemCourseSerie.professeur}
              </h3>
              <p className="text-gray-600">{itemCourseSerie.email}</p>
              <p className="text-gray-600">{itemCourseSerie.phone}</p>
            </div>
          </div>
          <p>
            <strong>Cours: {itemCourseSerie.matiere}</strong>
          </p>
        </aside>
      </main>
    </div>
  );
};

export default CourseDetailPageTeacher;
