<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import type { ISVGSettings } from "@/types/Widgets";
import {
    computed,
    getCurrentInstance,
    onMounted,
    ref,
    toRefs,
} from "vue";
import { useDatasourceRepository } from "../composables/datasourceRepository";
const props = defineProps<{ datasourceId: string, config: ISVGSettings }>();
const { datasourceId, config } = toRefs(props);

const { data } = useDatasourceRepository(datasourceId, "string");

const svgSource = ref("");
const inst = getCurrentInstance();
const scope = inst?.type.__scopeId;

onMounted(async () => {
    if (!config.value) return;
    if (!config.value.src) {
        config.value.src = "/demo/test.svg";
    };
    if (!config.value.classesConfig) {
        config.value.classesConfig = {
            primary: {
                fill: "#ff5733",
                stroke: "#1e8449",
                strokeWidth: "5px",
            }
        }
    }
    const req = await fetch(config.value.src);
    const svgObject = await req.text();
    svgSource.value = svgObject;
});

const styles = computed(() => {
    let string: string = "";

    if (config.value.classesConfig) {
        string += "<style>";
        for (const [key, value] of Object.entries(
            config.value.classesConfig as ISVGSettings,
        )) {
            string +=
                `[${scope}] .${key} {
                stroke: ${value.stroke};
                fill: ${value.fill};
                stroke-width: ${value.strokeWidth};
            }`;
        }
        string += "</style>";
    }

    return string;
});

const svgSourceParced = computed(() => {
    let processedString = svgSource.value;
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
</script>

<template>
    <div v-html="styles"></div>
    <div v-bind="$attrs" class="svg" v-html="svgSourceParced"></div>
</template>

<style scoped>
.svg {
    width: 100%;
    height: 100%;
}
</style>