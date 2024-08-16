<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveData">
      <div class="row info-chip">
        <SelectComponent
          v-model="data.cartera_proyecto_inversion"
          title="No. Solicitud:"
          @change="fetchData()"
          placeholder="Selecciona..."
          name="cartera_proyecto_inversion"
          id="cartera_proyecto_inversion"
          class="col-sm-4"
          :options="arrayDataCartera.data"
          optionText="no_solicitud"
        />
        <i
          class="bi bi-info-circle-fill primary-red--text clickable"
          @click="infoNoSolicitud = true"
        ></i>
      </div>
      <div class="row">
        <InputText
          :disabled="itemId !== ''"
          v-model="data.presupuesto_egresos_federacion"
          title="PEF:"
          @change="fetchData()"
          placeholder="0"
          name="presupuesto_egresos_federacion"
          id="presupuesto_egresos_federacion"
          class="col-sm-4"
        />
        <InputText
          title="&nbsp;"
          disabled
          placeholder=""
          class="col-sm-8"
          v-model="presupuesto_egresos_federacion_desc"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.pais"
          title="País:"
          placeholder="País"
          name="pais"
          id="pais"
          disabled
          class="col-sm-6"
          :options="arrayDataPais.data"
          :optionText="'nombre_oficial'"
        />
        <SelectComponent
          v-model="data.entidad_federativa"
          title="Entidad Federativa:"
          disabled
          placeholder="Entidad Federativa"
          name="entidad_federativa"
          id="entidad_federativa"
          class="col-sm-6"
          :options="arrayDataEntidadFederativa.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.departamento"
          title="Departamento:"
          placeholder="Selecciona"
          name="pais"
          disabled
          id="departamento"
          class="col-sm-12"
          :options="arrayDataDepto.data"
          :optionText="'descripcion_corta'"
        />
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.descripcion"
          title="Descripción de los trabajos:"
          :placeholder="'Descricpion...'"
          :name="'descripcion'"
          :id="'descripcion'"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <div class="col-sm-12 px-5 my-3">
          <input
            type="checkbox"
            :checked="data.aplica_ruta_tramo_subtramo"
            class="form-check-input"
            id="aplica_ruta_tramo_subtramo"
          />
          <label class="pl-5" for="es-ampliacion">
            Aplica Ruta / Tramo / Subtramo
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <label class="" for="es-ampliacion"> Fecha de obra </label>
          <input
            v-model="data.fecha_obra"
            type="date"
            class="form-control"
            id="fecha_obra"
            name="fecha_obra"
            placeholder=""
            autocomplete="off"
          />
        </div>
        <SelectComponent
          v-model="data.estatus_trabajo"
          title="Estatus:"
          placeholder="Selecciona"
          name="estatus_trabajo"
          id="estatus_trabajo"
          class="col-sm-4"
          :options="arrayDataStatus.data"
          :optionText="'descripcion'"
          optionValue="clave"
        />
        <InputText
          :disabled="itemId !== ''"
          v-model.trim="data.numero_obra"
          title="No. Obra:"
          placeholder=""
          name="numero_obra"
          id="numero_obra"
          class="col-sm-4"
        />
      </div>
      <div class="row">
        <InputText
          :disabled="itemId !== ''"
          v-model.trim="data.meta"
          title="Meta:"
          placeholder="0.0"
          name="meta"
          id="meta"
          class="col-sm-6"
        />
        <SelectComponent
          v-model="data.periodo"
          title="Periodo:"
          placeholder="Selecciona"
          name="periodo"
          id="periodo"
          class="col-sm-6"
          :options="[
            { id: 1, descripcion: 'normal' },
            { id: 2, descripcion: 'secas' },
          ]"
          :optionText="'descripcion'"
          optionValue="descripcion"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.tipo_trabajo"
          title="Tipo trabajo:"
          placeholder="Selecciona"
          name="tipo_trabajo"
          id="tipo_trabajo"
          class="col-sm-12"
          :options="arrayDataTrabajo.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.tipo_subtrabajo"
          title="Tipo subtrabajo:"
          placeholder="Selecciona"
          name="tipo_subtrabajo"
          id="tipo_subtrabajo"
          class="col-sm-12"
          :options="arrayDataSubtrabajo.data"
          :optionText="'descripcion'"
          optionValue="clave"
        />
      </div>
      <div class="row">
        <InputText
          :disabled="itemId !== ''"
          v-model.trim="data.actividad_prioritaria"
          title="Actividad prioritaria:"
          placeholder=""
          name="actividad_prioritaria"
          id="actividad_prioritaria"
          class="col-sm-4"
        />
        <InputText title="&nbsp;" disabled placeholder="" class="col-sm-8" />
      </div>
      <div class="row my-4">
        <div class="col-sm-4">
          <label class="form-check-label pr-4">Tipo de contratación</label>
        </div>
        <div class="col-sm-8">
          <label class="form-check-label px-5">
            <input
              type="radio"
              name="radio-01"
              value="unitario"
              class="form-check-input"
              v-model="data.tipo_contratacion"
            />
            <span class="pl-4">Precio unitario</span>
          </label>
          <label class="form-check-label px-5">
            <input
              type="radio"
              name="radio-01"
              value="alzado"
              class="form-check-input"
              v-model="data.tipo_contratacion"
            />
            <span class="pl-4">Precio alzado</span>
          </label>
          <label class="form-check-label px-5">
            <input
              type="radio"
              name="radio-01"
              value="mixto"
              class="form-check-input"
              v-model="data.tipo_contratacion"
            />
            <span class="pl-4">Precio mixto</span>
          </label>
        </div>
        <div class="col-sm-4"></div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.ubicacion"
          title="Ubicación:"
          :placeholder="'Descricpion...'"
          :name="'ubicacion'"
          :id="'ubicacion'"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.observaciones"
          title="Observaciones:"
          :placeholder="'Descricpion...'"
          :name="'observaciones'"
          :id="'observaciones'"
          class="col-sm-12"
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">
          <!-- :disabled="Object.keys(errors).length !== 0" -->
          Guardar
        </button>
      </div>
    </form>
    <Modal
      v-if="infoNoSolicitud"
      :title="`Cartera de inversión`"
      saveButtonTitle="Aceptar"
      :large-modal="true"
      @onCloseModal="infoNoSolicitud = false"
      :showAcceptButton="false"
    >
      <div class="card">
        <div class="card-body d-flex justify-content-center">
          <!-- <h5 class="card-title">¿Estás Seguro?</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        El registro será eliminado permanetemente.
                    </h6> -->
          <table>
            <thead>
              <tr>
                <td class="px-3 pb-4 font-weight-bold">No. Solicitud</td>
                <td class="px-3 pb-4 font-weight-bold">Proyecto</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cartera in arrayDataCartera.data"
                @click="setCartera(cartera.id)"
                class="clickable"
              >
                <td class="px-3">{{ cartera.no_solicitud }}</td>
                <td class="px-3">{{ cartera.nombre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sortedByField } from "@/utils/helpers/formatDataHelper";
import InputText from "@/components/InputText.vue";
import { ITrabajos, defaultValues } from "@/utils/models/trabajos";
import Modal from "@/components/ModalWithoutButton.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import usePetition from "@/composables/usePetition";
import TextAraComponent from "@/components/TextAraComponent.vue";

const route = useRoute();
const router = useRouter();

const titulo = ref("Crear Presupuesto de Egreso de la Federación");
const itemId = ref("");
const presupuesto_egresos_federacion_desc = ref("");

const data = ref<ITrabajos>(defaultValues);

const infoNoSolicitud = ref(false);

// consulta de datos para selectores
const { arrayData: arrayDataCartera, getDatas: getDatasCartera } = usePetition(
  "cartera_proyectos_inversion/"
);
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");
const { arrayData: arrayDataDepto, getDatas: getDatasDepto } =
  usePetition("cat_departamento/");
const { arrayData: arrayDataStatus, getDatas: getDatasStatus } =
  usePetition("cat_estatus/");
const { arrayData: arrayDataTrabajo, getDatas: getDatasTrabajo } =
  usePetition("cat_tipo_trabajo/");
const { arrayData: arrayDataSubtrabajo, getDatas: getDatasSubtrabajo } =
  usePetition("cat_tipo_subtrabajo/");

const { createData, getData, updateData } = usePetition("trabajo/");
const { arrayData: arrayDataPEF, getDatas: getDatasPEF } = usePetition(
  "presupuesto_egresos_federacion/"
);

async function saveData() {
  try {
    // Agregar campos del formulario
    if (itemId.value) {
      updateData({ ...data.value, id: itemId.value }).then(() => {
        // resetValues();
        router.push({ name: "listar-trabajos" });
      });
    } else {
      // arrayDataCartera.data console.log()
      let carteraAux = arrayDataCartera.value.data.find(
        (cartera: any) => cartera.id == data.value.cartera_proyecto_inversion
      );
      data.value.cartera_proyecto_inversion = carteraAux.no_solicitud;
      createData({ ...data.value }).then(() => {
        // resetValues();
        router.push({ name: "listar-trabajos" });
      });
    }
  } catch (error) {}
}

const setCartera = (noSolicitud: string) => {
  data.value.cartera_proyecto_inversion = noSolicitud;
  infoNoSolicitud.value = false;
  fetchData();
};

const fetchData = async () => {
  if (
    !data.value.cartera_proyecto_inversion ||
    !data.value.presupuesto_egresos_federacion
  )
    return;
  let baseData = arrayDataPEF.value.data.find(
    (pef: any) =>
      pef.cartera_proyecto_inversion == data.value.cartera_proyecto_inversion
  );
  let pais = arrayDataEntidadFederativa.value.data.find(
    (entidad: any) => entidad.id == baseData.entidad_federativa
  );
  presupuesto_egresos_federacion_desc.value = baseData.descripcion_programa;
  data.value.entidad_federativa = baseData.entidad_federativa;
  data.value.pais = pais.pais;
  data.value.departamento = baseData.departamento;

  console.log(baseData.entidad_federativa);
};

const handleCancel = () => router.push({ name: "listar-trabajos" });

onMounted(async () => {
  data.value = { ...defaultValues };
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar trabajo" : "Crear trabajo";

  getDatasCartera({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasPais({ page: 1, size: 100 });
  getDatasDepto({ page: 1, size: 100 });
  getDatasStatus({ page: 1, size: 100 });
  getDatasTrabajo({ page: 1, size: 100 });
  await getDatasSubtrabajo({ page: 1, size: 100 });
  if (itemId.value) {
    getData(itemId.value).then((response: any) => {
      data.value.cartera_proyecto_inversion =
        response.cartera_proyecto_inversion;
      data.value.presupuesto_egresos_federacion =
        response.presupuesto_egresos_federacion;
      data.value.pais = response.pais;
      data.value.entidad_federativa = response.entidad_federativa;
      data.value.departamento = response.departamento;
      data.value.descripcion = response.descripcion;
      data.value.aplica_ruta_tramo_subtramo =
        response.aplica_ruta_tramo_subtramo;
      data.value.fecha_obra = response.fecha_obra;
      data.value.estatus_trabajo = response.estatus_trabajo;
      data.value.numero_obra = response.numero_obra;
      data.value.meta = response.meta;
      data.value.periodo = response.periodo;
      data.value.tipo_trabajo = response.tipo_trabajo;
      data.value.tipo_subtrabajo = arrayDataSubtrabajo.value.data
        ? arrayDataSubtrabajo.value.data.find(
            (subtrabajo: any) => subtrabajo.id == response.tipo_subtrabajo
          ).clave
        : "";
      data.value.actividad_prioritaria = response.actividad_prioritaria;
      data.value.tipo_contratacion = response.tipo_contratacion;
      data.value.ubicacion = response.ubicacion;
      data.value.observaciones = response.observaciones;
    });
  }
  await getDatasPEF({ page: 1, size: 100 });
  // Ordenar arrayDataTrabajo y arrayDataSubtrabajo por la propiedad "descripcion"
  arrayDataTrabajo.value.data = sortedByField(
    arrayDataTrabajo.value.data,
    "descripcion"
  );
  arrayDataSubtrabajo.value.data = sortedByField(
    arrayDataSubtrabajo.value.data,
    "descripcion"
  );

  fetchData();
});
</script>
<style scoped lang="scss">
.info-chip {
  display: flex;
  align-items: center;

  i {
    margin-top: 14px;
  }
}
</style>
