<template>
  <div class="table table-striped table-bordered table-responsive">
    <table class="table">
      <thead>
        <slot name="head"></slot>
        <tr class="table-gob">
          <template v-for="(_, key) in data[0]">
            <th v-if="!key.toString().includes('porcentaje')" :key="key">
              {{ key }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          :class="checkClass(item)"
        >
          <template v-for="(_, key) in data[0]">
            <td
              v-if="!key.toString().includes('porcentaje')"
              :key="key"
              :class="checkCellClass(key)"
            >
              {{
                key === "Año" || key === "Años"
                  ? item[key]
                  : transformData(item[key])
              }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as () => Array<{ [key: string]: any }>,
    required: true,
  },
  dataBold: {
    type: Array,
    required: false,
  },
  keyBold: {
    type: String,
    required: false,
  },
  columnBold: {
    type: Array,
    required: false,
  },
});

const transformData = (value: any) => {
  const formatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (
    typeof value === "number" ||
    (typeof value === "string" && !isNaN(Number(value)))
  ) {
    const numericValue = typeof value === "number" ? value : parseFloat(value);
    return numericValue.toLocaleString("es-MX", formatOptions);
  }

  return value;
};

const checkClass = (item: any) => {
  let clase = "";
  const key = props.keyBold ? props.keyBold : "";

  if (props.dataBold) {
    if (props.dataBold.includes(item[key])) {
      clase = "strong";
    }
  }

  return clase;
};

const checkCellClass = (columnKey: string | number) => {
  let clase = "";

  if (props.columnBold) {
    if (props.columnBold.includes(columnKey)) {
      clase = "strong";
    }
  }

  return clase;
};
</script>
<style lang="scss">
.table-gob {
  background-color: #691c32;
  color: #fff;
}

.strong {
  font-weight: 600;
}
</style>
