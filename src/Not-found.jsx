import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-secondary mt-4">Page non trouvée</p>
        <p className="text-sm text-muted mt-2">
          Désolé, la page que vous cherchez n'existe pas.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="btn btn-primary text-white px-6 py-3 rounded-lg hover:bg-primary-focus"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
