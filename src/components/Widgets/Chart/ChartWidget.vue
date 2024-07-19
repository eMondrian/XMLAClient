<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
export interface IChartSettingsProps {
    chartType?: string;
    title?: string;
    titlePosition?: string;
    legendPosition?: string
    borderColor?: string;
    canvasBackgroundColor?: string;
    dataSetBackgroundColors?: string[];
    X_axes?: {
      type: string;
      display: boolean;
      label: string;
      backgroundColor: string;
    };
    X_ticks?: {
      display: boolean;
      color: string;
      fontSize: number;
    };
    // Y_axes?: {
    //   type: string;
    //   display: boolean;
    //   label: string;
    // };
    // Y_ticks?: {
    //   display: boolean;
    //   color: string;
    //   fontSize: number;
    // };
}

import { computed, watch } from "vue";
import ChartWidgetSettings from "./ChartWidgetSettings.vue";
import { useSettings } from "@/composables/widgets/settings";
import { useStore } from "@/composables/widgets/store";
import { useSerialization } from "@/composables/widgets/serialization";
import type { Store } from "@/stores/Widgets/Store";
import { Bar, Line, Pie, Doughnut, Radar } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const settingsComponent = ChartWidgetSettings;

const props = withDefaults(defineProps<IChartSettingsProps>(), {
    chartType: "Bar",
    title: "Some value",
    titlePosition: "top",
    legendPosition: "top",
    borderColor: '#000000',
    // canvasBackgroundColor: "#ffffff",
    dataSetBackgroundColors: () => ["#ff0000", "#00ff00", "#0000ff"],
    X_axes: {
        type: "linear",
        display: {},
        label: "label",
        backgroundColor: "green"
    }
});

const { settings, setSetting } = useSettings<typeof props>(props);
const { store, data, setStore } = useStore<Store>();
const { getState } = useSerialization(settings);

defineExpose({
    setSetting,
    settings,
    settingsComponent,
    store,
    setStore,
    getState,
});

const chartComponent = computed(() => {
    switch (settings.value.chartType) {
        case 'Line':
            return Line;
        // case 'Pie':
        //     return Pie;
        // case 'Doughnut':
        //     return Doughnut;
        // case 'Radar':
        //     return Radar;
        default:
            return Bar;
    }
});

const chartData = computed(() => ({
    labels: ['January', 'February', 'March'],
    datasets: [{
        label: settings.value.title,
        data: [40, 20, 12],
        borderWidth: 2,
        backgroundColor: settings.value.dataSetBackgroundColors,
        // borderColor: settings.value.borderColor,
    }],
}));

const canvasBackgroundPlugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart: any) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = settings.value.canvasBackgroundColor;
        ctx.fillRect(chart.width, chart.height);
        ctx.restore();
    }
};

watch(
    () => settings.value.X_axes.type,
    (nv) => console.log(nv)
)

const chartOptions = computed(() => ({
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: settings.value.title,
            position: settings.value.titlePosition,
        },
        legend: {
            position: settings.value.legendPosition,
        },
        // customCanvasBackgroundColor: canvasBackgroundPlugin,
    },
    scales: {
        x: {
            // type: "linear",
            display: true,
            position: 'right',
            border: {
                color: 'red'
            },
            grid: {
                type: 'linear',
                color: 'red',
                borderColor: 'grey',
                tickColor: 'green'
            },
            ticks: {
                color: 'blue',
            }
        },
    },
    plugin: [canvasBackgroundPlugin]
}));
</script>

<template>
    <component :is="chartComponent" :data="chartData" :options="chartOptions"/>
</template>

<style scoped>
.chart-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1rem;
    align-items: stretch;
}
</style>
