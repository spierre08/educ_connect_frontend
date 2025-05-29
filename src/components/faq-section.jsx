import { useState } from 'react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Puis-je utiliser la bibliothèque sans connexion Internet ?",
      answer:
        "Oui, la plateforme fonctionne en mode hors ligne pour accéder aux ressources téléchargées localement via mobile.",
    },
    {
      question: "La plateforme est-elle accessible sur mobile ?",
      answer:
        "Oui, l'application est responsive et adaptée à tous les écrans, y compris les smartphones et tablettes.",
    },
    {
      question: "Quels types de ressources sont disponibles ?",
      answer:
        "Des livres, articles, documents PDF, vidéos pédagogiques, et plus encore, classés par niveau et matière.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Questions Fréquemment Posées
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg bg-white shadow">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-4 text-gray-800 font-medium hover:bg-gray-100"
              >
                <span>{faq.question}</span>
                <span className="text-xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`${
                  activeIndex === index
                    ? "max-h-96 opacity-100 transition-all duration-500 ease-in-out"
                    : "max-h-0 opacity-0 transition-all duration-500 ease-in-out"
                } px-6 pb-4 text-gray-600 overflow-hidden`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
