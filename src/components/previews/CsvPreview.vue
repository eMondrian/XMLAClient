<script setup lang="ts">
import { onMounted, shallowRef, getCurrentInstance, watch, ref } from 'vue';
const props = defineProps<{ dataSource: any }>();

const instance = getCurrentInstance();
const constructor = instance?.appContext.config.globalProperties.datasourceConfig.availableDatasources['CSV'];
const tempStore = shallowRef(null as any);

console.log(constructor);

const data = ref(null as unknown as any);

onMounted(async () => {
  console.log(props.dataSource);
  // console.log(constructor)
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);

    try {
      const req = await tempStore.value.getData();
      data.value = req;
    } catch (e) {
      data.value = null;
    }
  }
});

watch(() => props.dataSource, async () => {
  if (constructor.validateConfiguration(props.dataSource.config)) {
    tempStore.value = new constructor(props.dataSource.config);

    try {
      const req = await tempStore.value.getData();
      data.value = req;
    } catch (e) {
      data.value = null;
    }
    // console.log(tempStore.value);
    console.log(data.value);
  }
}, { deep: true });


</script>
<template>
  <div v-if="tempStore && data" style="overflow: hidden; height: 100%;">
    <VaDataTable :items="data.mappedRows" :stickyHeader="true" style="height: 100%;" />
  </div>
</template>