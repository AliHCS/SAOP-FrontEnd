export const cat_IdiomaRoutes = [
  {
    path: "",
    name: "listar-cat_idioma",
    component: () => import("@/views/Cat_Idioma/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-cat_idioma",
    component: () => import("@/views/Cat_Idioma/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-cat_idioma",
    component: () => import("@/views/Cat_Idioma/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-cat_idioma",
    component: () => import("@/views/Cat_Idioma/Delete.vue"),
  },
];
