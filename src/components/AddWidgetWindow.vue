<script setup lang="ts">
import { useDataSourcesStore } from '@/plugins/data/DatasourcePinia';
import { ref, getCurrentInstance } from 'vue';

const selectedDatasource = ref("");
const { dataSources } = useDataSourcesStore();

const instance = getCurrentInstance();
const availableWidgets = Object.keys(instance?.appContext.config.globalProperties.availableWidgets);

const emit = defineEmits(['addWidget']);

const addWidget = (type: string): void => {
  emit('addWidget', type, selectedDatasource.value);
}
</script>

<template>
  <div class="add_widget_window">
    <h1>Add Widget</h1>

    <VaSelect label="Datasource ID" class="mx-3 my-3" v-model="selectedDatasource" :options="dataSources" text-by="name" value-by="uid" teleport=".add_widget_window"/>
    <div class="widgets_grid">
      <VaButton v-for="widget in availableWidgets" :key="widget" class="widgets_grid-item" @click="addWidget(widget)">
        <div style="height: 100px; width: 100px; background-image: url(https://via.assets.so/img.jpg?w=100&h=100&tc=black&bg=silver);"></div>
        <span>Add {{ widget }}</span>
      </VaButton>
    </div>
  </div>
</template>

<style scoped>
.widgets_grid {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 1rem;
}

:deep() .widgets_grid-item .va-button__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.add_widget_window {
  position: absolute;
  height: calc(100% - 100px);
  width: 400px;
  right: 20px;
  top: 20px;
  background-color: #ecf0f1;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>