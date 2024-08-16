export const unidadMedida = [
    {
      path: "",
      name: "listar-unidad-medida",
      component: () => import("@/views/UnidadMedida/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-unidad-medida",
      component: () => import("@/views/UnidadMedida/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-unidad-medida",
      component: () => import("@/views/UnidadMedida/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-unidad-medida",
      component: () => import("@/views/UnidadMedida/Delete.vue"),
    },
  ];
  