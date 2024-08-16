export const trabajosPrevios = [
  {
    path: "",
    name: "listar-trabajos_previos",
    component: () => import("@/views/TrabajosPrevios/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-trabajos_previos",
    component: () => import("@/views/TrabajosPrevios/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-trabajos_previos",
    component: () => import("@/views/TrabajosPrevios/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-trabajos_previos",
    component: () => import("@/views/TrabajosPrevios/Delete.vue"),
  },
];
