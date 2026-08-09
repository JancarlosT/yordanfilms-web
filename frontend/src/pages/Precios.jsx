import TarjetaPlan from "../components/TarjetaPlan";

const bodas = [
  {
    nombre: "BÁSICO",
    precio: "US$500",
    items: ["Cobertura de 4 horas", "Video resumen (3–5 minutos)", "Tomas cinematográficas", "Audio profesional", "Entrega digital"],
  },
  {
    nombre: "REGULAR",
    precio: "US$900",
    destacado: true,
    items: ["Cobertura de 8 horas", "Video cinematográfico (5–8 minutos)", "Reel vertical para redes", "Grabación con dron (si el lugar y clima lo permiten)", "Entrega digital"],
  },
  {
    nombre: "PREMIUM",
    precio: "US$1,500",
    items: ["Cobertura completa del día", "Highlight cinematográfico", "Película de la boda (20–40 minutos)", "Reel para redes", "Tomas con dron", "Segunda cámara", "Entrega en USB personalizado"],
  },
];

const videosMusicales = [
  {
    nombre: "BÁSICO",
    precio: "US$350",
    items: ["1 locación", "Hasta 3 horas de grabación", "Edición profesional", "Color cinematográfico"],
  },
  {
    nombre: "REGULAR",
    precio: "US$700",
    destacado: true,
    items: ["2–3 locaciones", "Hasta 6 horas de grabación", "Dirección creativa", "Tomas con estabilizador", "Color grading profesional"],
  },
  {
    nombre: "PREMIUM",
    precio: "US$1,200+",
    items: ["Varias locaciones", "Producción completa", "Dirección cinematográfica", "Iluminación profesional", "Dron (si aplica)", "Edición avanzada con efectos"],
  },
];

const eventos = [
  {
    nombre: "BÁSICO",
    precio: "US$250",
    items: ["Cobertura de 2 horas", "Video resumen de 1–2 minutos", "Entrega digital"],
  },
  {
    nombre: "REGULAR",
    precio: "US$450",
    destacado: true,
    items: ["Cobertura de 4 horas", "Video resumen de 2–4 minutos", "Tomas cinematográficas", "Fotografías opcionales"],
  },
  {
    nombre: "PREMIUM",
    precio: "US$800",
    items: ["Cobertura de 6–8 horas", "Video highlight", "Reel para redes sociales", "Segunda cámara", "Tomas con dron (si aplica) y fotos"],
  },
];

const fotografia = [
  {
    nombre: "BASIC",
    precio: "US$95",
    items: ["5 fotos digitales en alta resolución", "Edición profesional"],
  },
  {
    nombre: "PROFESSIONAL",
    precio: "US$160",
    destacado: true,
    items: ["10 fotos digitales en alta resolución", "Edición profesional", "5 impresiones 4x6"],
  },
  {
    nombre: "PREMIUM",
    precio: "US$290",
    items: ["15 fotos digitales en alta resolución", "Edición profesional", "5 impresiones 8x10", "3 impresiones 4x6", "1 cuadro decorativo 16x20"],
  },
];

function Categoria({ emoji, titulo, planes }) {
  return (
    <div className="mb-5">
      <h2 className="text-center fw-bold mb-4">
        {emoji} {titulo}
      </h2>
      <div className="row g-4">
        {planes.map((p) => (
          <div className="col-md-4 d-flex" key={p.nombre}>
            <TarjetaPlan {...p} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Precios() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-2">Nuestras tarifas</h1>
      <p className="text-center text-secondary mb-5">
        Reserva tu fecha con el 50% de adelanto
      </p>

      <Categoria emoji="💍" titulo="Bodas" planes={bodas} />
      <Categoria emoji="🎵" titulo="Videos Musicales" planes={videosMusicales} />
      <Categoria emoji="🎉" titulo="Eventos y Actividades" planes={eventos} />
      <Categoria emoji="📸" titulo="Paquetes de Fotografía" planes={fotografia} />

      <div className="text-center text-secondary mt-5 pt-4 border-top">
        <p className="mb-1">⏱ Entrega digital rápida</p>
        <p className="mb-0">➕ Fotos adicionales disponibles con costo extra</p>
      </div>
    </div>
  );
}