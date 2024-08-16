<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveFase">
      <div class="row">
        <InputText
          v-model="data.clave"
          title="Clave:"
          placeholder="Clave"
          name="clave"
          id="clave"
          :disabled="itemId !== ''"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.nombre"
          title="Nombre:"
          placeholder="Nombre"
          name="nombre"
          id="nombre"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.nombre_comercial"
          title="Nombre Comercial:"
          placeholder="Nombre Comercial"
          name="nombre_comercial"
          id="nombre_comercial"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.giro_empresarial"
          title="Giro Empresarial:"
          placeholder="Giro Empresarial"
          name="giro_empresarial"
          id="giro_empresarial"
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
          v-model="data.num_exterior"
          title="Num Exterior:"
          placeholder="Num Exterior"
          name="num_exterior"
          id="num_exterior"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.num_interior"
          title="Num Interior:"
          placeholder="Num Interior"
          name="num_interior"
          id="num_interior"
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
          v-model="data.codigo_postal"
          title="Codigo Postal:"
          placeholder="Codigo Postal"
          name="codigo_postal"
          id="codigo_postal"
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
        <InputText
          v-model="data.direccion_pagina_web"
          title="Direccion Pagina Web:"
          placeholder="Direccion Pagina Web"
          name="direccion_pagina_web"
          id="direccion_pagina_web"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.correo_electronico"
          title="Correo Electronico:"
          placeholder="Correo Electronico"
          name="correo_electronico"
          id="correo_electronico"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.codigo_postal_fiscal"
          title="Codigo Postal Fiscal:"
          placeholder="Codigo Postal Fiscal"
          name="codigo_postal_fiscal"
          id="codigo_postal_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.telefono_fiscal"
          title="Telefono Fiscal:"
          placeholder="Telefono Fiscal"
          name="telefono_fiscal"
          id="telefono_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.extension_fiscal"
          title="Extension Fiscal:"
          placeholder="Extension Fiscal"
          name="extension_fiscal"
          id="extension_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.calle_fiscal"
          title="Calle Fiscal:"
          placeholder="Calle Fiscal"
          name="calle_fiscal"
          id="calle_fiscal"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.num_exterior_fiscal"
          title="Num. Exterior Fiscal:"
          placeholder="Num. Exterior Fiscal"
          name="num_exterior_fiscal"
          id="num_exterior_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.num_exterior_fiscal"
          title="Num. Interior Fiscal:"
          placeholder="Num. Interior Fiscal"
          name="num_interior_fiscal"
          id="num_interior_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.colonia_fiscal"
          title="Colonia Fiscal:"
          placeholder="Colonia Fiscal"
          name="colonia_fiscal"
          id="colonia_fiscal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.correo_electronico_fiscal"
          title="Correo Electronico Fiscal:"
          placeholder="Correo Electronico Fiscal"
          name="correo_electronico_fiscal"
          id="correo_electronico_fiscal"
          :error="errors"
          class="col-sm-6"
        />
      </div>
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
        <SelectComponent
          v-model="data.proveedor_estatus"
          title="Proveedor Estatus:"
          placeholder="Proveedor Estatus"
          name="proveedor_estatus"
          id="proveedor_estatus"
          :error="errors"
          class="col-sm-6"
          :options="dataEstatus.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
        <SelectComponent
          v-model="data.iva"
          title="Iva:"
          placeholder="Iva"
          name="iva"
          id="iva"
          :error="errors"
          class="col-sm-6"
          :options="dataIva.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
        <SelectComponent
          v-model="data.pais"
          title="Pais :"
          placeholder="Pais "
          name="pais"
          id="pais"
          :error="errors"
          class="col-sm-6"
          :options="dataPais.data"
          :optionText="'nombre_oficial'"
          :optionValue="'id'"
        />
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.entidad"
          title="Entidad :"
          placeholder="Entidad "
          name="entidad"
          id="entidad"
          :error="errors"
          class="col-sm-6"
          :options="dataEntidadFederativa.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
          @onChange="searchMunicipios(data.entidad, false)"
        />
        <SelectComponent
          v-model="data.entidad_fiscal"
          title="Entidad Fiscal:"
          placeholder="Entidad Fiscal"
          name="entidad_fiscal"
          id="entidad_fiscal"
          :error="errors"
          class="col-sm-6"
          :options="dataEntidadFederativa.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
          @onChange="searchMunicipios(data.entidad_fiscal, true)"
        />
        <SelectComponent
          v-model="data.municipio"
          title="Municipio:"
          placeholder="Municipio"
          name="municipio"
          id="municipio"
          :error="errors"
          class="col-sm-6"
          :options="municipioData"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
        <SelectComponent
          v-model="data.municipio_fiscal"
          title="Municipio Fiscal:"
          placeholder="Municipio Fiscal"
          name="municipio_fiscal"
          id="municipio_fiscal"
          :error="errors"
          class="col-sm-6"
          :options="municipioFiscalData"
          :optionText="'descripcion'"
          optionValue="id"
        />
        <InputText
          v-model="data.rfc"
          title="RFC:"
          placeholder="Rfc"
          name="rfc"
          id="rfc"
          :error="errors"
          class="col-sm-6"
        />
        <div class="form-check col-sm-6 mt-5">
          <input
            v-model.trim="data.tipo_personalidad"
            type="checkbox"
            id="usa_imagen"
          />
          <label class="form-check-label pl-4" for="usa_imagen">
            Tipo Personalidad
          </label>
        </div>
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
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import { sortedByField } from "@/utils/helpers/formatDataHelper";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { cat_proveedoresValidations } from "@/utils/validations/cat_proveedoresValidations";
import usePetition from "@/composables/usePetition";
import { IProveedor, defaultValues } from "@/utils/models/cat_proveedores";
import { IMunicipio } from "@/utils/models/municipio";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const municipioData = ref<IMunicipio[]>([]);
const municipioFiscalData = ref<IMunicipio[]>([]);

