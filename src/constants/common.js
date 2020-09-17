

export const baseRoute = "/api/v1";

export const routes = {
  psicologoRaiz: `${baseRoute}/psicologos`,
  psicologo: {
    tratamiento: "/:psicologo/tratamientos"
  },
  tratamiento: `${baseRoute}/tratamientos`,
  pacienteRaiz: `${baseRoute}/pacientes`,
  paciente: {
    cita: "/:paciente/citas"
  },
  cita: `${baseRoute}/citas`,
  auth: `${baseRoute}/auth`,
  contactanos: `${baseRoute}/contactanos`,
  paises: `${baseRoute}/paises`

};
