<script setup lang="ts">
import { watch, computed } from "vue";
import type { AxisSettings } from "@/plugins/charts/widgets/BarChartWidgetSettings.vue";
import type { IChartComponent } from "chart.js/dist/core/core.typedRegistry";


const model = defineModel() as any;

console.log(model.value);

const props = defineProps<{
    axes: { [key: string]: AxisSettings };
    component: IChartComponent;
}>();

const headers = computed(() => {
    return Object.keys(model.value.data).map((key) => ({
        header: key,
        id: key,
    }));
});

watch(
    () => [model.value.mainAxisRotate],
    async () => {
        // await model.value.fetch();
        model.value.data = await model.value.getData();
    },
    { deep: true },
);

const axis_names = computed((e) => {
    return Object.keys(props.axes).filter((name) => name != "x");
});

const xSel = computed({
    get: () => {
        return model.value?.getSelectorX();
    },
    set: (val) => {
        model.value?.setSelectorX(val);
    },
});

const updateSelectorY = (value, axisName) => {
    const selection = value.map((e) => headers.value.find((h) => h.id === e));
    model.value?.setSelectorsY(selection, axisName);
    // model.value?.setSelectorY(selector, value, axisName);
};

const getAxisSelection = (axisName) => {
    return model.value?.getSelectorY(axisName).map((e) => e.id);
};
</script>

<template>
    <div class="composer">
        <div>
            <VaCheckbox
                v-model="model.mainAxisRotate"
                class="mb-4"
                label="Rotate axises"
            />
        </div>
        <div>
            <div>
                <div>xAxis:</div>
                <div>
                    <VaSelect
                        v-model="xSel"
                        :options="headers"
                        text-by="header"
                        placeholder="Select an header for X"
                    />
                </div>
            </div>
            <div>
                <div>yAxis:</div>
                <div v-for="name in axis_names" :key="name">
                    <div>{{ name }}</div>
                    <VaSelect
                        :model-value="getAxisSelection(name)"
                        @update:model-value="
                            (event) => updateSelectorY(event, name)
                        "
                        :options="headers"
                        text-by="header"
                        value-by="id"
                        multiple
                        placeholder="Select an header for Y"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
