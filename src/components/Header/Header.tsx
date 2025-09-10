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
        <div className="nav-link-container">
          <div className="nav-link">Home</div>
          <div className="nav-link">Contacto</div>
        </div>
        <div className="favourites" onClick={() => navigate("/favourites", {})}>
          <h2>Favoritos ⭐</h2>
        </div>
      </div>
    </>
  );
}
