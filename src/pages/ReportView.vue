<script setup lang="ts">
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";
import { useDataSourcesStore } from "@/plugins/data/DatasourcePinia";
import { VueVariableStorageProxy } from "@/plugins/variables/VueVariableStorageProxy";
import { ref, getCurrentInstance } from "vue";
import { RefreshType, SourceType, Types } from '@/types/enum';
import { useConfigurationsStore, type ConfigurationDTO } from "@/plugins/data/ConfigurationPinia";
import type { TinyEmitter } from "tiny-emitter";

const { dataSources } = useDataSourcesStore();
const { connections } = useConnectionsStore();
const { configurations, updateConfigurations } = useConfigurationsStore();

const instance = getCurrentInstance();
const variablesStorage = instance?.appContext.config.globalProperties.$variableStorage as VueVariableStorageProxy;
const eventBus = instance?.appContext.config.globalProperties.$eventBus as TinyEmitter;

const vars: ConfigurationDTO[] = [
  {
    name: "Test",
    config: {
      valueType: Types.Primitive,
      type: SourceType.AsyncParameters,
      refreshType: RefreshType.Trigger,
      request: 'https://glances.ssemenkoff.dev/api/4/cpu/total',
      description: 'test',
      refreshTrigger: 'test',
    }
  }
];

updateConfigurations(vars);
console.log(variablesStorage);

</script>

<template>
  <div style="padding: 16px;">
    Report View
    <div>
      <div>
        Available Connections
      </div>
      <div v-for="connection in connections" :key="connection.uid">
        {{ JSON.stringify(connection) }}
      </div>
      <div>
        Available DataSources
      </div>
      <div v-for="dataSource in dataSources" :key="dataSource.uid">
        {{ JSON.stringify(dataSource) }}
      </div>
    </div>
    <div style="padding-top: 10px; margin-top: 10px; border-top: 1px solid silver;">
      <div>
        Variables
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;padding-left: 20px;">
        <div v-for="variable in configurations" :key="variable.name" class="var-item">
          <p>{{ variable.name }}</p>
          <p>{{ variablesStorage.getVariable(variable.name).value }}</p>
        </div>
      </div>
    </div>
    <div>
      <VaButton>Load variables</VaButton>
      <VaButton @click="eventBus.emit('test')">Trigger Event</VaButton>
    </div>
  </div>
</template>

<style scoped>
.var-item {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 8px;
}
</style>
