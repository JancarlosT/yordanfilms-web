import { useParams, Link } from "react-router-dom";
import { categorias } from "../data/portafolioData";
import VideoYoutube from "../components/VideoYoutube";

export default function PortafolioCategoria() {
  const { slug } = useParams();
  const categoria = categorias[slug];

  if (!categoria) {
    return (
      <div className="container py-5 text-center">
        <h2>Categoría no encontrada</h2>
        <Link to="/portafolio" className="btn btn-dark mt-3">
          Volver al portafolio
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/portafolio" className="text-decoration-none text-secondary">
        ← Volver al portafolio
      </Link>
      <h1 className="fw-bold mt-3 mb-5">{categoria.titulo}</h1>

      <div className="row g-4">
        {categoria.trabajos.map((t) => (
          <div className="col-md-4" key={t.id}>
            <div className="card shadow-sm">
              {t.tipo === "youtube" ? (
                <VideoYoutube videoId={t.videoId} titulo={t.titulo} />
              ) : t.tipo === "video" ? (
                <video
                  src={t.video}
                  className="card-img-top"
                  controls
                  style={{ backgroundColor: "#000" }}
                />
              ) : (
                <img
                  src={t.img}
                  className="card-img-top"
                  alt={t.titulo}
                  loading="lazy"
                />
              )}
              <div className="card-body">
                <h6 className="mb-0">{t.titulo}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}