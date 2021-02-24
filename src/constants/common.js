export const baseRoute = "/api/v1";

export const routes = {
  usuario: `${baseRoute}/usuarios`,
  rol: `${baseRoute}/roles`,
  auth: `${baseRoute}/auth`,
  gruposRoot: `${baseRoute}/grupos`,
  coreografias: `${baseRoute}/coreografias`,
  grupos: {
    coreografias: "/:grupo/coreografias"
  },
  divisiones: `${baseRoute}/divisiones`,
  modalidades: `${baseRoute}/modalidades`,
  torneos: `${baseRoute}/torneos`,
  paises: `${baseRoute}/paises`,
  contactos: `${baseRoute}/contactos`,
  categorias: `${baseRoute}/categorias`,
  subTorneos: `${baseRoute}/subTorneos`,
  paquetes: `${baseRoute}/paquetes`
};
