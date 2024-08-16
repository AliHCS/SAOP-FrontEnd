export const cat_subEstatusRoutes = [
  {
    path: "",
    name: "listar-cat_subEstatus",
    component: () => import("@/views/Cat_SubEstatus/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-cat_subEstatus",
    component: () => import("@/views/Cat_SubEstatus/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-cat_subEstatus",
    component: () => import("@/views/Cat_SubEstatus/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-cat_subEstatus",
    component: () => import("@/views/Cat_SubEstatus/Delete.vue"),
  },
];
