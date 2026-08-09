const BASE_URL = "https://yordanfilms-backend.onrender.com/api";

async function manejarRespuesta(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Ocurrio un error inesperado");
  }
  return data;
}

export const api = {
  listarServicios: async () => {
    const res = await fetch(`${BASE_URL}/servicios`);
    return manejarRespuesta(res);
  },

  crearCita: async (datosCita) => {
    const res = await fetch(`${BASE_URL}/citas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCita),
    });
    return manejarRespuesta(res);
  },

  pagarDeposito: async (citaId) => {
    const res = await fetch(`${BASE_URL}/citas/${citaId}/pagar`, {
      method: "POST",
    });
    return manejarRespuesta(res);
  },
};