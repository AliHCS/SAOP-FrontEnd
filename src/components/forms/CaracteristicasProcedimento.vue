<template>
  <div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Moneda
      </div>
      <div class="col-md-10">
        <select v-model="data.moneda" class="form-select form-control">
          <option
            v-for="moneda in monedas.data"
            :key="moneda.id"
            :value="moneda.id"
          >
            {{ moneda.descripcion }}
          </option>
        </select>
      </div>
    </div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Idioma
      </div>
      <div class="col-md-10">
        <select v-model="data.idioma" class="form-select form-control">
          <option
            v-for="idioma in idiomas.data"
            :key="idioma.id"
            :value="idioma.id"
          >
            {{ idioma.descripcion }}
          </option>
        </select>
      </div>
    </div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Modalida de pago
      </div>
      <div class="col-md-10">
        <select v-model="data.modalidad_pago" class="form-select form-control">
          <option
            v-for="modalidadePago in modalidadesPago.data"
            :key="modalidadePago.id"
            :value="modalidadePago.id"
          >
            {{ modalidadePago.descripcion_modalidad_pago }}
          </option>
        </select>
      </div>
    </div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Periodo Pago
      </div>
      <div class="col-md-10">
        <select v-model="data.periodo_pago" class="form-select form-control">
          <option
            v-for="periodoPago in periodosPago.data"
            :key="periodoPago.id"
            :value="periodoPago.id"
          >
            {{ periodoPago.descripcion_periodo_pago }}
          </option>
        </select>
      </div>
    </div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Presupuesto Base
      </div>
      <div class="col-md-4">
        <input
          v-model="data.presupuesto_base"
          type="text"
          class="form-control"
        />
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Capital Contable Requerido
      </div>
      <div class="col-md-4">
        <input
          v-model="data.capital_contable_requerido"
          type="text"
          class="form-control"
        />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Testigo Social
      </div>
      <input
        v-model.trim="data.usa_testigo_social"
        type="checkbox"
        id="usa_imagen"
      />
      <div class="col-md-2">
        <input
          :disabled="!data.usa_testigo_social"
          v-model="data.testigo_social"
          type="text"
          class="form-control"
          @keyup.enter="searchTestigoSocial()"
        />
      </div>
      <div class="col-md-4">
        <input
          v-model="nombreTestigo"
          type="text"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-md-1 d-flex align-content-center flex-wrap">
        <i
          v-if="data.usa_testigo_social"
          class="bi bi-info-circle-fill primary-red--text clickable"
          @click="openModalTestigoSocial = true"
        ></i>
      </div>
    </div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Visita Sitio
      </div>
      <input v-model.trim="data.visita_sitio" type="checkbox" />
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('returnDatosGenerales'), resetForm()"
      >
        Regresar
      </button>
      <button type="button" class="btn btn-primary active" @click="save()">
        Aceptar
      </button>
    </div>
    <SeleccionarTestigoSocialModal
      v-if="openModalTestigoSocial"
      @onCloseModal="openModalTestigoSocial = false"
      @onSave="addTestigoSocialSearch"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import {
  ICaracteristicasProcedimiento,
  defaultValues,
} from "@/utils/models/CaracteristicasProcedimiento";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import usePetition from "@/composables/usePetition";
import SeleccionarTestigoSocialModal from "@/components/E7/SeleccionarTestigoSocialModal.vue";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";
import useAlert from "@/composables/useAlert";

const emit = defineEmits(["returnDatosGenerales"]);
const procesoContratacionStore = useProcesoContratacionStore();
const { showAlertSuccess, showAlertWarning, showAlertError } = useAlert();

const { arrayData: testigosSociales, getDatas: getDatasTestigosSociales } =
  usePetition("cat_testigo_social/");

const { getDatas: getDatasMoneda, arrayData: monedas } =
  usePetition("cat_moneda/");
const { arrayData: idiomas, getDatas: getDatasIdioma } =
  usePetition("cat_idioma/");
const { arrayData: modalidadesPago, getDatas: getDatasModalidadesPago } =
  usePetition("cat_modalidad_pago/");
const { arrayData: periodosPago, getDatas: getDatasPeriodosPago } =
  usePetition("cat_periodo_pago/");

const { customPetition } = usePetition("procedimiento_contratacion/");

/* const props = defineProps(["existingData"]); */

const data = ref<ICaracteristicasProcedimiento>(defaultValues);
const testigoSocial: any = ref({});
const openModalTestigoSocial = ref(false);
const idProcedimiento = ref("");
const nombreTestigo = ref("");

