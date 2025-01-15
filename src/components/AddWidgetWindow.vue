<script setup lang="ts">
import { useDataSourcesStore } from '@/plugins/data/DatasourcePinia';
import { ref, getCurrentInstance, computed } from 'vue';
import Draggable from 'vuedraggable';

const selectedDatasource = ref("");
const { dataSources } = useDataSourcesStore();

const instance = getCurrentInstance();
const availableWidgets = Object.keys(instance?.appContext.config.globalProperties.availableWidgets);

const onDragStart = (event: DragEvent) => {
  const dragElement = document.createElement('div');
  document.body.appendChild(dragElement);
  event.dataTransfer?.setDragImage(dragElement, 0, 0);
  setTimeout(() => {
    document.body.removeChild(dragElement)
  }, 0);
};

const computedWidgets = computed(() => {
  return availableWidgets.map(type => ({ type })).map((e) => ({
    ...e,
    ds: selectedDatasource.value
  }));
});
</script>

<template>
  <div class="add_widget_window">
    <h1>Add Widget</h1>
    <VaSelect label="Datasource ID" class="mx-3 my-3" v-model="selectedDatasource" :options="dataSources" text-by="name" value-by="uid" teleport=".add_widget_window"/>
    <draggable
      class="widgets_grid"
      :list="computedWidgets"
      :group="{ name: 'widgets', pull: 'clone', put: false }"
      itemKey="type"
    >
    <template #item="{ element }">
      <div
        class="widgets_grid-item"
        draggable="true"
        @dragstart="(event) => onDragStart(event)"
      >
      <div style="height: 100px; width: 100px; background-image: url(https://via.assets.so/img.jpg?w=100&h=100&tc=black&bg=silver);"></div>
      <span>{{ element.type }}</span>
      </div>
    </template>
    </draggable>
  </div>
</template>

<style scoped>
.widgets_grid {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 1rem;
}

:deep() .widgets_grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid gray;
  border-radius: 5px;
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