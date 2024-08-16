<template>
    <div>
        <!-- <DataTableComponent v-if="!loading" rowId="partida" hideActions :columns="[...columns, ...extraColumns]" :data="data"
            :pagination="[]" @onPaginate="" /> -->
        <div class="table-responsive" v-if="!loading">
            <table class="table table-responsive">
                <thead class="table-gob">
                    <tr>
                        <th v-for="col in columns" class="text-center header-cell">
                            {{ col.title }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(DataCartera, index) in data">
                        <tr>
                            <template v-for="col in columns">
                                <td class="table-important">
                                    <!-- showInput(value.clasificacion, col.data) -->
                                    <input class="form-control" type="text" maxlength="15"
                                        v-model="DataCartera[col.data]" @copy="$event.preventDefault()"
                                        @paste="$event.preventDefault()" @cut="$event.preventDefault()" @input="emit('inputChange', {data:col.data, dataCartera:DataCartera, index})" :disabled="col.data !== 'precio'" />
                                </td>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup lang="ts">
// import DataTableComponent from "@/components/DataTableComponent.vue";
import { ref, watch, onMounted } from "vue"

const props = defineProps({
    data: {
        type: Array<any>,
        default: []
    },
    procedimiento: {
        type: Object,
        default: {}
    },
});

const emit = defineEmits([
    "inputChange",
  ]);

const loading = ref(true)
const data: any = ref([])
let extraColumns: any = []
let columns = [
    { title: "Partida", data: "partida", align: "center" },
    { title: "Descripción", data: "descripcion", align: "left" },
    { title: "Cantidad ", data: "cantidad", align: "left" },
    { title: "Acumulado ", data: "acumulado", align: "left" },
    { title: "Precio", data: "precio", align: "left" },
    { title: "Importe", data: "importe", align: "left" },
];

function obtenerMeses(inicio: string, final: string) {
    const meses: any = {};
    extraColumns = []
    const mesesNombres: any = {
        0: 'Enero',
        1: 'Febrero',
        2: 'Marzo',
        3: 'Abril',
        4: 'Mayo',
        5: 'Junio',
        6: 'Julio',
        7: 'Agosto',
        8: 'Septiembre',
        9: 'Octubre',
        10: 'Noviembre',
        11: 'Diciembre'
    }

    let fechaActual = new Date(inicio);
    const fechaFinal = new Date(final);

    while (fechaActual.getMonth() <= fechaFinal.getMonth()) {
        const mes = fechaActual.getMonth();
        meses[mesesNombres[mes]] = 0
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        extraColumns.push({
            title: mesesNombres[mes],
            data: mesesNombres[mes],
            align: "left"
        })
    }
    return meses;
}

const decorateData = () => {
    // loading.value = true;
    data.value = []
    new Promise<void>((resolve) => {
        const meses = obtenerMeses(props.procedimiento.fecha_inicio, props.procedimiento.fecha_fin)
        props.data.forEach((el: any) => {
            data.value.push({
                ...el,
                ...meses
            })
        });
        resolve()
    }).then(() => {
        // loading.value = false;
    });
};

onMounted(() => {
    decorateData()
    loading.value = false
});

watch(
    () => props.data,
    () => {
        decorateData()
    },
    {
        deep: true,
    }
);

</script>