<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import useTemporaryStore from '@/composables/useTemporaryStore';

const props = defineProps<{ dataSource: any }>();


const { tempStore } = useTemporaryStore('WS', props.dataSource);

const data = ref(null as unknown as any);

watch(tempStore, async () => {
  if (tempStore.value) {
    try {
      const req = await tempStore.value.getData('object');
      data.value = req;
    } catch (e) {
      data.value = null;
    }

    tempStore.value.subscribe(async () => {
      const req = await tempStore.value.getData('object');
      data.value = req;
    })
  }
}, { deep: true });
</script>
<template>
  <div v-if="tempStore && data" style="overflow: hidden; height: 100%;">
    {{ data }}
  </div>
</template>