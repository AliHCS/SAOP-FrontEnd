export const testigoSocial = [
    {
      path: "",
      name: "listar-testigo-social",
      component: () => import("@/views/TestigoSocial/Index.vue"),
    },
    {
      path: "crear",
      name: "crear-testigo-social",
      component: () => import("@/views/TestigoSocial/Details.vue"),
    },
    {
      path: ":id/editar",
      name: "editar-testigo-social",
      component: () => import("@/views/TestigoSocial/Details.vue"),
    },
    {
      path: ":id/eliminar",
      name: "eliminar-testigo-social",
      component: () => import("@/views/TestigoSocial/Delete.vue"),
    },
  ];
  