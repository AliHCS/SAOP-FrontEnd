<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent title="¿Estás Seguro?" subtitle="La unidad responsable se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
    @onCancel="handleCancel" />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
    <div class="form-group col-sm-6">
      <label for="nombre-operacion">clave</label>
      <input type="text" :value="data.clave" class="form-control" id="nombre-operacion"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Descripción</label>
      <input type="text" :value="data.descripcion" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Descripción Corta</label>
      <input type="text" :value="data.descripcion_corta" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group  col-sm-6">
      <label for="siglas">Tipo de Unidad</label>
      <input type="text" :value="data.tipo_unidad" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Titular</label>
      <input type="text" :value="data.titular" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Subdirector</label>
      <input type="text" :value="data.subdirector" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Dependencia</label>
      <input type="text" :value="data.dependencia" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Codigo Postal</label>
      <input type="text" :value="data.codigo_postal" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Telefono</label>
      <input type="text" :value="data.telefono" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Extension</label>
      <input type="text" :value="data.extension" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Calle</label>
      <input type="text" :value="data.calle" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">No. Exterior</label>
      <input type="text" :value="data.numero_exterior" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">No. Interior</label>
      <input type="text" :value="data.numero_interior" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Colonia</label>
      <input type="text" :value="data.colonia" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Folio de Licitacion</label>
      <input type="text" :value="data.folio_licitacion" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Folio de Contratacion</label>
      <input type="text" :value="data.folio_contratacion" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="row">
    <div class="form-group col-sm-6">
      <label for="siglas">Nombre del Contrato</label>
      <input type="text" :value="data.nombre_contrato" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-group col-sm-6">
      <label for="siglas">Jefe de Laboratorio</label>
      <input type="text" :value="data.nombre_jefe_laboratorio" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
  </div>
  <div class="form-group col-sm-6">
      <label for="siglas">Entidad</label>
      <input type="text" :value="data.entidad" class="form-control" id="siglas"
        placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
    </div>
    <div class="form-check">
      <input type="checkbox" :checked="data.estatus" class="form-check-input" id="es-ampliacion" disabled />
      <label class="form-check-label pl-4" for="es-ampliacion"> Estatus </label>
    </div>
  </form>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const data = reactive({
  descripcion: "",
  estatus: false,
  clave: "",
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
  entidad: "",
});
const viewName = "Eliminar Unidad Responsable";
const { deleteData, getData } = usePetition("cat_unidad_responsable/");
const handleCancel = () => router.push({ name: "listar-cat_unidad_responsable" });
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-cat_unidad_responsable" });
    }
  });
onMounted(() => {
  itemId.value = route.params.id;
  if (itemId.value) {
    getData(itemId.value)
      .then((response) => {
        data.descripcion = response.descripcion;
        data.estatus = response.estatus;
        data.clave = response.clave;
        data.descripcion_corta = response.descripcion_corta;
        data.tipo_unidad = response.tipo_unidad;
        data.titular = response.titular;
        data.subdirector = response.subdirector;
        data.extension = response.extension;
        data.codigo_postal = response.codigo_postal;
        data.dependencia = response.dependencia;
        data.telefono = response.telefono;
        data.calle = response.calle;
        data.numero_exterior = response.numero_exterior;
        data.numero_interior = response.numero_interior;
        data.colonia = response.colonia;
        data.folio_licitacion = response.folio_licitacion;
        data.folio_contratacion = response.folio_contratacion;
        data.nombre_contrato = response.nombre_contrato;
        data.nombre_jefe_laboratorio = response.nombre_jefe_laboratorio;
        data.entidad = response.entidad;
      })
      .catch(() => {
        router.push({ name: "listar-cat_unidad_responsable" });
      });
  } else {
    return router.push({ name: "not-found" });
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
