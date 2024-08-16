export const visitaSitio = [
    {
        path: ":idEvento/eventos/:idProceso",
        name: "listar-visitas-sitio",
        component: () => import("@/views/ProcedimientoContrataciones/VisitasSitio/Index.vue"),
    },
    {
        path: ":idEvento/eventos/:idProceso/crear",
        name: "crear-visita-sitio",
        component: () => import("@/views/ProcedimientoContrataciones/VisitasSitio/Details.vue"),
    },
    {
        path: ":idEvento/eventos/:idProceso/editar/:id",
        name: "editar-visita-sitio",
        component: () => import("@/views/ProcedimientoContrataciones/VisitasSitio/Details.vue"),
    },
    {
        path: ":idEvento/eventos/:idProceso/eliminar/:id",
        name: "eliminar-visita-sitio",
        component: () => import("@/views/ProcedimientoContrataciones/VisitasSitio/Delete.vue"),
    },
];
