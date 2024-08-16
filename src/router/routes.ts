import {
  cat_tipoProyectoRoutes,
  cat_tipoDocumentoRoutes,
  cat_PaisRoutes,
  cat_FaseRoutes,
  cat_Unidad_Responsable,
  proyectoDeInversiones,
  cargaMasiva,
  reportsRoutes,
  presupuestoEgreso,
  cat_Conceptos,
  trabajos,
  trabajosPrevios,
  e7Routes,
  cat_subEstatusRoutes,
  cat_TipoContratacionRoutes,
  cat_PeriodosPagoRoutes,
  cat_ModulosRoutes,
  cat_MonedaRoutes,
  cat_IdiomaRoutes,
  cat_proveedoresRoutes,
  catEstatusRoutes,
  visitaSitio
} from "@/router/exportFile.ts";

import { isAuthenticated } from "@/utils/helpers/authenticationHelper";
import { constructionTypesRoutes } from "./constructionTypesRoutes";
import { prioritiesRoutes } from "./prioritiesRoutes";
import { levelsByAreaRoutes } from "./levelsByAreaRoutes";
import { statusRoutes } from "./statusRoutes";
import { federalEntityRoutes } from "./federalEntityRoutes";
import { feasibilityRoutes } from "./feasibilityRoutes";
import { tipoEscalatoria } from "./tipoEscalatoria";
import { factorEscalatoria } from "./factorEscalatoria";
import { unidadMedida } from "./unidadMedida";
import { modalidadPago } from "./catModalidadPago";
import { municipios } from "./municipios";
import { tipoProcedimientos } from "./tipoProcedimientos";
import { caracterProcedimientos } from "./caracterProcedimientos";
import { testigoSocial } from "./testigoSocial";
import { catProceso } from "./catProceso";
import { procedimientoContrataciones } from "./procedimientoContrataciones";

export const routes = [
  {
    path: "/",
    component: () => import("@/layouts/LayoutComponent.vue"),
    children: [
      {
        path: "Home",
        name: "HomePage",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "table",
        name: "table",
        component: () => import("@/views/BitacoraMovimientos/Index.vue"),
      },
      {
        path: "tipo_obra",
        name: "tipo-obra",
        children: constructionTypesRoutes,
      },
      {
        path: "prioridades",
        name: "prioridades",
        children: prioritiesRoutes,
      },
      {
        path: "niveles_area",
        name: "niveles-area",
        children: levelsByAreaRoutes,
      },
      {
        path: "bitacora",
        name: "bitacora",
        component: () => import("@/views/BitacoraMovimientos/Index.vue"),
      },
      {
        path: "cat_tipoProyecto",
        name: "cat_tipoProyecto",
        children: cat_tipoProyectoRoutes,
      },
      {
        path: "cat_tipoDocumento",
        name: "cat_tipoDocumento",
        children: cat_tipoDocumentoRoutes,
      },
      {
        path: "estatus-proyecto",
        name: "estatus-proyecto",
        children: statusRoutes,
      },
      {
        path: "factibilidad-obra",
        name: "factibilidad-obra",
        children: feasibilityRoutes,
      },
      {
        path: "cat_Pais",
        name: "cat_Pais",
        children: cat_PaisRoutes,
      },
      {
        path: "cat_Fase",
        name: "cat_Fase",
        children: cat_FaseRoutes,
      },
      {
        path: "entidad-federativa",
        name: "entidad-federativa",
        children: federalEntityRoutes,
      },
      {
        path: "cat_unidad_responsable",
        name: "cat_unidad_responsable",
        children: cat_Unidad_Responsable,
      },
      {
        path: "cartera_proyectos_inversion",
        name: "proyecto_de_inversiones",
        children: proyectoDeInversiones,
      },
      {
        path: "carga-masiva",
        name: "cargamasiva",
        children: cargaMasiva,
      },
      {
        path: "reportes",
        name: "reportes",
        children: reportsRoutes,
      },
      {
        path: "presupuestoEgreso",
        name: "presupuestoEgreso",
        children: presupuestoEgreso,
      },
      {
        path: "cat_conceptos",
        name: "cat_conceptos",
        children: cat_Conceptos,
      },
      {
        path: "trabajos",
        name: "trabajps",
        children: trabajos,
      },
      {
        path: "trabajosPrevios",
        name: "trabajosPrevios",
        children: trabajosPrevios,
      },
      {
        path: "tipoEscalatoria",
        name: "tipoEscalatoria",
        children: tipoEscalatoria,
      },
      {
        path: "factorEscalatoria",
        name: "factorEscalatoria",
        children: factorEscalatoria,
      },
      {
        path: "unidadMedida",
        name: "unidadMedida",
        children: unidadMedida,
      },
      {
        path: "E7",
        name: "E7",
        children: e7Routes,
      },
      {
        path: "municipos",
        name: "municipos",
        children: municipios,
      },
      {
        path: "tipo-procedimientos",
        name: "tipo-procedimientos",
        children: tipoProcedimientos,
      },
      {
        path: "caracter-procedimientos",
        name: "caracter-procedimientos",
        children: caracterProcedimientos,
      },
      {
        path: "testigo-social",
        name: "testigo-social",
        children: testigoSocial,
      },
      {
        path: "cat_subEstatus",
        name: "cat_subEstatus",
        children: cat_subEstatusRoutes,
      },
      {
        path: "modalidadPago",
        name: "modalidadPago",
        children: modalidadPago,
      },
      {
        path: "catProceso",
        name: "catProceso",
        children: catProceso,
      },
      {
        path: "cat_tipoContratacion",
        name: "cat_tipoContratacion",
        children: cat_TipoContratacionRoutes,
      },
      {
        path: "cat_periodos_pago",
        name: "cat_periodos_pago",
        children: cat_PeriodosPagoRoutes,
      },
      {
        path: "cat_modulos",
        name: "cat_modulos",
        children: cat_ModulosRoutes,
      },
      {
        path: "cat_moneda",
        name: "cat_moneda",
        children: cat_MonedaRoutes,
      },
      {
        path: "cat_idioma",
        name: "cat_idioma",
        children: cat_IdiomaRoutes,
      },
      {
        path: "cat_proveedores",
        name: "cat_proveedores",
        children: cat_proveedoresRoutes,
      },
      {
        path: "procedimiento-contrataciones",
        name: "procedimiento-contrataciones",
        children: procedimientoContrataciones,
      },
      {
        path: "cat-estatus",
        name: "cat-estatus",
        children: catEstatusRoutes,
      },
      {
        path: "visita-sitio",
        name: "visita-sitio",
        children: visitaSitio,
      },
    ],
    beforeEnter: () => {
      if (!isAuthenticated()) {
        return "/login";
      }
      return true;
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    beforeEnter: () => {
      if (isAuthenticated()) {
        return "Home";
      }
      return true;
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/Home",
  },
];

export default routes;
