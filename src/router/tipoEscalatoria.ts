export const tipoEscalatoria = [
    {
      path: "",
      name: "listar-tipo-escalatoria",
      component: () => import("@/views/TipoEscalatoria/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-tipo-escalatoria",
      component: () => import("@/views/TipoEscalatoria/Details.vue"),
    },
    {
      path: ':id/editar',
      name: "editar-tipo-escalatoria",
      component: () => import("@/views/TipoEscalatoria/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-tipo-escalatoria",
      component: () => import("@/views/TipoEscalatoria/Delete.vue"),
    },
  ];
  