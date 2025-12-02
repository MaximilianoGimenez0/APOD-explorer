import { FaGithub } from "react-icons/fa6";
import "./Footer.css";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="brand">DESCUBRI-2</p>
        <p className="author">Desarrollado por Maximiliano Giménez</p>
        <p className="rights">© 2025 Todos los derechos reservados</p>

        <div className="socials">
          <a
            href="https://github.com/MaximilianoGimenez0"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://wa.me/5491140675852"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/maximiliano-gim%C3%A9nez-2644b0338/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
