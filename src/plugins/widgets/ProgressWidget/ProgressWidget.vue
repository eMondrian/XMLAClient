<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script setup lang="ts">
import { useDatasourceRepository } from '@/plugins/widgets/composables/datasourceRepository';
import type { IProgressSettings } from '@/types/Widgets';
import { computed, onMounted, toRefs } from 'vue';

const props = defineProps<{ datasourceId: string, config: IProgressSettings }>();
const { datasourceId, config } = toRefs(props);

const { data } = useDatasourceRepository(datasourceId, "string");

onMounted(() => {
    if (!config.value) return;
    if (!config.value.fillColor) {
        config.value.fillColor = "#00FF00";
    }
    if (!config.value.backgroundColor) {
        config.value.backgroundColor = "#D3D3D3";
    }
    if (!config.value.rotation) {
        config.value.rotation = 90;
    }
});

const backgroundProgressColor = computed(() => {
    return config.value.isGradient
        ? `linear-gradient(${config.value.rotation}deg, ${config.value.gradientColor})`
        : `${config.value.fillColor}`;
});

const transition = computed(() => {
    return config.value.isVertical ? "height .7s ease" : "width .7s ease";
});

const verticalPositionFiller = computed(() => {
    return config.value.isVertical
        ? `${parseFloat(config.value.progress ?? data.value)}%`
        : "35px";
});

const horizontalPositionFiller = computed(() => {
    return !config.value.isVertical
        ? `${parseFloat(config.value.progress ?? data.value)}%`
        : "35px";
});

const verticalPositionBackground = computed(() => {
    return config.value.isVertical ? "35px" : "100%";
});

const horizontalPositionBackground = computed(() => {
    return !config.value.isVertical ? "35px" : "100%";
});
</script>

<template>
    <div class="container">
        <div class="progress">
            <span>
                {{ config.progress ?? data }}%
            </span>
            <div class="progress-percent"></div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress {
    width: v-bind(verticalPositionBackground);
    height: v-bind(horizontalPositionBackground);
    background: v-bind(config.backgroundColor);
    border-radius: 10px;
    display: flex;
    align-items: end;
    position: relative;
}

.progress-percent {
    height: v-bind(verticalPositionFiller);
    width: v-bind(horizontalPositionFiller);
    background: v-bind(backgroundProgressColor);
    transition: v-bind(transition);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    z-index: 1000;
}
</style>