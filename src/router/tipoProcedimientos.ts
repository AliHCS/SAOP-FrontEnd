export const tipoProcedimientos = [
    {
      path: "",
      name: "listar-tipo-procedimientos",
      component: () => import("@/views/TipoProcedimientos/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-tipo-procedimiento",
      component: () => import("@/views/TipoProcedimientos/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-tipo-procedimiento",
      component: () => import("@/views/TipoProcedimientos/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-tipo-procedimiento",
      component: () => import("@/views/TipoProcedimientos/Delete.vue"),
    },
  ];
  