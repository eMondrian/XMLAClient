<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { onMounted, shallowRef, getCurrentInstance, watch, ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{ dataSource: any }>();

const instance = getCurrentInstance();
const constructor = instance?.appContext.config.globalProperties.datasourceConfig.availableDatasources['Chart Composer'];
const tempStore = shallowRef(null as any);

console.log(constructor);

const data = ref(null as unknown as any);
const chartData = ref(null as unknown as any);
const chartOptions = ref({
  responsive: true,
});

onMounted(async () => {
  await updateData();
});

watch(() => props.dataSource, async () => {
  await updateData();
}, { deep: true });

const updateData = async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);

    try {
      const req = await tempStore.value?.getData("DataTable");
      data.value = req;

      const chartReq = await tempStore.value?.getData("ChartData");
      chartData.value = chartReq;
      console.log(chartData.value);
    } catch (e) {
      data.value = null;
    }
  }
}
</script>

<template>
  <div v-if="tempStore && data" class="flex flex-col h-full w-full gap-4">
    <div class="h-1/2 overflow-hidden">
      <VaDataTable :items="data.items" :stickyHeader="true" style="height: 100%;" />
    </div>
    <div class="h-1/2">
      <Bar id="my-chart-id" v-if="chartData && chartOptions" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>
