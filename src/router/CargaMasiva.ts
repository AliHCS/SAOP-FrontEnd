export const cargaMasiva = [
  {
    path: "",
    name: "carga-masiva",
    component: () => import("@/views/CargaMasiva/CargaMasiva.vue"),
  },
  {
    path: "trabajos",
    name: "carga-masiva-trabajos",
    component: () => import("@/views/Trabajos/BulkData.vue"),
  },
];
