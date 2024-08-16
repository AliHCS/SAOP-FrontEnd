<template>
    <Transition name="view">
        <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-12 pl-0">
                        <div class="col-sm-6 mb-4">
                            <label for="nombre-operacion">Clave</label>
                            <input :disabled="isEditing" type="text" v-model="data.clave" class="form-control" id="description-position"
                                placeholder="Ingrese clave..." autocomplete="off" />
                        </div>
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Nombre</label>
                        <input type="text" v-model="data.nombre" class="form-control" id="description-position"
                            placeholder="Ingrese nombre..." autocomplete="off" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Apellido Paterno</label>
                        <input type="text" v-model="data.apellido_paterno" class="form-control"
                            id="description-position" placeholder="Ingrese apellido..." autocomplete="off" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Apellido Materno</label>
                        <input type="text" v-model="data.apellido_materno" class="form-control"
                            id="description-position" placeholder="Ingrese apellido..." autocomplete="off" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">RFC Ts</label>
                        <input type="text" v-model="data.rfc_ts" class="form-control" id="description-position"
                            placeholder="Ingrese RFC..." autocomplete="off" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Dependencia Proveniente</label>
                        <input type="text" v-model="data.dependencia_proveniente" class="form-control"
                            id="description-position" placeholder="Ingrese dependencia..." autocomplete="off" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Vigente</label>
                        <select class="form-control" v-model="data.vigente">
                            <option :value="true">Si</option>
                            <option :value="false">No</option>
                        </select>
                    </div>
                </div>

                <div class="modal-footer col-sm-12">
                    <button type="button" class="btn btn-secondary" @click="handleCancel">
                        Cancelar
                    </button>
                    <button type="button" @click="handleSubmit" class="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ITestigoSocial, defaultValues } from "@/utils/models/testigoSocial";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_testigo_social/");

const viewName = ref("Registrar testigo social");
var data = reactive<ITestigoSocial>({ ...defaultValues });
const itemId = ref("");
const isEditing = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-testigo-social" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-testigo-social" });
        });
    } else {
        createData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-testigo-social" });
        });
    }

};

const resetValues = () => {
    Object.assign(data, { ...defaultValues });
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar testigo social";
        getData(itemId.value).then((response) => {
            data.nombre = response.nombre;
            data.apellido_paterno = response.apellido_paterno;
            data.apellido_materno = response.apellido_materno;
            data.rfc_ts = response.rfc_ts;
            data.dependencia_proveniente = response.dependencia_proveniente;
            data.vigente = response.vigente;
            data.clave = response.clave;
        })
        isEditing.value = true
    } else {
        isEditing.value = false
        resetValues()
    }
    scrollTop();
});

</script>