<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { useDatasourceRepository } from '@/plugins/widgets/composables/datasourceRepository';
import { computed, onMounted, toRefs } from 'vue';
import type { IIconSettings } from '@/types/Widgets';

const props = defineProps<{ datasourceId: string, config: IIconSettings }>();
const { datasourceId, config } = toRefs(props);

const { data } = useDatasourceRepository(datasourceId, "object");

onMounted(() => {
    if (!config.value) return;
    if (!config.value.iconColor) {
        config.value.iconColor = "#000";
    }
    if (!config.value.iconSize) {
        config.value.iconSize = 100;
    }
    if (!config.value.isIconFilled) {
        config.value.isIconFilled = false;
    }
    if (!config.value.strokeWeight) {
        config.value.strokeWeight = 100;
    }
    if (!config.value.opticSize) {
        config.value.opticSize = 48;
    }
    if (!config.value.grade) {
        config.value.grade = 48;
    }
});

const iconStyle = computed(() => {
    if (!config.value) return;
    return `
  font-variation-settings:
    'FILL' ${config.value.isIconFilled ? 1 : 0},
    'wght' ${config.value.strokeWeight},
    'GRAD' ${config.value.grade},
    'opsz' ${config.value.opticSize};
  `;
});
</script>

<template>
    <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet" />
    <div class="icon">
        <span v-bind="$attrs" :style="iconStyle" class="material-symbols-outlined">{{ config.currentIcon }}</span>
    </div>
</template>

<style scoped>
.icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: v-bind(`${config.iconSize}px`);
    color: v-bind(config.iconColor);
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
}
</style>