export const cat_Conceptos = [
  {
    path: "",
    name: "listar-Conceptos",
    component: () => import("@/views/Cat_Conceptos/Index.vue"),
  },
  {
    path: "",
    name: "listar-Publicacion",
    component: () => import("@/views/Cat_Conceptos/Publicacion/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-Publicacion",
    component: () => import("@/views/Cat_Conceptos/Publicacion/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-Publicacion",
    component: () => import("@/views/Cat_Conceptos/Publicacion/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-Publicacion",
    component: () => import("@/views/Cat_Conceptos/Publicacion/Delete.vue"),
  },
];
