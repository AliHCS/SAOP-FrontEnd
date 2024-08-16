export const reportsRoutes = [
  {
    path: "",
    name: "reporte-cartera-inversion",
    component: () =>
      import("@/views/ProyectoDeInversion/Reports/ReportCarteraInversion.vue"),
  },
];
