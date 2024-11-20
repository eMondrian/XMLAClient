<script setup lang="ts">
import { onMounted, shallowRef, getCurrentInstance, watch, ref } from 'vue';
import MonacoEditor from '../common/monacoEditor/MonacoEditor.vue';
const props = defineProps<{ dataSource: any }>();

const instance = getCurrentInstance();
const constructor = instance?.appContext.config.globalProperties.datasourceConfig.availableDatasources['XMLA'];
const tempStore = shallowRef(null as any);

const data = ref(null);


onMounted(async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);

    const req = await tempStore.value.getData();
    data.value = req;
  }
});

watch(() => props.dataSource, async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);

    const req = await tempStore.value.getData();
    data.value = req;
  }
}, { deep: true });
</script>
<template>
  <div class="xmla_preview-container">
    <div class="xmla_preview-config">
      <div class="xmla_preview-areas">
        <div class="area">
          <div class="area-header">Filters</div>
          <div class="area-content"></div>
        </div>
        <div class="area">
          <div class="area-header">Rows</div>
          <div class="area-content"></div>
        </div>
        <div class="area">
          <div class="area-header">Columns</div>
          <div class="area-content"></div>
        </div>
        <div class="area">
          <div class="area-header">Measures</div>
          <div class="area-content"></div>
        </div>
      </div>
      <div class="xmla_preview-metadata">

      </div>
    </div>
    <div class="xmla_preview-preview">
      <h4>
        Data Preview
      </h4>
      <div style="background-color: silver;" class="xmla_preview-preview-content">

      </div>
    </div>
  </div>
</template>
<style>
.xmla_preview-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 16px;
}

.xmla_preview-preview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.xmla_preview-areas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 50%;
}

.xmla_preview-areas .area {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.xmla_preview-areas .area-header {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.xmla_preview-areas .area-content {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 100%;
}

.xmla_preview-metadata {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 100%;
  width: 300px;
}

.xmla_preview-config {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
}

.xmla_preview-preview-content {
  height: 100%;
  flex-grow: 1;
}
</style>