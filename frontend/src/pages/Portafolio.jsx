import { Link } from "react-router-dom";
import { categorias } from "../data/portafolioData";

export default function Portafolio() {
  return (
    <>
      {/* Hero con fondo desenfocado */}
      <div
        className="cta-fondo text-center text-light py-5"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <h1 className="fw-bold mb-2">Portafolio</h1>
        <p className="fs-5 text-light">
          Explora nuestro trabajo por categoría
        </p>
      </div>

      {/* Tarjetas de categorías */}
      <div className="container py-5">
        <div className="row g-4">
          {Object.entries(categorias).map(([slug, cat]) => (
            <div className="col-md-6" key={slug}>
              <Link to={`/portafolio/${slug}`} className="text-decoration-none">
                <div
                  className="rounded shadow-sm position-relative overflow-hidden"
                  style={{ height: "300px" }}
                >
                  <img
                    src={cat.imagenPortada}
                    alt={cat.titulo}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-4 text-light"
                    style={{
                      background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                    }}
                  >
                    <h3 className="fw-bold mb-0">{cat.titulo}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}