<script setup lang="ts">
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import WidgetWrapper from '@/plugins/widgets/Wrapper/WidgetWrapper.vue';
import { useDataSourcesStore } from '@/plugins/data/DatasourcePinia';
import { useWidgetsStore } from '@/plugins/data/WidgetsPinia';
import { useMoveableLayout } from '@/composables/movableLayout';
import Moveable from "vue3-moveable";
import { useLayoutStore } from '@/plugins/data/LayoutsPinia';

const selectedDatasourceName = ref("");
const selectedDatasourceId = ref("");
const { dataSources } = useDataSourcesStore();

const datasourceNames = ref([] as string[]);
const { widgets, createWidget } = useWidgetsStore();
const instance = getCurrentInstance();
const { createLayoutItem } = useLayoutStore();
const {
    getInitialStyle,
    getMovableControlStyles,
    drag,
    resize,
    moveUp,
    moveDown,
    moveToBottom,
    moveToTop,
} = useMoveableLayout();


onMounted(() => {
  datasourceNames.value = Object.values(dataSources).map(v => v.name);
  const datasource = Object.values(dataSources).find(v => v.name === selectedDatasourceName.value);
  if (datasource) {
    selectedDatasourceId.value = datasource.uid;
  }
});

watch(selectedDatasourceName,() => {
  datasourceNames.value = Object.values(dataSources).map(v => v.name);
  const datasource = Object.values(dataSources).find(v => v.name === selectedDatasourceName.value);
  if (datasource) {
    selectedDatasourceId.value = datasource.uid;
  }
});

const addWidget = () => {
  if (selectedDatasourceName.value) {
    const id = createWidget("SampleWidget", 
    {
      datasourceId: selectedDatasourceId.value,
    });

    const layout = {
      x: 0,
      y: 700,
      width: 300,
      height: 150,
      z: 3005,
    };
    createLayoutItem(layout, id)
  }
};
</script>

<template>
  <div class="report-container">
    <!-- <div class="report-container__title">
      <h1>Edit Report</h1>
    </div> -->
    <div class="widgets-adding-controls">
      <VaSelect label="Datasource ID" class="mx-3 my-3" v-model="selectedDatasourceName" :options="datasourceNames"/>
      <VaButton class="add-btn" icon="add" @click="addWidget">Add</VaButton>
    </div>
    <div class="widget-board">
      <template v-for="widget in widgets" :key="widget.uid">
        <div
          :class="`${widget.uid} dashboard-item-container`"
          :style="getInitialStyle(widget.uid)"
          :ref="widget.uid"
        >
        <va-dropdown
          :trigger="'right-click'"
          :auto-placement="false"
          placement="right-start"
          cursor
        >
          <template #anchor>
            <div class="dashboard-item">
              <WidgetWrapper :widget="widget" :ref="`${widget.uid}_wrapper`" />
            </div>
          </template>
          <va-dropdown-content>
            <div class="dropdown-buttons-container">
              <va-button @click="moveUp(widget.uid)">
                Move up
              </va-button>
              <va-button @click="moveDown(widget.uid)">
                Move down
              </va-button>
              <va-button @click="moveToTop(widget.uid)">
                Move to top
              </va-button>
              <va-button @click="moveToBottom(widget.uid)">
                Move to bottom
              </va-button>
            </div>
          </va-dropdown-content>
        </va-dropdown>
        </div>
      <Moveable
        v-bind:target="[`.${widget.uid}`]"
        v-bind:draggable="true"
        v-bind:resizable="true"
        v-bind:useResizeObserver="true"
        v-bind:useMutationObserver="true"
        @drag="drag(widget.uid, $event)"
        @resize="resize(widget.uid, $event)"
        :snappable="true"
        :snapGridWidth="20"
        :snapGridHeight="20"
        :origin="false"
        :ref="`${widget.uid}_control`"
        :style="getMovableControlStyles(widget.uid)"
      >
      </Moveable>
      </template>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
.report-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__title {
    width: 100%;
    padding: 16px;
    border-bottom: 1px dashed #e0e0e0;
  }

  .widgets-adding-controls {
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 16px;
  }

  .widget-board {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 35px 35px 0 35px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .add-btn {
    margin: 0 16px 16px 0;
    align-self: self-end;
  }
}

.dashboard-item {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dashboard-item-container {
  position: absolute;
}

.dropdown-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 99999;
}

.va-dropdown__content {
  z-index: 10000000 !important;
}

.va-dropdown__content.va-select-dropdown__content.va-dropdown__content-wrapper {
  z-index: 20000000 !important;
}
</style>
