<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveFase">
      <div class="row">
        <InputText
          :disabled="itemId !== ''"
          v-model="data.clave"
          title="Clave:"
          placeholder="Clave"
          name="clave"
          id="clave"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.descripcion"
          title="Descripción:"
          placeholder="Descripción"
          name="descripcion"
          id="descripcion"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.descripcion_corta"
          title="Descripción Corta:"
          placeholder="Descripción Corta"
          name="descripcion_corta"
          id="descripcion_corta"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.tipo_unidad"
          title="Tipo de Unidad:"
          placeholder="Tipo de Unidad"
          name="tipo_unidad"
          id="tipo_unidad"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.titular"
          title="Titular:"
          placeholder="Titular"
          name="titular"
          id="titular"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.subdirector"
          title="Subdirector:"
          placeholder="Subdirector"
          name="subdirector"
          id="subdirector"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.dependencia"
          title="Dependencia:"
          placeholder="Dependencia"
          name="dependencia"
          id="dependencia"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.codigo_postal"
          title="Codigo Postal:"
          placeholder="Codigo Postal"
          name="codigo_postal"
          id="codigo_postal"
          :error="errors"
          class="col-sm-6"
        />
      </div >
      <div class="row">
        <InputText
          v-model="data.telefono"
          title="Telefono:"
          placeholder="Telefono"
          name="telefono"
          id="telefono"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.extension"
          title="Extension:"
          placeholder="Extension"
          name="extension"
          id="extension"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.calle"
          title="Calle:"
          placeholder="Calle"
          name="calle"
          id="calle"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.numero_exterior"
          title="Numero Exterior:"
          placeholder="Numero Exterior"
          name="numero_exterior"
          id="numero_exterior"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.numero_interior"
          title="Numero Interior:"
          placeholder="Numero Interior"
          name="numero_interior"
          id="numero_interior"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.colonia"
          title="Colonia:"
          placeholder="Colonia"
          name="colonia"
          id="colonia"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.folio_licitacion"
          title="Folio de Licitacion:"
          placeholder="Folio de Licitacion"
          name="folio_licitacion"
          id="folio_licitacion"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.folio_contratacion"
          title="Folio de Contratacion:"
          placeholder="Folio de Contratacion"
          name="folio_contratacion"
          id="folio_contratacion"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.nombre_contrato"
          title="Nombre de Contrato:"
          placeholder="Nombre de Contrato"
          name="nombre_contrato"
          id="nombre_contrato"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.nombre_jefe_laboratorio"
          title="Nombre Jefe de Laboratorio:"
          placeholder="Nombre Jefe de Laboratorio"
          name="nombre_jefe_laboratorio"
          id="nombre_jefe_laboratorio"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.entidad"
          title="Entidad:"
          placeholder="Entidad"
          name="entidad"
          id="entidad"
          :error="errors"
          class="col-sm-6"
          :options="arrayData.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import InputText from "@/components/InputText.vue";
import SelectComponent from '@/components/SelectComponent.vue';
import { cat_unidadResponsableValidations } from "@/utils/validations/cat_unidadResponsableValidations";
import usePetition from "@/composables/usePetition";
import CatUnidadResponsable from "@/utils/models/cat_unidadResponsable";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition(
  "cat_unidad_responsable/"
);
const { arrayData , getDatas } = usePetition("cat_entidad_federativa/")

const data = ref<CatUnidadResponsable>({
  clave: "",
  descripcion: "",
  descripcion_corta: "",
  tipo_unidad: "",
  titular: "",
  subdirector: "",
  dependencia: "",
  codigo_postal: "",
  telefono: "",
  extension: "",
  calle: "",
  numero_exterior: "",
  numero_interior: "",
  colonia: "",
  folio_licitacion: "",
  folio_contratacion: "",
  nombre_contrato: "",
  nombre_jefe_laboratorio: "",
  entidad: ""
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_unidadResponsableValidations
);

const handleCancel = () => router.push({ name: "listar-cat_unidad_responsable" });

async function saveFase() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      router.push({ name: "listar-cat_unidad_responsable" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Unidad Responsable");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value
    ? "Editar Unidad Responsable"
    : "Crear Unidad Responsable";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.descripcion = response.descripcion;
        data.value.clave = response.clave;
        data.value.descripcion_corta = response.descripcion_corta;
        data.value.tipo_unidad = response.tipo_unidad;
        data.value.titular = response.titular;
        data.value.subdirector = response.subdirector;
        data.value.dependencia = response.dependencia;
        data.value.codigo_postal = response.codigo_postal;
        data.value.telefono = response.telefono;
        data.value.extension = response.extension;
        data.value.calle = response.calle;
        data.value.numero_exterior = response.numero_exterior;
        data.value.numero_interior = response.numero_interior;
        data.value.colonia = response.colonia;
        data.value.folio_licitacion = response.folio_licitacion;
        data.value.folio_contratacion = response.folio_contratacion;
        data.value.nombre_contrato = response.nombre_contrato;
        data.value.nombre_jefe_laboratorio = response.nombre_jefe_laboratorio;
        data.value.entidad = response.entidad;
      })
      .catch(() => {
        router.push({ name: "listar-cat_unidad_responsable" });
      });
  }
  getDatas({ page: 1,size:100 })
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
