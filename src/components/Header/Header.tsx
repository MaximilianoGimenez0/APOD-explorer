import "./Header.css";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router";
import { FaHistory, FaHeart, FaInfoCircle, FaCompass } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  return (
    <header className="header glass-panel">
      <div className="header-container">
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img className="brand-logo" src={logo} alt="APOD Logo" />
          <h2 className="brand-name">APOD<span className="brand-accent">explorer</span></h2>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-link ${isActive('/home') ? 'active' : ''}`} 
            onClick={() => navigate("/home")}
          >
            Inicio
          </button>
          <button 
            className={`nav-link ${isActive('/discover') ? 'active' : ''}`} 
            onClick={() => navigate("/discover")}
          >
            <FaCompass className="nav-icon" /> Descubrir
          </button>
          <button 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
            onClick={() => navigate("/contact")}
          >
            <FaInfoCircle className="nav-icon" /> Acerca de
          </button>
        </nav>

        <div className="action-links">
          <button 
            className={`action-btn ${isActive('/history') ? 'active' : ''}`} 
            onClick={() => navigate("/history")}
            aria-label="Historial"
            title="Historial"
          >
            <FaHistory />
          </button>
          <button 
            className={`action-btn action-btn-primary ${isActive('/favourites') ? 'active' : ''}`} 
            onClick={() => navigate("/favourites")}
          >
            <FaHeart className="btn-icon" /> Favoritos
          </button>
        </div>
      </div>
    </header>
  );
}
