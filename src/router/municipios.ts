export const municipios = [
    {
      path: "",
      name: "listar-municipios",
      component: () => import("@/views/Municipios/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-municipio",
      component: () => import("@/views/Municipios/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-municipio",
      component: () => import("@/views/Municipios/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-municipio",
      component: () => import("@/views/Municipios/Delete.vue"),
    },
  ];
  