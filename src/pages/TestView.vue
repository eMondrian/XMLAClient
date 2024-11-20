<script lang="ts" setup>
import { useConfigurationsStore } from "@/plugins/data/ConfigurationPinia";
import { getCurrentInstance, ref } from "vue";
import { type VueVariableStorageProxy } from "@/plugins/variables/VueVariableStorageProxy";
import type { TinyEmitter } from "tiny-emitter";

const { configurations } = useConfigurationsStore();

const instance = getCurrentInstance();
const variablesStorage = instance?.appContext.config.globalProperties.$variableStorage as VueVariableStorageProxy;
const eventBus = instance?.appContext.config.globalProperties.$eventBus as TinyEmitter;

const eventName = ref('test');
const triggerEvent = () => {
  eventBus.emit('test');
}
</script>

<template>
  <div class="configuration-editor-container">
    <!-- <h2>Test View</h2> -->
    <div class="variables-view">
      <div v-for="variable in configurations" :key="variable.name" class="variable-item">
        <div>Name: {{ variable.name }}</div>
        <div>Type: {{ variable.config.type }}</div>
        <div>Value: {{ variablesStorage.getVariable(variable.name).value }}</div>
      </div>
    </div>
    <div class="test-buttons">
      <VaInput v-model="eventName" label="Event name"></VaInput>
      <VaButton @click="triggerEvent">Trigger Event</VaButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.configuration-editor-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
  padding: 20px;
  gap: 20px;
}

.configuration-editor-container h2 {
  margin: 0;
  padding: 16px;
  border-bottom: 1px dashed #e0e0e0;
}

.variables-view {
  border: 1px solid silver;
  padding: 16px;
}

.variable-item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.variable-item:last-child {
  border-bottom: none;
}

.test-buttons {
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 16px;
}
</style>