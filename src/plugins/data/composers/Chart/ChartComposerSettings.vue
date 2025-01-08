<script setup lang="ts">
import ChartComposer from "./ChartComposer";
import { watch, ref, computed, getCurrentInstance, onMounted } from "vue";

const instance = getCurrentInstance();
const datasourceRepository = instance?.appContext.config.globalProperties.datasourceRepository;

const { config, dataSources } = defineProps<{
  config: any;
  dataSources: any;
  connections: any;
}>();

const datasourcesFiltered = computed(() => {
  return dataSources.filter((ds: any) => ds.type === 'CSV' || ds.type === 'XMLA');
});

const composeByOptions = ref([] as string[]);

onMounted(async () => {
  composeByOptions.value = await ChartComposer.getHeaders(config.connectedDatasources, datasourceRepository);
});

watch(() => config.connectedDatasources, async (newValue) => {
  composeByOptions.value = await ChartComposer.getHeaders(newValue, datasourceRepository);
});
</script>
<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.connectedDatasources" label="Sources" :options="datasourcesFiltered" multiple text-by="name"
    value-by="uid" />

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.composeBy" label="Compose By" :options="composeByOptions" />


  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.usedSets" label="Series" :options="composeByOptions" multiple />

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.labelColumn" label="Label Column" :options="composeByOptions" />
</template>
