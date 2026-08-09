import { useState, useEffect } from "react";
import { api } from "../api/client";

const HORAS = Array.from({ length: 12 }, (_, i) => i + 1); // 1 a 12
const MINUTOS = ["00", "15", "30", "45"];

export default function Agendar() {
  const [servicios, setServicios] = useState([]);
  const [categoriaElegida, setCategoriaElegida] = useState("");
  const [servicioIdElegido, setServicioIdElegido] = useState("");

  const [form, setForm] = useState({
    cliente_nombre: "",
    cliente_email: "",
    cliente_telefono: "",
    fecha: "",
    notas: "",
  });

  const [hora12, setHora12] = useState("1");
  const [minuto, setMinuto] = useState("00");
  const [periodo, setPeriodo] = useState("AM");

  const [citaCreada, setCitaCreada] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [pagando, setPagando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.listarServicios().then(setServicios).catch((err) => console.error(err));
  }, []);

  // Lista de categorias unicas, sacada de los servicios que trae el backend
  const categorias = [...new Set(servicios.map((s) => s.categoria))];

  // Los planes (Basico/Regular/Premium) de la categoria que el usuario eligio
  const planesDeLaCategoria = servicios.filter((s) => s.categoria === categoriaElegida);

  const servicioSeleccionado = servicios.find((s) => s.id === Number(servicioIdElegido));

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Convierte hora 12h (ej: 7, 30, PM) a formato 24h "19:30" para el backend
  const hora24 = () => {
    let h = Number(hora12);
    if (periodo === "PM" && h !== 12) h += 12;
    if (periodo === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minuto}`;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!servicioIdElegido) {
      setError("Elige una categoria y un plan");
      return;
    }

    setEnviando(true);
    try {
      const nueva = await api.crearCita({
        ...form,
        servicio_id: Number(servicioIdElegido),
        hora: hora24(),
      });
      setCitaCreada(nueva);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  const manejarPago = async () => {
    setError(null);
    setPagando(true);
    try {
      const resultado = await api.pagarDeposito(citaCreada.id);
      setCitaCreada(resultado.cita);
    } catch (err) {
      setError(err.message);
    } finally {
      setPagando(false);
    }
  };

  const hoy = new Date().toISOString().split("T")[0];

  // Convierte "19:30" a "7:30 PM" para mostrarlo bonito en la confirmacion
  const formatearHora = (hora24str) => {
    const [h, m] = hora24str.split(":").map(Number);
    const periodoTexto = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${periodoTexto}`;
  };

  if (citaCreada) {
    return (
      <div className="container py-5" style={{ maxWidth: "500px" }}>
        <div className="card p-4 text-center">
          <h3>{citaCreada.pagado ? "¡Cita confirmada!" : "Reserva creada"}</h3>
          <p className="text-secondary mb-1">
            {citaCreada.categoria} — Plan {citaCreada.plan}
          </p>
          <p className="text-secondary">
            {citaCreada.fecha} a las {formatearHora(citaCreada.hora)}
          </p>
          <p>Depósito (50%): <strong>${citaCreada.deposito_requerido.toFixed(2)}</strong></p>

          {error && <div className="alert alert-danger">{error}</div>}

          {!citaCreada.pagado && (
            <button className="btn btn-dark btn-lg" onClick={manejarPago} disabled={pagando}>
              {pagando ? "Procesando..." : "Pagar depósito (simulado)"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={manejarSubmit} className="container py-5" style={{ maxWidth: "550px" }}>
      <h1 className="text-center mb-4">Agenda tu fecha</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Nombre completo</label>
        <input
          className="form-control"
          name="cliente_nombre"
          value={form.cliente_nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          name="cliente_email"
          value={form.cliente_email}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="tel"
          className="form-control"
          name="cliente_telefono"
          value={form.cliente_telefono}
          onChange={manejarCambio}
        />
      </div>

      {/* Categoria */}
      <div className="mb-3">
        <label className="form-label">Tipo de servicio</label>
        <select
          className="form-select"
          value={categoriaElegida}
          onChange={(e) => {
            setCategoriaElegida(e.target.value);
            setServicioIdElegido(""); // reinicia el plan al cambiar de categoria
          }}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Plan - solo aparece despues de elegir categoria */}
      {categoriaElegida && (
        <div className="mb-3">
          <label className="form-label">Plan</label>
          <select
            className="form-select"
            value={servicioIdElegido}
            onChange={(e) => setServicioIdElegido(e.target.value)}
            required
          >
            <option value="">Selecciona un plan</option>
            {planesDeLaCategoria.map((s) => (
              <option key={s.id} value={s.id}>
                {s.plan} — ${s.precio.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
      )}

      {servicioSeleccionado && (
        <div className="alert alert-info py-2">
          <strong>{servicioSeleccionado.categoria} — {servicioSeleccionado.plan}</strong>
          <br />
          Depósito requerido: <strong>${(servicioSeleccionado.precio * 0.5).toFixed(2)}</strong>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          name="fecha"
          min={hoy}
          value={form.fecha}
          onChange={manejarCambio}
          required
        />
      </div>

      {/* Hora en formato 12h con AM/PM */}
      <div className="mb-3">
        <label className="form-label">Hora</label>
        <div className="d-flex gap-2">
          <select className="form-select" value={hora12} onChange={(e) => setHora12(e.target.value)}>
            {HORAS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <select className="form-select" value={minuto} onChange={(e) => setMinuto(e.target.value)}>
            {MINUTOS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select className="form-select" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Notas (opcional)</label>
        <textarea
          className="form-control"
          name="notas"
          rows="3"
          placeholder="Ej: lugar del evento, número de invitados, detalles especiales..."
          value={form.notas}
          onChange={manejarCambio}
        />
      </div>

      <button type="submit" className="btn btn-dark btn-lg w-100" disabled={enviando}>
        {enviando ? "Reservando..." : "Continuar a reservar"}
      </button>
    </form>
  );
}