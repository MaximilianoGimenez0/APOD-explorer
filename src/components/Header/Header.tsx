import "./Header.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div className="logo" onClick={() => navigate("/", {})}>
          <img className="brand-logo" src={logo} alt="brand-logo" />
          <h2>DESCUBRI-2</h2>
        </div>

        <hr className="divisor" />

        <div className="nav-link-container">
          <div className="nav-link">
            <p className="nav-link-text">HOME</p>
          </div>
          <div className="nav-link">
            <p className="nav-link-text">DESCUBRIR</p>
          </div>
          <div className="nav-link last-link">
            <p className="nav-link-text">CONTACTO</p>
          </div>
        </div>

        <hr className="divisor" />

        <div className="favourites" onClick={() => navigate("/favourites", {})}>
          <h2>Favoritos ♥️</h2>
        </div>
      </div>
    </>
  );
}
