<script setup lang="ts">
import { computed } from 'vue';

const { config, connections } = defineProps<{
  config: any;
  dataSources: any;
  connections: any;
}>();


const connectionsFiltered = computed(() => {
  return connections.filter((c: any) => c.type === 'CSV');
});

</script>

<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.connection" label="Connection" :options="connectionsFiltered" text-by="name"
    value-by="uid" />

  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaInput v-model="config.resourceUrl" label="Resource Url" />
</template>