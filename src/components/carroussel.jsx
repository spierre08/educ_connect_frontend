import 'aos/dist/aos.css';

import {
  useEffect,
  useState,
} from 'react';

import AOS from 'aos';
import {
  FaQuoteLeft,
  FaQuoteRight,
} from 'react-icons/fa';

const testimonials = [
    {
        name: "Fatou Diallo",
        message: "Une plateforme incroyable qui m'a permis de suivre mes cours en toute simplicité.",
        role: "Élève",
    },
    {
        name: "Mamadou Bah",
        message: "L'équipe est très réactive et l'interface très agréable à utiliser.",
        role: "Professeur",
    },
    {
        name: "Aïssatou Camara",
        message: "Service client au top ! Je recommande vivement.",
        role: "Parent d'élève",
    },
];

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const { name, message, role } = testimonials[current];

    return (
        <div className='p-2'>
            <h1 className='text-center text-3xl font-bold mt-[30px]'>Les témoignages</h1>
            <div className="w-full py-10 px-4 flex justify-center items-center">
                <div
                    className="max-w-xl bg-white p-6 rounded-xl shadow-lg text-center space-y-4"
                    data-aos="flip-left"
                    key={current} // ← permet à AOS de relancer l'animation à chaque changement
                >
                    <FaQuoteLeft className="text-blue-500 text-3xl mx-auto" />
                    <p className="text-gray-700 italic">"{message}"</p>
                    <FaQuoteRight className="text-blue-500 text-3xl mx-auto" />

                    <div>
                        <h3 className="font-bold text-lg text-blue-800">{name}</h3>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full ${index === current ? "bg-blue-600" : "bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
