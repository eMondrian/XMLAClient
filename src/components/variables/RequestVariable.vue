<script lang="ts" setup>
import type { ConfigurationDTO } from '@/plugins/data/ConfigurationPinia';
import { useVariableManager } from '@/plugins/variables/composables/variableManager';
import type { VueVariableStorageProxy } from '@/plugins/variables/VueVariableStorageProxy';
import { Types, RefreshType } from '@/types/enum';
import { onBeforeMount, ref } from 'vue';

const { config, variableStorageProxy } = defineProps<{
  config: ConfigurationDTO;
  variableStorageProxy: VueVariableStorageProxy;
}>();

const created = ref(false);
const { variable, createVariable } = useVariableManager(
  ref(config),
  variableStorageProxy
);

onBeforeMount(() => {
  try {
    createVariable();
    created.value = true;
  } catch (e) {
    created.value = false;
  }
});
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <template v-if="created">
    <VaInput v-model="config.config.request" label="Request URL" />
    <VaSelect v-model="config.config.valueType" :options="Object.values(Types)" label="Value Type" />
    <VaInput v-model="config.config.defaultValue" label="Default Value" />
    <VaSelect v-model="config.config.refreshType" :options="Object.values(RefreshType)" label="Refresh Type" />
    <VaInput v-if="config.config.refreshType === 'Interval'" v-model="config.config.refreshInterval" type="number"
      label="Interval" placeholder="10s" />
    <VaInput v-if="config.config.refreshType === 'Trigger'" v-model="config.config.refreshTrigger"
      label="Trigger Event Name" placeholder="Update" />
    <!-- <VaSelect v-model="config.config.refreshType" :options="Object.values(RefreshType)" label="Refresh" disabled /> -->
    <VaInput v-model="variable.value" label="Current Value" readonly />
  </template>
</template>
