
export const catProceso = [
    {
      path: "",
      name: "listar-cat-proceso",
      component: () => import("@/views/CatProceso/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-cat-proceso",
      component: () => import("@/views/CatProceso/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-cat-proceso",
      component: () => import("@/views/CatProceso/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-cat-proceso",
      component: () => import("@/views/CatProceso/Delete.vue"),
    },
  ];