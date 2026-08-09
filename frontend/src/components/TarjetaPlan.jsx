export default function TarjetaPlan({ nombre, precio, items, destacado }) {
  return (
    <div className={"card h-100 p-4" + (destacado ? " border-dark border-2" : "")}>
      {destacado && (
        <span className="badge bg-dark align-self-start mb-2">Más popular</span>
      )}
      <h5 className="fw-bold">{nombre}</h5>
      <h2 className="fw-bold mb-3">{precio}</h2>
      <ul className="list-unstyled flex-grow-1">
        {items.map((item, i) => (
          <li key={i} className="mb-2">
            <span className="me-2">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}