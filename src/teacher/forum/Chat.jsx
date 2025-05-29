import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

export default function ChatProfessionnels1() {
  const { id: receiverId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Pour éviter le rendu pendant vérif
  const receiver = location.state?.user;

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      setLoading(false);
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  // Fonction pour charger les messages
  const loadMessages = async () => {
    if (currentUser && receiverId) {
      try {
        const res = await axios.get(
          `http://localhost:4401/api/v1/messages/${currentUser._id}/${receiverId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Erreur chargement messages :", err);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadMessages();
    }
  }, [currentUser, receiverId]);

  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      loadMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentUser, receiverId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = {
      sender_id: currentUser._id,
      receiver_id: receiverId,
      message: message.trim(),
    };
    try {
      await axios.post("http://localhost:4401/api/v1/messages", newMessage);
      setMessage("");
      await loadMessages();
    } catch (err) {
      console.error("Erreur envoi message :", err);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  // Suppression avec confirmation toast personnalisée
  const handleDeleteMessage = (messageId) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col space-y-2">
          <span>Voulez-vous supprimer ce message ?</span>
          <div className="flex justify-end space-x-2">
            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:4401/api/v1/messages/${messageId}`
                  );
                  toast.dismiss(); // Ferme le toast de confirmation
                  toast.success("Message supprimé !");
                  await loadMessages();
                } catch (err) {
                  toast.dismiss();
                  toast.error("Échec de la suppression !");
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              Annuler
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  if (loading) return <div className="p-4 text-center">Chargement...</div>;

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Toast Container */}
      <ToastContainer position="top-center" />

      {/* Header */}
      <div className="navbar bg-base-200 shadow-md">
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/teacher/forum")}
        >
          ← Retour
        </button>
        <h1 className="text-xl font-bold ml-2">
          Discussion avec {receiver?.full_name || "Utilisateur"}
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-base-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat ${
              msg.sender_id === currentUser?._id ? "chat-end" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                msg.sender_id === currentUser?._id
                  ? "bg-blue-500 text-white relative"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
              {/* Bouton suppression seulement pour ses messages */}
              {msg.sender_id === currentUser?._id && (
                <button
                  onClick={() => handleDeleteMessage(msg._id || msg.id)} // Selon ta clé id
                  className="absolute top-0 right-0 m-1 text-xs text-red-100 hover:text-red-300"
                  title="Supprimer le message"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-base-200">
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Écrire un message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
