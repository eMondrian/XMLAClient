<script setup lang="ts">
import { onMounted, shallowRef, getCurrentInstance, watch, ref } from 'vue';
const props = defineProps<{ dataSource: any }>();

const instance = getCurrentInstance();
const constructor = instance?.appContext.config.globalProperties.datasourceConfig.availableDatasources['REST'];
const tempStore = shallowRef(null as any);
const selectedFilter = ref("");

const data = ref(null);
const selectedData = ref(null);

onMounted(async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);
    
    const req = await tempStore.value.getData();
    const reqOrigin = await tempStore.value.getOriginalData();
    data.value = reqOrigin;
    selectedData.value = req;
  }
});

watch(() => props.dataSource, async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);
    const req = await tempStore.value.getData();
    const reqOrigin = await tempStore.value.getOriginalData();
    data.value = reqOrigin;
    selectedData.value = req;
  }
}, { deep: true });
</script>

<template>
  <div class="rest-preview-container" v-if="tempStore">
    <div class="selected-json-filters container-border">
      <div class="selected-json-filters__value">
        <VaInput v-model="props.dataSource.config.selectedJSONValue" label="Selected Field"/>
      </div>
      <div class="selected-json-filters__controls">
        <VaSelect class="ml-2" v-model="selectedFilter" label="Filters" :options="['filter1', 'filter2', 'filter3']" />
        <VaButton class="ml-2 mt-3">Add filter</VaButton>
      </div>
    </div>
    <div class="original-json-preview container-border">
      <VueJsonPretty
        :data="data"
        v-model:selectedValue="props.dataSource.config.selectedJSONValue"
        showSelectController
        highlightSelectedNode
        collapsedOnClickBrackets
        selectableType="single"
        editable
      />
    </div>
    <div v-if="!selectedData" class="selected-json-preview selected-json-preview--without-data container-border"></div>
    <div v-else="selectedData && selectedValue" class="selected-json-preview container-border">
      <VueJsonPretty
        :data="selectedData"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.rest-preview-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.selected-json-filters {
  display: flex;
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 2;
  grid-column-end: 3;

  &__value,
  &__controls {
    flex: 1;
  }
}

.original-json-preview {
  grid-row-start: 2;
  grid-column-start: 1;
  grid-row-end: 5;
  grid-column-end: 2;
  overflow: auto;
}

.selected-json-preview {
  grid-row-start: 2;
  grid-column-start: 2;
  grid-row-end: 5;
  grid-column-end: 3;
  overflow: auto;
  
  &--without-data {
    background: #c0c0c0;
  }
}

.container-border {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}
</style>
