<template>
    <div>
      <!-- Alerta de error de tipo de documento -->
      <AlertComponent v-if="errorTypeDocument && !finishedProcess && !loadingData" title="Error en el formato del archivo!"
        @onConfirm="handleReset" type="warning">
        <template v-slot:body>
          <p>
            El formato de tu archivo no es válido. Favor de cargar un archivo con
            extensión .xlsx, .xls, .csv
          </p>
          <hr />
        </template>
      </AlertComponent>
  
      <!-- Alerta de carga de datos -->
      <AlertComponent v-if="loadingData && !finishedProcess && !errorTypeDocument" title="Cargando Datos"
        :showButton="false">
        <template v-slot:body>
          <div class="spinner-border text-success mb-10" style="width: 3rem; height: 3rem">
            <span class="sr-only">Loading...</span>
          </div>
          <p class="mb-0">
            <strong>Espere un momento mientras se terminan de procesar los
              datos</strong>
          </p>
        </template>
      </AlertComponent>
  
      <!-- Alerta de error global -->
      <AlertComponent v-if="globalError && finishedProcess && !loadingData" title="Error al cargar los datos!"
        @onConfirm="handleReset" type="warning">
        <template v-slot:body>
          <p>
            Ocurrió un error al subir tu archivo, favor de verificar
            extensión/archivo.
          </p>
          <hr />
          <hr />
        </template>
      </AlertComponent>
  
      <!-- Alerta de datos erróneos por estado -->
      <AlertComponent v-if="finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        wrongData && (getErrosByState || headerErrors)
        " title="Datos Erróneos" @onConfirm="handleReset" type="warning">
        <template v-slot:body>
          <p>Se encontraron datos erróneos en el archivo.</p>
          <hr />
          <table class="table">
            <thead>
              <tr >
                <th v-if="getErrosByState" class="text-center">Fila</th>
                <th class="text-center">Error</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="error in allErrors">
                <td v-if="error.row">{{ error.row }}</td>
                <td class="text-center" v-html="error.error"></td>
              </tr>
            </tbody>
          </table>
        </template>
      </AlertComponent>
      <AlertComponent v-if="finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        getErroresOthers &&
        wrongData && getErroresOthers?.length > 0 &&
        !errorShowCabeceras
        " title="Datos erroneos" @onConfirm="handleReset" type="warning">
        <template v-slot:body>
            <p>Se encontraron datos erroneos en el archivo.</p>
            <hr />
            <table class="table">
            <thead>
              <tr >
                <th class="text-center">Registro</th>
                <th class="text-center">Error</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="value in (getErroresOthers as any)">
                <tr>
                  <td>{{ value.registro }}</td>
                  <td>
                      <ul class="list-group list-group-flush lh-sm overflow-auto">
                          <li class="lh-sm" v-for="(fieldValue, fieldName) in value.errores" :key="fieldName">
                              <template v-if="String(fieldName) !== 'id' && String(fieldName) !== 'registro'">
                                  <strong>{{ fieldName.toString().toUpperCase() }}</strong>: 
                                  <li v-for="errorText in fieldValue">
                                    {{ errorText }}
                                  </li>
                              </template>
                          </li>
                      </ul>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </template>
      </AlertComponent>
      <AlertComponent v-if="finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        getErroresOthers &&
        wrongData && getErroresOthers?.length > 0 &&
        errorShowCabeceras
        " title="Datos erroneos" @onConfirm="handleReset" type="warning">
        <template v-slot:body>
            <p>Se encontraron datos erroneos en el archivo.</p>
            <hr />
            <table class="table">
            <thead>
              <tr >
                <th class="text-center">Errores en cabeceras</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="value in (getErroresOthers as any)">
                <tr>
                  <td>
                      <ul class="list-group list-group-flush lh-sm overflow-auto">
                          <li class="lh-sm" v-for="(fieldValue, fieldName) in value" :key="fieldName">
                              <template v-if="String(fieldName) !== 'id' && String(fieldName) !== 'registro'">
                                  <strong>{{ fieldName.toString().toUpperCase() }}</strong>: 
                                  <li v-for="errorText in fieldValue">
                                    {{ errorText }}
                                  </li>
                              </template>
                          </li>
                      </ul>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </template>
      </AlertComponent>
    </div>
  </template>
  
  <script setup lang="ts">
  import AlertComponent from "@/components/AlertComponent.vue";
  import { computed, toRefs  } from "vue";
  
  
  const props = defineProps({
  errorTypeDocument: Boolean,
  finishedProcess: Boolean,
  loadingData: Boolean,
  globalError: Boolean,
  wrongData: Boolean,
  getErrosByState: Array,
  headerErrors: Array,
  getErrosRedAutopistasCapufe: Array,
  reset: Function,
  getErroresOthers: Array,
  errorShowCabeceras: Boolean
});

// Convertir props a referencias reactivas
const { errorTypeDocument, finishedProcess, loadingData, globalError, wrongData, getErrosByState, headerErrors, reset } = toRefs(props);

  
const handleReset = () => {
  if (reset?.value && typeof reset.value === 'function') {
    reset.value();
  }
};
  
  const allErrors = computed(() => {
    console.log('------------')
    console.log(getErrosByState?.value)
    let errors = <any>[];
    if (getErrosByState?.value) {
      getErrosByState.value.forEach((error_block: any) => {
        Object.keys(error_block.errores).forEach((key: any) => {
          errors.push({ row: error_block.registro, error: error_block.errores[key][0] });
        });
      });
    } else if (headerErrors?.value) {
      let bad_headers = <any>headerErrors?.value[0]
      if(bad_headers.faltantes) errors.push({ error: `Faltan los siguientes encabezados: <b>${bad_headers.faltantes}</b>` })
      if(bad_headers.extras) errors.push({ error: `No deben incluirse los siguientes encabezados: <b>${bad_headers.extras}</b>` })
    }
    return errors;
  });
  
  </script>

<style scoped>
.table .text-center {
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 200px; /* Ajusta este valor según el ancho deseado para tus celdas */
}
</style>