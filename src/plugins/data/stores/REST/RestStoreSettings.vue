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
const connection = computed(() => connections.find((e) => config.connection === e.uid));
const fullUrl = computed(() => connection.value ? `${connection.value?.config?.url}${tempResourceUrl.value}` : '');
const response = reactive<{
  code: number | null;
  statusText: string;
}>({
  code: null,
  statusText: '',
});
const available = ref(false);

watch([tempResourceUrl, connection], () => {
  if (tempResourceUrl.value && connection.value) {
    updateResourceUrl(tempResourceUrl.value);
  }
});

onMounted(async () => {
  if (tempResourceUrl.value && connection.value) {
    const resp = await checkUrl(fullUrl.value);
    available.value = resp.available;
  }
});

const updateResourceUrl = debounce(async (newUrl: string) => {
  config.resourceUrl = newUrl;
  config.selectedJSONValue = '';
  
  if (fullUrl.value) {
    const resp = await checkUrl(fullUrl.value);
    available.value = resp.available;
  } else {
    available.value = false;
  }
}, 700);

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
  } catch(error: any) {
    console.warn("Invalid resource URL", error.name);
    return { available: false }
  }
};

const connectionsFiltered = computed(() => {
  return connections.filter((c: any) => c.type === 'REST');
});

</script>

<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.connection" label="Connection" :options="connectionsFiltered" text-by="name"
    value-by="uid" />

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaInput v-model="tempResourceUrl" label="Resource Url" :rules="[() => !tempResourceUrl || available || `Invalid resource URL`]"/>
  <VaInput v-model="config.selectedJSONValue" label="Selected value" />
</template>