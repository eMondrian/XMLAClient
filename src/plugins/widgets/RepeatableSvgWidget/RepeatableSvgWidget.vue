<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import type { IRepeatableSVGSettings } from "@/types/Widgets";
import { onMounted, computed, ref, toRefs, watch } from "vue";
import { useDatasourceRepository } from "../composables/datasourceRepository";

const props = defineProps<{ datasourceId: string, config: IRepeatableSVGSettings }>();
const { datasourceId, config } = toRefs(props);
const svgSource = ref("");
const { data } = useDatasourceRepository(datasourceId, "string");

onMounted(async () => {
    if (!config.value) return;
    if (!config.value.src) {
        config.value.src = "/demo/human.svg";
    }
    if (config.value.src) {
        const req = await fetch(config.value.src);
        const svgObject = await req.text();
        svgSource.value = svgObject;
    }
    if (!config.value.activeItemStyles) {
        config.value.activeItemStyles = {
            fill: "#ff0000",
            stroke: "#ffff00"
        };
    }
    if (!config.value.defaultItemStyles) {
        config.value.defaultItemStyles = {
            fill: "#777777",
            stroke: "#777777"
        };
    }
    if (!config.value.repeations) {
        config.value.repeations = "4";
    }
    if (!config.value.progress) {
        config.value.progress = "0.5"
    }
});

const createParsedData = (prop: string) => {
    return computed(() => {
        let processedString = String(prop);
        const regex = /{(.*?)}/g;
        const parts = processedString.match(regex);

        if (!parts || !data.value) {
            return processedString;
        }

        parts.forEach((element: string) => {
            const trimmedString = element.replace("{", "").replace("}", "");
            const dataField = trimmedString.split(".");

            const res = dataField.reduce((acc: any, field) => {
                return acc[field];
            }, data.value);

            processedString = processedString.replace(element, res);
        });
        return processedString;
    });
};

const repeationsToNumber = computed(() => {
    return !isNaN(parseFloat(config.value.repeations))
        ? Math.floor(Number(config.value.repeations))
        : 0;
});

const progressToNumber = computed(() => {
    return !isNaN(parseFloat(createParsedData(config.value.progress).value))
        ? Number(createParsedData(config.value.progress).value)
        : 0;
});
</script>

<template>
    <div class="repeatable-svg-container">
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" :viewBox="`0 0 ${100 * repeationsToNumber} 100`"
            enable-background="new 0 0 100 100" xml:space="preserve">
            <defs>
                <mask id="bubbleKenseo">
                    <rect x="0" y="0" style="fill: #adadad" :width="100 * repeationsToNumber * progressToNumber"
                        height="100" />
                </mask>
            </defs>
            <g :fill="config.defaultItemStyles?.fill" :stroke="config.defaultItemStyles?.stroke">
                <g v-html="svgSource" v-for="index in repeationsToNumber"
                    :transform="`translate(${100 * (index - 1)}, 0)`" :key="index"></g>
            </g>
            <g mask="url(#bubbleKenseo)" :fill="config.activeItemStyles?.fill"
                :stroke="config.activeItemStyles?.stroke">
                <g v-html="svgSource" v-for="index in repeationsToNumber"
                    :transform="`translate(${100 * (index - 1)}, 0)`" :key="index"></g>
            </g>
        </svg>
    </div>
</template>

<style scoped>
.repeatable-svg-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    object-fit: contain;
}
</style>