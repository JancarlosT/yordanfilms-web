import { useState } from "react";

export default function VideoYoutube({ videoId, titulo }) {
  const [reproduciendo, setReproduciendo] = useState(false);

  // YouTube genera automaticamente una miniatura para cada video con esta URL
  const miniatura = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (reproduciendo) {
    return (
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={titulo}
          allowFullScreen
          allow="autoplay"
          style={{ border: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      className="ratio ratio-16x9 position-relative"
      role="button"
      onClick={() => setReproduciendo(true)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={miniatura}
        alt={titulo}
        className="w-100 h-100"
        style={{ objectFit: "cover" }}
        loading="lazy"
      />
      <div
        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center rounded-circle"
        style={{ width: "60px", height: "60px", backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderLeft: "16px solid white",
            marginLeft: "4px",
          }}
        />
      </div>
    </div>
  );
}