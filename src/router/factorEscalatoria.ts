export const factorEscalatoria = [
    {
      path: "",
      name: "listar-factor-escalatoria",
      component: () => import("@/views/FactorEscalatoria/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-factor-escalatoria",
      component: () => import("@/views/FactorEscalatoria/Details.vue"),
    },
    {
      path: ':id/editar',
      name: "editar-factor-escalatoria",
      component: () => import("@/views/FactorEscalatoria/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-factor-escalatoria",
      component: () => import("@/views/FactorEscalatoria/Delete.vue"),
    },
  ];
  