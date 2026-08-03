import "./Header.css";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router";
import { FaHistory, FaHeart, FaInfoCircle, FaCompass, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateAndClose = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header glass-panel">
      <div className="header-container">
        <div className="logo-container" onClick={() => navigate("/home")}>
          <img className="brand-logo" src={logo} alt="APOD Logo" />
          <h2 className="brand-name">APOD<span className="brand-accent">explorer</span></h2>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`nav-link ${isActive('/home') ? 'active' : ''}`} 
            onClick={() => navigateAndClose("/home")}
          >
            Inicio
          </button>
          <button 
            className={`nav-link ${isActive('/discover') ? 'active' : ''}`} 
            onClick={() => navigateAndClose("/discover")}
          >
            <FaCompass className="nav-icon" /> Descubrir
          </button>
          <button 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
            onClick={() => navigateAndClose("/contact")}
          >
            <FaInfoCircle className="nav-icon" /> Acerca de
          </button>
        </nav>

        <div className={`action-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`action-btn ${isActive('/history') ? 'active' : ''}`} 
            onClick={() => navigateAndClose("/history")}
            aria-label="Historial"
            title="Historial"
          >
            <FaHistory />
          </button>
          <button 
            className={`action-btn action-btn-primary ${isActive('/favourites') ? 'active' : ''}`} 
            onClick={() => navigateAndClose("/favourites")}
          >
            <FaHeart className="btn-icon" /> Favoritos
          </button>
        </div>
      </div>
    </header>
  );
}
