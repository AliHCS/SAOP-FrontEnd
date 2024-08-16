export const cat_proveedoresRoutes = [
  {
    path: "",
    name: "listar-cat_proveedores",
    component: () => import("@/views/Cat_Proveedores/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-cat_proveedores",
    component: () => import("@/views/Cat_Proveedores/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-cat_proveedores",
    component: () => import("@/views/Cat_Proveedores/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-cat_proveedores",
    component: () => import("@/views/Cat_Proveedores/Delete.vue"),
  },
];
