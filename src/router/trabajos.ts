export const trabajos = [
    {
      path: "",
      name: "listar-trabajos",
      component: () => import("@/views/Trabajos/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-trabajos",
      component: () => import("@/views/Trabajos/Create.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-trabajos",
      component: () => import("@/views/Trabajos/Create.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-trabajos",
      component: () => import("@/views/Trabajos/Delete.vue"),
    },
  ];
  