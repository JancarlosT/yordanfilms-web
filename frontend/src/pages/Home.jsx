import { Link } from "react-router-dom";
import { MessageCircle, Mail, Camera, Phone } from "lucide-react";

const trabajosCarrusel = [
  {
    id: 1,
    img: "/imagenes/equipo.jpg",
    texto: "Equipo de producción profesional",
  },
  {
    id: 2,
    img: "/imagenes/yordan4.jpg",
    texto: "Videos musicales",
  },
  {
    id: 3,
    img: "/imagenes/yordan8.jpg",
    texto: "Eventos y comerciales",
  },
];

const fotosArtistas = [
  { id: 1, img: "/imagenes/jonz.jpg", texto: "Grabación con artista local" },
  { id: 2, img: "/imagenes/nino.jpg", texto: "Detrás de cámaras" },
  { id: 3, img: "/imagenes/mariya.jpg", texto: "Sesión de video musical" },
  { id: 4, img: "/imagenes/maffio.jpg", texto: "Producción de comercial" },
];

const estadisticas = [
  { numero: "+350", texto: "Proyectos completados" },
  { numero: "+7", texto: "Años de experiencia" },
  { numero: "95%", texto: "Clientes satisfechos" },
];

export default function Home() {
  return (
    <>
      <div
        id="carruselTrabajos"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {trabajosCarrusel.map((t, i) => (
            <button
              key={t.id}
              type="button"
              data-bs-target="#carruselTrabajos"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {trabajosCarrusel.map((t, i) => (
            <div
              className={"carousel-item" + (i === 0 ? " active" : "")}
              key={t.id}
            >
              <img
                src={t.img}
                className="d-block w-100 carrusel-img"
                alt={t.texto}
              />
              <div className="carousel-caption d-none d-md-block">
                <h3>{t.texto}</h3>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carruselTrabajos"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselTrabajos"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="bg-negro text-light py-4">
        <div className="container">
          <div className="row text-center g-4">
            {estadisticas.map((e, i) => (
              <div className="col-4" key={i}>
                <h2 className="fw-bold mb-0">{e.numero}</h2>
                <small className="text-secondary">{e.texto}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-5 text-center">
            <img
              src="/imagenes/yordan11.jpg"
              alt="Jordany Minaya"
              className="rounded-circle shadow-sm"
              style={{ width: "280px", height: "280px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">Sobre mí</h2>
            <p className="fs-5 text-secondary texto-balanceado">
              Soy Jordany Minaya, director audiovisual y fundador de
              YordanFilms. Me especializo en crear videos cinematográficos para
              artistas, marcas y eventos, transformando ideas en historias con
              impacto visual.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Trabajando con talento</h2>
          <div className="row g-4">
            {fotosArtistas.map((f) => (
              <div className="col-6 col-md-3" key={f.id}>
                <img
                  src={f.img}
                  alt={f.texto}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    width: "100%",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="cta-fondo text-center text-light py-5"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <h2 className="fw-bold mb-3">¿Listo para reservar tu fecha?</h2>
        <p className="text-light mb-4">
          Solo necesitas pagar el 50% de adelanto para asegurar tu cita
        </p>
        <Link to="/agendar" className="btn btn-light btn-lg fw-bold">
          Agendar mi cita
        </Link>
      </div>

      <div className="bg-negro text-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Contactame</h2>
          <div className="row g-4 justify-content-center text-center">
            <div className="col-6 col-md-3">
              <a
                href="https://wa.me/18292027862"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                <MessageCircle size={40} />
                <p className="mb-0 mt-2">WhatsApp</p>
                <small className="text-secondary">+1 829 202 7862</small>
              </a>
            </div>

            <div className="col-6 col-md-3">
              <a
                href="mailto:yordanyminaya77@gmail.com"
                className="text-light text-decoration-none"
              >
                <Mail size={40} />
                <p className="mb-0 mt-2">Correo</p>
                <small className="text-secondary">
                  yordanyminaya77@gmail.com
                </small>
              </a>
            </div>

            <div className="col-6 col-md-3">
              <a
                href="https://instagram.com/yordanfilms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-decoration-none"
              >
                <Camera size={40} />
                <p className="mb-0 mt-2">Instagram</p>
                <small className="text-secondary">@yordanfilms</small>
              </a>
            </div>

            <div className="col-6 col-md-3">
              <a
                href="tel:+18292027862"
                className="text-light text-decoration-none"
              >
                <Phone size={40} />
                <p className="mb-0 mt-2">Telefono</p>
                <small className="text-secondary">+1 829 202 7862</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
