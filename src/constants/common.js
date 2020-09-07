export const baseRoute = "/api/v1";

export const routes = {
  usuarioRaiz: `${baseRoute}/usuarios`,
  psicologo: {
    tratamiento: "/:id/tratamientos"
  },
  psicologo: `${baseRoute}/psicologos`
};
