<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <CardConfirmComponent title="¿Estás Seguro?" subtitle="El testigo social se dará de baja permanentemente."
          text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
          @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
          <div class="text-center mb-4">Detalle:</div>
          <div class="form-group">
            <label for="nombre-operacion">Clave</label>
            <input type="text" :value="data.clave" class="form-control" id="clave"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Nombre</label>
            <input type="text" :value="data.nombre" class="form-control" id="description"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Apellido Paterno </label>
            <input type="text" :value="data.apellido_paterno" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Apellido Materno </label>
            <input type="text" :value="data.apellido_materno" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">RFC Ts</label>
            <input type="text" :value="data.rfc_ts" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Dependencia Proveniente</label>
            <input type="text" :value="data.dependencia_proveniente" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Vigente</label>
            <input type="text" :value="isVigente" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
        </form>
      </div>
    </Transition>
  </template>
  <script setup lang="ts">
  import { reactive, ref, onMounted } from "vue";
  import { scrollTop } from "@/utils/helpers/scrollHelper";
  import router from "@/router";
  import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
  import usePetition from "@/composables/usePetition";
  import { ITestigoSocial, defaultValues } from "@/utils/models/testigoSocial";

  
  const viewName = "Eliminar testigo social";
  const { getData, deleteData } = usePetition("cat_testigo_social/");
  const itemId = ref("");
  const showView = ref(false)
  const data = reactive<ITestigoSocial>(defaultValues);
  const isVigente = ref()
  
  const handleCancel = () => router.push({ name: "listar-testigo-social" });
  const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
      router.push({ name: "listar-testigo-social" })
    );
  
  onMounted(() => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      getData(itemId.value).then((response) => {
        data.clave = response.clave;
        data.nombre = response.nombre;
        data.apellido_materno = response.apellido_materno;
        data.apellido_paterno = response.apellido_paterno;
        data.rfc_ts = response.rfc_ts;
        data.dependencia_proveniente = response.dependencia_proveniente;
        isVigente.value = response.vigente ? 'Si' : 'No';
        showView.value = true
      });
    } else return router.push({ name: "not-found" });
    scrollTop();
  });
  </script>
  <style lang="scss" scoped></style>