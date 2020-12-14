export const baseRoute = "/api/v1";

export const routes = {
  usuario: `${baseRoute}/usuarios`,
  rol: `${baseRoute}/roles`,
  auth: `${baseRoute}/auth`,
  gruposRoot: `${baseRoute}/grupos`,
  grupos: {
    coreografias: "/:grupo/coreografias"
  },
  divisiones: `${baseRoute}/divisiones`,
  modalidades: `${baseRoute}/modalidades`,
  torneos: `${baseRoute}/torneos`,
  paises: `${baseRoute}/paises`,
  contactos: `${baseRoute}/contactos`
};
