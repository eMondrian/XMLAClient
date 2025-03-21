/*
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

*/
<script setup lang="ts">
import { useConnectionsStore } from "@/plugins/data/ConnectionsPinia";
import { useDataSourcesStore } from "@/plugins/data/DatasourcePinia";
import { onMounted, ref, computed } from "vue";
import { cloneDeep } from "lodash";
import container from "@/config/inversify";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import DatasourceRepository from '@/plugins/data/DatasourceRepository';

const { connections } = useConnectionsStore();
const { dataSources, updateDataSource } = useDataSourcesStore();

const datasourceProxy = ref({} as any);
const datasourceRepository = container.get<DatasourceRepository>(SERVICE_IDENTIFIER.DatasourceRepository);

const availableDatasources = computed(() => {
  return datasourceRepository.registeredDatasources;
})

onMounted(() => {
  const dataSource = dataSources.find((ds) => ds.uid === props.itemId);
  datasourceProxy.value = cloneDeep(dataSource);
});

const props = defineProps<{
  itemId: string;
}>();

const saveDataSource = () => {
  updateDataSource(datasourceProxy.value.uid, datasourceProxy.value);
  emit('close');
};

const previewComponent = computed(() => {
  const identifiers = datasourceRepository.getDatasourceIdentifiers(datasourceProxy.value.type);

  if (!identifiers) {
    return null;
  }

  return container.get(identifiers.Preview);
});

const settingsComponent = computed(() => {
  const identifiers = datasourceRepository.getDatasourceIdentifiers(datasourceProxy.value.type);

  if (!identifiers) {
    return null;
  }

  return container.get(identifiers.Settings);
});

const updateConfig = (config: any) => {
  console.log(config);
  datasourceProxy.value.config = config;
};

const emit = defineEmits(['close']);
</script>

<template>
  <div class="connection_editor-container">
    <div class="connection_editor-main h-full">
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
    <div class="data-preview h-full overflow-hidden">
      <component
        :is="previewComponent"
        :data-source="datasourceProxy"
        :key="datasourceProxy.uid"
        @updateConfig="updateConfig"
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
