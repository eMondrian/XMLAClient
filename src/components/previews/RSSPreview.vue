<script setup lang="ts">
import { watch, ref } from 'vue';
import useTemporaryStore from '@/composables/useTemporaryStore';

const props = defineProps<{ dataSource: any }>();

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);

const data = ref(null as unknown as any);

watch(tempStore, async () => {
  data.value = await tempStore.value.getData('object');
  console.log(data);
}, { deep: true });

</script>
<template>
  <div v-if="tempStore && data" class="p-2 flex flex-col gap-2" style="overflow: auto; height: 100%;">
    <!-- <div v-text="data"></div> -->

    <div v-for="item in data.items" class="border border-black rounded-lg">
        <div class="bg-gray-100 text-lg font-semibold p-2 rounded-t-lg">{{ item.title }}</div>
        <div v-html="item.content" class="p-2">
        </div>
    </div>
  </div>
</template>