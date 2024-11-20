<script setup lang="ts">
import DataSourceList from '@/components/DataSourceList.vue';
import ConnectionList from '@/components/ConnectionList.vue';
import ConnectionEditor from '@/components/editors/ConnectionEditor.vue';
import DataSourceEditor from '@/components/editors/DataSourceEditor.vue';

import { ref, shallowRef } from 'vue';

const activeEditor = shallowRef(null as any);
const activeItemId = ref(null as unknown as string);

const openEditor = ({ type, itemId }: { type: string, itemId: string }) => {
  console.log('openEditor', type, itemId);
  if (type === 'Connection') {
    activeEditor.value = ConnectionEditor;
    activeItemId.value = itemId;
  }
  if (type === 'DataSource') {
    activeEditor.value = DataSourceEditor;
    activeItemId.value = itemId;
  }
};

const closeEditor = () => {
  activeEditor.value = null;
  activeItemId.value = null as unknown as string;
};
</script>

<template>
  <div class="dataDesigner-container">
    <!-- <h2>Data Designer</h2> -->
    <div class="dataDesigner-layout">
      <DataSourceList class="datasourceList" @openEditor="openEditor" />
      <ConnectionList class="connectionList" @openEditor="openEditor" />
      <component :is="activeEditor" :itemId="activeItemId" :key="activeItemId" class="dataDesigner-editor"
        @close="closeEditor" />
    </div>
  </div>
</template>

<style scoped>
.datasourceList {
  grid-row-start: 1;
}

.connectionList {
  grid-row-start: 2;
}

.dataDesigner-editor {
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 3;
}

.dataDesigner-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
}

.dataDesigner-container h2 {
  margin: 0;
  padding: 16px;
  border-bottom: 1px dashed #e0e0e0;
}

.dataDesigner-layout {
  height: 100%;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
}
</style>
