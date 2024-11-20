<script setup lang="ts">
import { toRefs, computed, getCurrentInstance } from 'vue';
import { useWidgetsStore } from '@/plugins/data/WidgetsPinia';
import { useLayoutStore } from '@/plugins/data/LayoutsPinia';

const props = defineProps<{ widget: any }>();
const { widget } = toRefs(props);

const { removeWidget } = useWidgetsStore();
const { removeLayoutItem } = useLayoutStore();

const instance = getCurrentInstance();
const availableWidgets = instance?.appContext.config.globalProperties.availableWidgets;

const isWidgetRegistered = computed(() => {
  return availableWidgets && availableWidgets[widget.value.type];
});

const deleteWidget = (id: string): void => {
  removeWidget(id);
  removeLayoutItem(id);
}

const openSettings = (name: string): void => {
  console.log(name)
}
</script>

<template>
  <div class="wrapper" v-if="isWidgetRegistered">
    <component
      :is="widget.type"
      :config="widget.config"
      :datasourceId="widget.config.datasourceId"
      @deleteWidget="deleteWidget(widget.uid)"
      @openSettings="openSettings(widget.config.settings.name)"
    />
  </div>
  <div v-else>
    <p>Widget type {{ widget.type }} is not registered.</p>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
}
</style>