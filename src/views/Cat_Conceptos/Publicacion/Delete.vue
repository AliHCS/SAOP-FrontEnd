<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red">
    <CardConfirmComponent title="¿Estás Seguro?" subtitle="La actividad institucional se dará de baja permanentemente."
        text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
        @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
        <div class="text-center mb-4">Detalle:</div>
        <div class="form-group">
            <label for="clave-pais">Clave</label>
            <input type="text" :value="data.clave" class="form-control" id="nombre-operacion"
                placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled>
        </div>
        <div class="form-group">
            <label for="nombre-operacion">Nombre</label>
            <input type="text" :value="data.nombre_oficial" class="form-control" id="nombre-operacion"
                placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled>
        </div>
        <div class="form-group">
            <label for="nombre-operacion">Capital</label>
            <input type="text" :value="data.capital" class="form-control" id="nombre-operacion"
                placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled>
        </div>
        <div class="form-group">
            <label for="siglas">Tipo de Gobiarno</label>
            <input type="text" :value="data.tipo_gobierno" class="form-control" id="siglas"
                placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled>
        </div>
        <div class="form-check">
            <input type="checkbox" :checked="data.estatus" class="form-check-input" id="es-ampliacion" disabled>
            <label class="form-check-label pl-4" for="es-ampliacion">
                Estatus
            </label>
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
    tipo_gobierno: "",    
    capital: "",    
    nombre_oficial: "",    
    estatus: false,
    clave: ""
})
const viewName = 'Eliminar Pais'
const {deleteData,getData,} =usePetition("cat_pais/");
const handleCancel = () => router.push({ name: 'listar-cat_Pais' })
const handleConfirm = () => deleteData(itemId.value).then(response => {
    if (response) {
        router.push({ name: 'listar-cat_Pais' })  
    }
});
onMounted(() => {
    itemId.value = route.params.id
    if (itemId.value) {
        getData(itemId.value).then(response => {
            data.nombre_oficial=response.nombre_oficial;
            data.capital=response.capital;
            data.tipo_gobierno=response.tipo_gobierno;
            data.clave=response.clave;
        }).catch(()=>{
            router.push({ name: 'listar-cat_Pais' })  
        })
    } else {return router.push({ name: 'not-found' })}
    scrollTop()
})

</script>
<style lang="scss" scoped></style>