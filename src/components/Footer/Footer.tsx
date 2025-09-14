import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="brand">DESCUBRI-2</p>
        <p className="author">Desarrollado por Maximiliano Giménez</p>
        <p className="rights">© 2025 Todos los derechos reservados</p>

        <div className="socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
