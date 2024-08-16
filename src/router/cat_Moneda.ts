export const cat_MonedaRoutes = [
  {
    path: "",
    name: "listar-cat_moneda",
    component: () => import("@/views/Cat_Moneda/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-cat_moneda",
    component: () => import("@/views/Cat_Moneda/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-cat_moneda",
    component: () => import("@/views/Cat_Moneda/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-cat_moneda",
    component: () => import("@/views/Cat_Moneda/Delete.vue"),
  },
];
