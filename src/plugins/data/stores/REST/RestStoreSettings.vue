<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { debounce } from 'lodash';
import type { ConnectionDTO } from '../../ConnectionsPinia';
import type { DataSourceDTO } from '../../DatasourcePinia';

const { config, connections } = defineProps<{
    config: any;
    connections: ConnectionDTO[];
    dataSources: DataSourceDTO[];
}>();

const tempResourceUrl = ref(config.resourceUrl);
const innerInterval = ref(config.pollingInterval ?? 5000);
const available = ref(false);
const response = reactive<{
    code: number | null;
    statusText: string;
}>({
    code: null,
    statusText: '',
});

const connection = computed(() => connections.find((e) => config.connection === e.uid));
const fullUrl = computed(() => connection.value ? `${connection.value?.config?.url}${tempResourceUrl.value}` : '');
const connectionsFiltered = computed(() => connections.filter((c: any) => c.type === 'REST'));

const checkUrl = async (url: string) => {
    try {
        const fetchResponse = await fetch(url, { method: "HEAD" });
        response.code = fetchResponse.status;
        response.statusText = fetchResponse.statusText;

        if (!fetchResponse.ok) {
            console.warn("Invalid resource URL");
            return { available: false };
        }
        return { available: true };
    } catch (error: any) {
        console.warn("Invalid resource URL", error.name);
        return { available: false }
    }
};

const updateResourceUrl = debounce(async (newUrl: string) => {
    if (!newUrl) {
        available.value = false;
        return;
    }

    if (config.resourceUrl !== newUrl) {
        config.resourceUrl = newUrl;
        config.selectedJSONValue = '';
    }

    const resp = await checkUrl(fullUrl.value);
    available.value = resp.available;
}, 700);

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

watch([tempResourceUrl, connection], ([newTempUrl, newConnection]) => {
    if (newTempUrl && newConnection) {
        updateResourceUrl(newTempUrl);
    }
}, { immediate: true });

onMounted(async () => {
    if (fullUrl.value) {
        const resp = await checkUrl(fullUrl.value);
        available.value = resp.available;
    }
});
</script>

<template>
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <VaSelect v-model="config.connection" label="Connection" :options="connectionsFiltered" text-by="name"
        value-by="uid" />

    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <VaInput v-model="tempResourceUrl" label="Resource Url"
        :rules="[() => !tempResourceUrl || available || `Invalid resource URL`]" />
    <VaInput v-model="config.selectedJSONValue" label="Selected value" />
    <VaSwitch class="m-2" v-model="config.pollingEnabled" label="Enable Long Polling" />
    <VaInput v-if="config.pollingEnabled" v-model="innerInterval" label="Polling Interval (ms)" />
</template>
