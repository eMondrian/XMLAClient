<script setup lang="ts">
import { debounce } from 'lodash';
import { computed, ref, watch } from 'vue';

const { config, connections } = defineProps<{
    config: any;
    connections: any;
    dataSources: any;
}>();

const innerInterval = ref(config.pollingInterval ?? 5000);

const connectionsFiltered = computed(() => {
    return connections.filter((c: any) => c.type === 'XMLA');
});

const intervalDebounce = debounce((interval: string) => {
    if (!interval) return;
    const parsedInterval = parseInt(interval);
    config.pollingInterval = parsedInterval;
}, 700);

watch(() => innerInterval.value, (nv) => {
    if (!nv || isNaN(parseInt(nv))) {
        innerInterval.value = "5000";
    }
    intervalDebounce(nv);
});
</script>

<template>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <VaSelect v-model="config.connection" label="Connection" :options="connectionsFiltered" text-by="name"
        value-by="uid" />
    <VaSwitch v-model="config.pollingEnabled" label="Enable Long Polling" />
    <VaInput v-if="config.pollingEnabled" v-model="innerInterval" label="Polling Interval (ms)" />
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <!-- <VaInput v-model="config.resourceUrl" label="Resource Url" /> -->
</template>
