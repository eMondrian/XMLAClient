<script setup lang="ts">
import WidgetWrapperSettings from '@/plugins/widgets/Wrapper/WidgetWrapperSettings.vue';
import { useDataSourcesStore } from '@/plugins/data/DatasourcePinia';
import { getCurrentInstance, ref } from 'vue';
import { useI18n } from "vue-i18n";

const emit = defineEmits(['saveWidgetSettings', 'close']);
const widget = defineModel<IWidget>();
const storeSection = ref(false);
const { dataSources } = useDataSourcesStore();

const instance = getCurrentInstance();
const availableWidgetsSettings = instance?.appContext.config.globalProperties.availableWidgetsSettings;

const { t } = useI18n();
</script>

<template>
  <div class="add_widget_window">
    <h3>Widget Settings</h3>
    <div class="content" v-if="widget">
      <WidgetWrapperSettings v-model="widget.wrapperConfig" />
      <component
        :is="availableWidgetsSettings[widget.type]"
        v-model="widget.config"
        :key="widget.uid"
      />
      <va-collapse v-model="storeSection" :header="t('Widgets.storeSettingsTitle')">
          <VaSelect label="Datasource ID" class="mx-3 my-3" v-model="widget.config.datasourceId" :options="dataSources" text-by="name" value-by="uid" teleport=".add_widget_window"/>
      </va-collapse>
    </div>
    <div class="buttons">
      <va-button @click="emit('close')">Close</va-button>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 20px;
  padding: 1rem;
}

.content {
  flex-grow: 1;
  overflow: auto;
  width: 100%;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
  padding-right: 16px;
}

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
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  width: 400px;
  right: 20px;
  top: 20px;
  background-color: #ecf0f1;
  padding: 1rem 0;
  border-radius: 8px;
  z-index: 1000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  gap: 16px;
}
</style>