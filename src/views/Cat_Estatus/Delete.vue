<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red">
    <CardConfirmComponent title="¿Estás Seguro?" subtitle="El estatus se dará de baja permanentemente."
        text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
        @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
        <div class="text-center mb-4">Detalle:</div>
        <div class="form-group">
            <label for="clave">Clave</label>
            <input type="text" :value="data.clave" class="form-control" id="clave"
                placeholder="Introduzca la clave" autocomplete="off" disabled>
        </div>
        <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="text" :value="data.descripcion" class="form-control" id="descripcion"
                placeholder="Introduzca la descripcion" autocomplete="off" disabled>
        </div>
        <div class="form-group">
            <label for="proceso">Proceso</label>
            <select id="proceso" class="form-control" v-model="data.fk_proceso" disabled>
                <option v-for="option in arrayDataProceso.data" :key="option.id" :value="option.id">{{ option.descripcion }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="fecha">Fecha</label>
            <input type="datetime-local" :value="data.fecha" class="form-control" id="fecha"
                 autocomplete="off" disabled>
        </div>
    </form>
   
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { scrollTop } from '@/utils/helpers/scrollHelper';
import { useRoute, useRouter } from 'vue-router'
import CardConfirmComponent from '@/components/CardConfirmComponent.vue';
import usePetition from '@/composables/usePetition';

const itemId = ref<any>({value:0});
const route = useRoute()
const router = useRouter();
const data = reactive({
    clave: "",    
    descripcion: "",    
    fecha: "",    
    fk_proceso: "",
})
const viewName = 'Eliminar Estatus'
const {deleteData,getData,} =usePetition("cat_estatus/");
const {arrayData: arrayDataProceso, getDatas: getDatasProceso } = usePetition("cat_proceso/");
const handleCancel = () => router.push({ name: 'listar-cat-estatus' })
const handleConfirm = () => deleteData(itemId.value).then(response => {
    if (response) {
        router.push({ name: 'listar-cat-estatus' })  
    }
});
onMounted(() => {
    getDatasProceso({ page: 1, size: 100 })
    itemId.value = route.params.id
    if (itemId.value) {
        getData(itemId.value).then(response => {
            data.clave=response.clave;
            data.descripcion=response.descripcion;
            data.fecha=response.fecha;
            data.fk_proceso=response.fk_proceso;
        }).catch(()=>{
            router.push({ name: 'listar-cat-estatus' })  
        })
    } else {return router.push({ name: 'not-found' })}
    scrollTop()
})

</script>
<style lang="scss" scoped></style>