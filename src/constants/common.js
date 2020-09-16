export const baseRoute = "/api/v1";

export const routes = {
  psicologoRaiz: `${baseRoute}/psicologos`,
  psicologo: {
    tratamiento: "/:psicologo/tratamientos"
  },
  pacienteRaiz: `${baseRoute}/pacientes`,
  paciente: {
    cita: "/:paciente/citas"
  },
  auth: `${baseRoute}/auth`,
};
