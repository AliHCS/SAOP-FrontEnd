export const caracterProcedimientos = [
    {
      path: "",
      name: "listar-caracter-procedimientos",
      component: () => import("@/views/CaracterProcedimientos/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-caracter-procedimiento",
      component: () => import("@/views/CaracterProcedimientos/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-caracter-procedimiento",
      component: () => import("@/views/CaracterProcedimientos/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-caracter-procedimiento",
      component: () => import("@/views/CaracterProcedimientos/Delete.vue"),
    },
  ];
  