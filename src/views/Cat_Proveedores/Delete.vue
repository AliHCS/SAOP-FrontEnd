<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="El Proveedor se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="nombre-operacion">Clave</label>
        <input
          type="text"
          :value="data.clave"
          class="form-control"
          id="nombre-operacion"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Nombre</label>
        <input
          type="text"
          :value="data.nombre"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Nombre Comercial</label>
        <input
          type="text"
          :value="data.nombre_comercial"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Giro Empresarial</label>
        <input
          type="text"
          :value="data.giro_empresarial"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="siglas">Calle</label>
        <input
          type="text"
          :value="data.calle"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">No. Exterior</label>
        <input
          type="text"
          :value="data.num_exterior"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">No. Interior</label>
        <input
          type="text"
          :value="data.num_interior"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Colonia</label>
        <input
          type="text"
          :value="data.colonia"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="siglas">Codigo Postal</label>
        <input
          type="text"
          :value="data.codigo_postal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Telefono</label>
        <input
          type="text"
          :value="data.telefono"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Extension</label>
        <input
          type="text"
          :value="data.extension"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Correo Electronico</label>
        <input
          type="text"
          :value="data.correo_electronico"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="siglas">Pagina Web</label>
        <input
          type="text"
          :value="data.direccion_pagina_web"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>

      <div class="form-group col-sm-6">
        <label for="siglas">Codigo Postal Fiscal</label>
        <input
          type="text"
          :value="data.codigo_postal_fiscal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Telefono Fiscal</label>
        <input
          type="text"
          :value="data.telefono_fiscal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Extensión Fiscal</label>
        <input
          type="text"
          :value="data.extension_fiscal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="siglas">Calle Fiscal</label>
        <input
          type="text"
          :value="data.calle_fiscal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Numero Exterior Fiscal -->
      <div class="form-group col-sm-6">
        <label for="num_exterior_fiscal">Número Exterior Fiscal</label>
        <input
          type="text"
          :value="data.num_exterior_fiscal"
          class="form-control"
          id="num_exterior_fiscal"
          placeholder="Introduzca el número exterior fiscal"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Numero Interior Fiscal -->
      <div class="form-group col-sm-6">
        <label for="num_interior_fiscal">Número Interior Fiscal</label>
        <input
          type="text"
          :value="data.num_interior_fiscal"
          class="form-control"
          id="num_interior_fiscal"
          placeholder="Introduzca el número interior fiscal"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Colonia Fiscal -->
      <div class="form-group col-sm-6">
        <label for="colonia_fiscal">Colonia Fiscal</label>
        <input
          type="text"
          :value="data.colonia_fiscal"
          class="form-control"
          id="colonia_fiscal"
          placeholder="Introduzca la colonia fiscal"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <!-- Correo Electrónico Fiscal -->
      <div class="form-group col-sm-6">
        <label for="correo_electronico_fiscal">Correo Electrónico Fiscal</label>
        <input
          type="text"
          :value="data.correo_electronico_fiscal"
          class="form-control"
          id="correo_electronico_fiscal"
          placeholder="Introduzca el correo electrónico fiscal"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Proveedor Estatus -->
      <div class="form-group col-sm-6">
        <label for="proveedor_estatus">Proveedor Estatus</label>
        <input
          type="text"
          :value="data.proveedor_estatus"
          class="form-control"
          id="proveedor_estatus"
          placeholder="Introduzca el estatus del proveedor"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- País -->
      <div class="form-group col-sm-6">
        <label for="pais">País</label>
        <input
          type="text"
          :value="data.pais"
          class="form-control"
          id="pais"
          placeholder="Introduzca el país"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Entidad -->
      <div class="form-group col-sm-6">
        <label for="entidad">Entidad</label>
        <input
          type="text"
          :value="data.entidad"
          class="form-control"
          id="entidad"
          placeholder="Introduzca la entidad"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <!-- Entidad Fiscal -->
      <div class="form-group col-sm-6">
        <label for="entidad_fiscal">Entidad Fiscal</label>
        <input
          type="text"
          :value="data.entidad_fiscal"
          class="form-control"
          id="entidad_fiscal"
          placeholder="Introduzca la entidad fiscal"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- IVA -->
      <div class="form-group col-sm-6">
        <label for="iva">IVA</label>
        <input
          type="text"
          :value="data.iva"
          class="form-control"
          id="iva"
          placeholder="Introduzca el IVA"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Municipio -->
      <div class="form-group col-sm-6">
        <label for="municipio">Municipio</label>
        <input
          type="text"
          :value="data.municipio"
          class="form-control"
          id="municipio"
          placeholder="Introduzca el municipio"
          autocomplete="off"
          disabled
        />
      </div>

      <!-- Municipio Fiscal -->
      <div class="form-group col-sm-6">
        <label for="municipio_fiscal">Municipio Fiscal</label>
        <input
          type="text"
          :value="data.municipio_fiscal"
          class="form-control"
          id="municipio_fiscal"
          placeholder="Introduzca el municipio fiscal"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-check col-sm-6">
        <input
          type="checkbox"
          :checked="data.tipo_personalidad"
          class="form-check-input"
          id="es-ampliacion"
          disabled
        />
        <label class="form-check-label pl-4" for="es-ampliacion">
          Tipo Personalidad
        </label>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
import { IProveedor, defaultValues } from "@/utils/models/cat_proveedores";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const data = ref<IProveedor>(defaultValues);

const viewName = "Eliminar Proveedores";
const { deleteData, getData } = usePetition("cat_proveedor/");
const handleCancel = () => router.push({ name: "listar-cat_proveedores" });
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-cat_proveedores" });
    }
  });

onMounted(async () => {
  itemId.value = route.params.id.toString();
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.clave = response.clave;
    data.value.nombre = response.nombre;
    data.value.nombre_comercial = response.nombre_comercial;
    data.value.giro_empresarial = response.giro_empresarial;
    data.value.tipo_personalidad = response.tipo_personalidad;
    data.value.calle = response.calle;
    data.value.num_exterior = response.num_exterior;
    data.value.num_interior = response.num_interior;
    data.value.colonia = response.colonia;
    data.value.codigo_postal = response.codigo_postal;
    data.value.extension = response.extension;
    data.value.direccion_pagina_web = response.direccion_pagina_web;
    data.value.correo_electronico = response.correo_electronico;
    data.value.codigo_postal_fiscal = response.codigo_postal_fiscal;
    data.value.telefono_fiscal = response.telefono_fiscal;
    data.value.extension_fiscal = response.extension_fiscal;
    data.value.calle_fiscal = response.calle_fiscal;
    data.value.num_exterior_fiscal = response.num_exterior_fiscal;
    data.value.num_interior_fiscal = response.num_interior_fiscal;
    data.value.colonia_fiscal = response.colonia_fiscal;
    data.value.correo_electronico_fiscal = response.correo_electronico_fiscal;
    data.value.telefono = response.telefono;
    data.value.proveedor_estatus = response.proveedor_estatus.descripcion;
    data.value.pais = response.pais.nombre_oficial;
    data.value.entidad = response.entidad.descripcion;
    data.value.entidad_fiscal = response.entidad_fiscal.descripcion;
    data.value.iva = response.iva.descripcion;
    data.value.municipio = response.municipio.descripcion;
    data.value.municipio_fiscal = response.municipio_fiscal.descripcion;
  } else {
    return router.push({ name: "not-found" });
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
