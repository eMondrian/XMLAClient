<script setup lang="ts">
import useTemporaryStore from '@/composables/useTemporaryStore';
import { ref, watch } from 'vue';

const props = defineProps<{ dataSource: any }>();

const data = ref(null as any);
const originalData = ref(null as any);

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);

watch(tempStore, async () => {
  data.value = await tempStore.value.getData();
  originalData.value = await tempStore.value.getOriginalData();
}, { deep: true });

// const selectedFilter = ref("");
</script>

<template>
  <div class="rest-preview-container" v-if="tempStore">
    <!-- <div class="selected-json-filters container-border">
      <div class="selected-json-filters__value">
        <VaInput v-model="props.dataSource.config.selectedJSONValue" label="Selected Field"/>
      </div>
      <div class="selected-json-filters__controls">
        <VaSelect class="ml-2" v-model="selectedFilter" label="Filters" :options="['filter1', 'filter2', 'filter3']" />
        <VaButton class="ml-2 mt-4">Add filter</VaButton>
      </div>
    </div> -->
    <div class="original-json-preview container-border">
      <VueJsonPretty
        :data="originalData"
        v-model:selectedValue="props.dataSource.config.selectedJSONValue"
        showSelectController
        highlightSelectedNode
        collapsedOnClickBrackets
        selectableType="single"
        editable
      />
    </div>
    <div v-if="!data" class="selected-json-preview selected-json-preview--without-data container-border"></div>
    <div v-else class="selected-json-preview container-border">
      <VueJsonPretty
        :data="data"
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
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 5;
  grid-column-end: 2;
  overflow: auto;
}

.selected-json-preview {
  grid-row-start: 1;
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
