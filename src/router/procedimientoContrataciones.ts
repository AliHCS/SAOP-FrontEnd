export const procedimientoContrataciones = [
  {
    path: "",
    name: "listar-procedimiento-contrataciones",
    component: () => import("@/views/ProcedimientoContrataciones/Index.vue"),
  },
  {
    path: "ubicacion-convocante/:idProceso",
    name: "listar-ubicacion_convocante",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/UbicacionConvocante/Index.vue"
      ),
  },
  {
    path: "ubicacion-convocante/:idProceso/crear",
    name: "crear-ubicacion_convocante",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/UbicacionConvocante/Create.vue"
      ),
  },
  {
    path: "ubicacion-convocante/:idProceso/editar/:id",
    name: "editar-ubicacion_convocante",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/UbicacionConvocante/Create.vue"
      ),
  },
  {
    path: "ubicacion-convocante/:idProceso/eliminar/:id",
    name: "eliminar-ubicacion_convocante",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/UbicacionConvocante/Delete.vue"
      ),
  },
  {
    path: "asignarE7/:idProceso",
    name: "procedimiento-contrataciones-asignarE7",
    component: () => import("@/views/ProcedimientoContrataciones/AsignarE7/Index.vue"),
  },
  {
    path: "registro-participantes/:idProceso",
    name: "listar-registro-participantes",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/Participantes/Index.vue"
      ),
  },
  {
    path: "registro-participantes/:idProceso/eliminar",
    name: "eliminar-registro-participantes",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/Participantes/Delete.vue"
      ),
  },
  // registro propuestas
  {
    path: "registro-participantes/:idProceso/registro-propuestas/:idParticipante",
    name: "listar-registro-propuestas",
    component: () =>
      import(
        "@/views/ProcedimientoContrataciones/Propuestas/Index.vue"
      ),
  },
  {
    path: "eventos/:idProceso",
    name: "procedimiento-contrataciones-eventos",
    component: () => import("@/views/ProcedimientoContrataciones/EventosProcedimiento/Index.vue"),
  },
];
