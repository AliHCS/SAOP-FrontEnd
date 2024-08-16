export const modalidadPago = [
    {
      path: "",
      name: "listar-cat-modalidad-pago",
      component: () => import("@/views/CatModalidadPago/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-cat-modalidad-pago",
      component: () => import("@/views/CatModalidadPago/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-cat-modalidad-pago",
      component: () => import("@/views/CatModalidadPago/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-cat-modalidad-pago",
      component: () => import("@/views/CatModalidadPago/Delete.vue"),
    },
  ];