<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useDatasourceRepository } from '@/plugins/widgets/composables/datasourceRepository';
import { ref, toRefs } from 'vue';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{ datasourceId: string }>();
const { datasourceId } = toRefs(props);
const { data } = useDatasourceRepository(datasourceId, "ChartData");

const chartOptions = ref({
  responsive: true,
})

console.log(data);
</script>
<template> 
  <Bar
    id="my-chart-id"
    v-if="data && chartOptions"
    :options="chartOptions"
    :data="data"
  />
</template>
