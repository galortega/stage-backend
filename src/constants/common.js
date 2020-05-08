export const baseRoute = "/api/v1";

export const routes = {
  usuarioRaiz: `${baseRoute}/usuarios`,
  usuario: {
    consulta: "/:id/consultas",
    infoPersonal: "/:id/infopersonal"  
  },
  doctorRaiz: `${baseRoute}/doctores`,
  doctor: {
    datosConsulta: "/:id/datosConsultas"
  },
  especialidad: `${baseRoute}/especialidades`
};