<script setup lang="ts">
import { computed } from 'vue';

const { config, connections } = defineProps<{
  config: any;
  connections: any;
  dataSources: any;
}>();

const connectionsFiltered = computed(() => {
  return connections.filter((c: any) => c.type === 'WS' || c.type === 'MQTT');
});

</script>

<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <VaSelect v-model="config.connection" label="Connection" :options="connectionsFiltered" text-by="name"
    value-by="uid" />

  <VaInput v-model="config.topic" label="Topic"/>

</template>