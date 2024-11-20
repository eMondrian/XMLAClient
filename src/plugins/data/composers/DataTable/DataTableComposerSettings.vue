<script setup lang="ts">
import DataTableComposer from "./DataTableComposer";
import { watch, ref, computed, getCurrentInstance } from "vue";

const instance = getCurrentInstance();
const datasourceRepository = instance?.appContext.config.globalProperties.datasourceRepository;

const { config, dataSources } = defineProps<{
  config: any;
  dataSources: any;
  connections: any;
}>();

const datasourcesFiltered = computed(() => {
  return dataSources.filter((ds: any) => ds.type === 'CSV');
});

const composeByOptions = ref([] as string[]);
watch(() => config.connectedDatasources, async (newValue) => {
  composeByOptions.value = await DataTableComposer.getHeaders(newValue, datasourceRepository);
});
</script>
<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.connectedDatasources" label="Sources" :options="datasourcesFiltered" multiple text-by="name"
    value-by="uid" />

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.composeBy" label="Compose By" :options="composeByOptions" />
</template>