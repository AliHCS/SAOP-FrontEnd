export const e7Routes = [
  {
    path: "",
    name: "listar-E7",
    component: () => import("@/views/E7/Index.vue"),
  },
  {
    path: "carga-masiva",
    name: "carga-masiva-E7",
    component: () => import("@/views/E7/BulkData.vue"),
  },
  {
    path: "temporal",
    name: "temporal-E7",
    component: () => import("@/views/E7/Temporal.vue"),
  },
  /*    {
        path: 'crear',
        name: 'crear-prioridad',
        component: () => import('@/views/Priorities/DetailsView.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-prioridad',
        component: () => import('@/views/Priorities/DetailsView.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-prioridad',
        component: () => import('@/views/Priorities/DeleteView.vue')
    } */
];
