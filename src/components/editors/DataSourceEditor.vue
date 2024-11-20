<script setup lang="ts">
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";
import { useDataSourcesStore } from "@/plugins/data/DatasourcePinia";
import { onMounted, ref, computed, getCurrentInstance } from "vue";

const { connections } = useConnectionsStore();
const { dataSources, updateDataSource } = useDataSourcesStore();

const datasourceProxy = ref({} as any);

const instance = getCurrentInstance();
const datasourceConfig = instance?.appContext.config.globalProperties.datasourceConfig;
const availableDatasources = Object.keys(datasourceConfig.availableDatasources);

onMounted(() => {
  const dataSource = dataSources.find((ds) => ds.uid === props.itemId);
  datasourceProxy.value = { ...dataSource };
});

const props = defineProps<{
  itemId: string;
}>();

const saveDataSource = () => {
  updateDataSource(datasourceProxy.value.uid, datasourceProxy.value);
  emit('close');
};

const previewComponent = computed(() => {
  if (datasourceProxy.value.type === null || datasourceProxy.value.type === undefined) {
    return datasourceConfig.previewComponents["XMLA"];
  }
  return datasourceConfig.previewComponents[datasourceProxy.value.type];
});

const settingsComponent = computed(() => {
  return datasourceConfig.settingsComponents[datasourceProxy.value.type];
});


const emit = defineEmits(['close']);
</script>

<template>
  <div class="connection_editor-container">
    <div class="connection_editor-main">
      <div class="connection_editor-header">
        <h4>
          DataSource Editor
        </h4>
      </div>
      <div class="connection_editor-fields" v-if="datasourceProxy">
        <VaInput v-model="datasourceProxy.uid" label="UID" readonly />
        <VaInput v-model="datasourceProxy.name" label="Name" />
        <VaSelect v-model="datasourceProxy.type" label="Type" :options="availableDatasources" />
        <component
          :is="settingsComponent"
          :config="datasourceProxy.config"
          :connections="connections"
          :dataSources="dataSources"
        />
      </div>
      <div class="connection_editor-actions">
        <VaButton color="primary" @click="saveDataSource">Save</VaButton>
        <VaButton color="secondary" @click="$emit('close')">Cancel</VaButton>
      </div>
    </div>
    <div class="data-preview">
      <component
        :is="previewComponent"
        :data-source="datasourceProxy"
        :key="datasourceProxy.uid"
      />
    </div>
  </div>
</template>

<style scoped>
.connection_editor-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 16px;
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

.data-preview {
  overflow: auto;
  border-radius: 8px;
}
</style>
