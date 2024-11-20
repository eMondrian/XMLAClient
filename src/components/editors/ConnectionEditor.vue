<script setup lang="ts">
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";
import { onMounted, ref, computed, watch, getCurrentInstance } from "vue";

const props = defineProps<{
  itemId: string;
}>();

const emit = defineEmits(['close']);

const { connections, updateConnection } = useConnectionsStore();
const connectionProxy = ref({} as any);

const instance = getCurrentInstance();
const connectionConfig = instance?.appContext.config.globalProperties.connectionsConfig;
const availableConnections = Object.keys(instance?.appContext.config.globalProperties.connectionsConfig.availableConnections);


onMounted(() => {
  const connection = connections.find((c) => c.uid === props.itemId);
  connectionProxy.value = JSON.parse(JSON.stringify(connection));
});

const settingsComponent = computed(() => {
  return connectionConfig.settingsComponents[connectionProxy.value.type];
});

const saveConnection = () => {
  updateConnection(connectionProxy.value.uid, connectionProxy.value);
  emit('close');
};
</script>

<template>
  <div class="connection_editor-container">
    <div class="connection_editor-main">
      <div class="connection_editor-header">
        <h4>
          Connection Editor
        </h4>
      </div>
      <div class="connection_editor-fields" v-if="connectionProxy">
        <VaInput v-model="connectionProxy.uid" label="UID" readonly />
        <VaInput v-model="connectionProxy.name" label="Name" />
        <VaSelect v-model="connectionProxy.type" label="Type" :options="availableConnections" />

        <component :is="settingsComponent" :config="connectionProxy.config" />
      </div>
      <div class="connection_editor-actions">
        <VaButton color="primary" @click="saveConnection">Save</VaButton>
        <VaButton color="secondary" @click="$emit('close')">Cancel</VaButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.connection_editor-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.connection_editor-header {
  padding: 16px;
  display: flex;
  margin: -16px -16px 16px -16px;

  flex-direction: row;
  align-items: center;
  border-bottom: 1px dashed #e0e0e0;
}

.connection_editor-main {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.connection_editor-fields {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.connection_editor-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.connection_editor-status {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}
</style>