const searchTestigoSocial = () => {
  if (!testigosSociales.value || !testigosSociales.value.data) {
    showAlertWarning("Testigos sociales no cargados.");
    return;
  }

  const testigoSocialEncontrado = testigosSociales.value.data.find(
    (tp: any) => tp.id == data.value.testigo_social
  );

  if (testigoSocialEncontrado) {
    addTestigoSocial(testigoSocialEncontrado);
  } else {
    showAlertWarning("Testigo social no encontrado.");
    data.value.testigo_social = "";
  }
};

const addTestigoSocial = (dataTestigoBusqueda: any) => {
  testigoSocial.value = dataTestigoBusqueda; // Asegúrate de que dataTestigoBusqueda no tenga .value
  getTestigoSocialDataSearch();
};

const getTestigoSocialDataSearch = () => {
  nombreTestigo.value =
    testigoSocial.value.nombre +
    " " +
    testigoSocial.value.apellido_paterno +
    " " +
    testigoSocial.value.apellido_materno;

  data.value.testigo_social = testigoSocial.value.id;
};

const addTestigoSocialSearch = (dataTestigoBusqueda: any) => {
  testigoSocial.value = dataTestigoBusqueda.value;
  getTestigoSocialData();
};

const getTestigoSocialData = () => {
  nombreTestigo.value =
    testigoSocial.value.nombre +
    " " +
    testigoSocial.value.apellido_paterno +
    " " +
    testigoSocial.value.apellido_materno;

  data.value.testigo_social = testigoSocial.value.id;
};
const save = async () => {
  /* data.value.idPeocedimiento = procesoContratacionStore.getSelectedRowData.id; */
  await customPetition(
    HTTP_METHODS.PATCH,
    data.value,
    `${procesoContratacionStore.getSelectedRowData.id}/caracteristicas/`
  )
    .then(() => {
      showAlertSuccess("Datos guardados correctamente");
    })
    .catch((error) => {
      showAlertError(error);
    })
    .finally(() => {
      /* resetForm(); */
      procesoContratacionStore.resetSelectedRowData;
      emit("returnDatosGenerales");
    });
  /*  createData({ ...data.value, folio: claveFolio.value }).then(() => {
    emit("returnDatosGenerales", true);
  }); */
};

const resetForm = () => {
  data.value.capital_contable_requerido = null;
  data.value.idioma = null;
  data.value.modalidad_pago = null;
  data.value.moneda = null;
  data.value.periodo_pago = null;
  data.value.presupuesto_base = null;
  data.value.testigo_social = null;
  data.value.usa_testigo_social = false;
  data.value.visita_sitio = false;
};

// Observa los cambios en data.usa_testigo_social
watch(
  () => data.value.usa_testigo_social,
  (newValue) => {
    if (!newValue) {
      // Si se desmarca la casilla, limpia el ID del testigo social y el nombreTestigo
      data.value.testigo_social = null;
      nombreTestigo.value = "";
    }
  }
);

// Lógica para inicializar campos con existingData si está presente
onBeforeMount(async () => {
  await Promise.all([
    getDatasMoneda({ page: 1, size: 100 }),
    getDatasIdioma({ page: 1, size: 100 }),
    getDatasModalidadesPago({ page: 1, size: 100 }),
    getDatasPeriodosPago({ page: 1, size: 100 }),
    getDatasTestigosSociales({ page: 1, size: 100 }),
  ]);
  idProcedimiento.value = procesoContratacionStore.getSelectedRowData.id ?? "";
  if (idProcedimiento.value) {
    await customPetition(
      HTTP_METHODS.GET,
      null,
      `${idProcedimiento.value}/caracteristicas/`
    )
      .then((response: ICaracteristicasProcedimiento) => {
        data.value.capital_contable_requerido =
          response.capital_contable_requerido;
        data.value.idioma = response.idioma;
        data.value.modalidad_pago = response.modalidad_pago;
        data.value.moneda = response.moneda;
        data.value.periodo_pago = response.periodo_pago;
        data.value.presupuesto_base = response.presupuesto_base;
        data.value.testigo_social = response.testigo_social;
        data.value.usa_testigo_social = response.usa_testigo_social;
        data.value.visita_sitio = response.visita_sitio;
      })
      .then(() => {
        if (data.value.testigo_social) {
          searchTestigoSocial();
        }
      });
  }
  // if (props.existingData) {
  //     data.value = { ...props.existingData };
  // }
});
</script>
