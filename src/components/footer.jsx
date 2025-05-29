export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
      <aside className="flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-12 h-12 mb-3 rounded-full"
        />
        <p className="font-bold text-center">
          Hakhaton
          <br />
          Réalisé par Code Warriors Equipe GN 38
        </p>
        <p>Copyright © {new Date().getFullYear()} - Tous droits réservés</p>
      </aside>
    </footer>
  );
}
