<script setup lang="ts">
import { watch, ref } from 'vue';
import useTemporaryStore from '@/composables/useTemporaryStore';

const props = defineProps<{ dataSource: any }>();

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);

const data = ref(null as unknown as any);

watch(tempStore, async () => {
  data.value = await tempStore.value.getData('DataTable');
}, { deep: true });

</script>
<template>
  <div v-if="tempStore && data" style="overflow: hidden; height: 100%;">
    <VaDataTable :items="data.items" :stickyHeader="true" style="height: 100%;" />
  </div>
</template>