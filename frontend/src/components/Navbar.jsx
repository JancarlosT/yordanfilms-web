import { NavLink } from "react-router-dom";
import { imgUrl } from "../utils/imgUrl"; 

export default function Navbar() {
  const linkClase = ({ isActive }) => "nav-link" + (isActive ? " fw-bold" : "");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-3">
      <div className="container">
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <img
            src={`${import.meta.env.BASE_URL}imagenes/logo.png`}
            alt="YordanFilms"
            style={{
              height: "60px",
              maxHeight: "60px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          YordanFilms
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className={linkClase} to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClase} to="/precios">
                Precios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClase} to="/portafolio">
                Portafolio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="btn btn-light ms-lg-3 mt-2 mt-lg-0"
                to="/agendar"
              >
                Agendar
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
