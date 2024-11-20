<script lang="ts" setup>
import { useDataSourcesStore } from '@/plugins/data/DatasourcePinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSerialization } from '@/composables/useSerialization';
import { useConfigurationsStore } from '@/plugins/data/ConfigurationPinia';
import { useConnectionsStore } from '@/plugins/data/ConnectionsPinia';
import { useWidgetsStore } from '@/plugins/data/WidgetsPinia';
import { useLayoutStore } from '@/plugins/data/LayoutsPinia';

const { dataSources } = useDataSourcesStore();
const { configurations } = useConfigurationsStore();
const { connections } = useConnectionsStore();
const { widgets } = useWidgetsStore();
const { layout } = useLayoutStore();
const { getState, loadState } = useSerialization({
  configurations: configurations,
  datasources: dataSources,
  connections: connections,
  widgets: widgets,
  layout: layout,
})
const route = useRoute();

const headerTitle = computed(() => {
  switch(route.name) {
    case 'home':
      return 'Report Vue';
    case 'about':
      return 'Edit Report';
    case 'data':
      return 'Data Designer';
    case 'config':
      return 'Configuration Editor';
    case 'test':
      return 'Test View';
    default:
      return 'Unknown View';
  }
});

const saveStateToStorage = () => {
  const serState = getState();
  localStorage.setItem("APP_STATE", serState);
};

const loadStateFromStorage = () => {
  const state = localStorage.getItem("APP_STATE");

  loadState(state);
}
</script>

<template>
  <va-navbar color="primary" class="header">
    <template #left>
      <va-navbar-item class="logo">
        <div class="white triangle"></div>
        <div class="small logo daanse" id="logo"></div>
        <div class="small logo daanse" id="claim"></div>
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item class="logo">
        <VaButton class="mr-2" @click="saveStateToStorage" icon="save">Save</VaButton>
        <VaButton class="mr-2" @click="loadStateFromStorage" icon="download">Load</VaButton>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  display: flex;
  width: 100%;
  top: 0;
  left: 0;
  height: 58px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #e0e0e0;
  transition: padding-left 0.23s ease;
  color: white;

  &__title {
    text-align: left;
  }

  &__state-controls {
    display: flex;
    align-items: center;
  }
}

#logo {
  width: 46px;
  height: 40px;
  overflow: hidden;
  background-size: 100px;
  background-position: 0px;
}

#claim {
  position: absolute;
  height: 48px;
  left: 70px;
  background-size: 220px;
  background-position: -100px 48%;
}
</style>