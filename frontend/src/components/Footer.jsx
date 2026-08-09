export default function Footer() {
  return (
    <footer className="bg-negro text-light py-5 mt-5">
      <div className="container text-center">
        <h5 className="fw-bold mb-2">YordanFilms</h5>
        <p className="text-secondary mb-1">
          Fotografía y video cinematográfico — Bodas, videos musicales y eventos
        </p>
        <small className="text-secondary">
          © {new Date().getFullYear()} YordanFilms — Todos los derechos reservados
        </small>
      </div>
    </footer>
  );
}