const { updateData, getData, createData } = usePetition("cat_proveedor/");

const { arrayData: dataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");

const {
  arrayData: dataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");

const { customPetition } = usePetition("cat_municipio/");

const { arrayData: dataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");

const { arrayData: dataIva, getDatas: getDatasIva } = usePetition("cat_iva/");

const data = ref<IProveedor>(defaultValues);

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_proveedoresValidations
);

const handleCancel = () => {
  resetForm();
  router.push({ name: "listar-cat_proveedores" });
};

async function saveFase() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      resetForm();
      router.push({ name: "listar-cat_proveedores" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Sub-Estatus");

const resetForm = () => {
  data.value.clave = "";
  data.value.nombre = "";
  data.value.nombre_comercial = "";
  data.value.giro_empresarial = "";
  data.value.tipo_personalidad = false;
  data.value.calle = "";
  data.value.num_exterior = "";
  data.value.num_interior = "";
  data.value.colonia = "";
  data.value.codigo_postal = "";
  data.value.extension = "";
  data.value.direccion_pagina_web = "";
  data.value.correo_electronico = "";
  data.value.codigo_postal_fiscal = "";
  data.value.telefono_fiscal = "";
  data.value.extension_fiscal = "";
  data.value.calle_fiscal = "";
  data.value.num_exterior_fiscal = "";
  data.value.num_interior_fiscal = "";
  data.value.colonia_fiscal = "";
  data.value.correo_electronico_fiscal = "";
  data.value.telefono = "";
  data.value.proveedor_estatus = "";
  data.value.pais = "";
  data.value.entidad = null;
  data.value.entidad_fiscal = null;
  data.value.iva = "";
  data.value.municipio = "";
  data.value.municipio_fiscal = "";
  data.value.rfc = "";
};

const searchMunicipios = async (
  idEntidad: number | null,
  isFiscal: boolean
) => {
  if (isFiscal) {
    const response = await customPetition(
      HTTP_METHODS.GET,
      {},
      "",
      `entidad_federativa=${idEntidad}`
    );
    municipioFiscalData.value = response.results;
    municipioFiscalData.value = sortedByField(
      municipioFiscalData.value,
      "descripcion"
    );
  } else {
    const response = await customPetition(
      HTTP_METHODS.GET,
      {},
      "",
      `entidad_federativa=${idEntidad}`
    );
    municipioData.value = response.results;
    municipioData.value = sortedByField(municipioData.value, "descripcion");
  }
};

onMounted(async () => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Proveedores" : "Crear Proveedores";

  await Promise.all([
    getDatasEstatus({ page: 1, size: 100 }),
    getDatasEntidadFederativa({ page: 1, size: 100 }),
    /* getDatasMunicipio({ page: 1, size: 100 }), */
    /* searchMunicipio({ page: 1, entidad_federativa: 2, page_size: 100 }), */
    getDatasPais({ page: 1, size: 100 }),
    getDatasIva({ page: 1, size: 100 }),
  ]);

  dataEstatus.value.data = sortedByField(dataEstatus.value.data, "descripcion");
  dataEntidadFederativa.value.data = sortedByField(
    dataEntidadFederativa.value.data,
    "descripcion"
  );
  dataPais.value.data = sortedByField(dataPais.value.data, "nombre_oficial");
  dataIva.value.data = sortedByField(dataIva.value.data, "descripcion");
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.clave = response.clave;
    data.value.rfc = response.rfc;
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
    data.value.proveedor_estatus = response.proveedor_estatus.id;
    data.value.pais = response.pais.id;
    data.value.entidad = response.entidad.id;
    data.value.entidad_fiscal = response.entidad_fiscal.id;
    data.value.iva = response.iva.id;
    const responseMunicipioFiscal = await customPetition(
      HTTP_METHODS.GET,
      {},
      "",
      `entidad_federativa=${response.municipio_fiscal.entidad_federativa}`
    );
    municipioFiscalData.value = responseMunicipioFiscal.results;
    municipioFiscalData.value = sortedByField(
      municipioFiscalData.value,
      "descripcion"
    );

    const responseMunicipio = await customPetition(
      HTTP_METHODS.GET,
      {},
      "",
      `entidad_federativa=${response.municipio.entidad_federativa}`
    );
    municipioData.value = responseMunicipio.results;
    municipioData.value = sortedByField(municipioData.value, "descripcion");
    data.value.municipio = response.municipio.id;
    data.value.municipio_fiscal = response.municipio_fiscal.id;

    errors.value = [];
    formState.value = data.value;
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
