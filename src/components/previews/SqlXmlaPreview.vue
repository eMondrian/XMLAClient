<script setup lang="ts">
import { watch, ref } from 'vue';
import MonacoEditor from '@/components/common/monacoEditor/MonacoEditor.vue';
import useTemporaryStore from '@/composables/useTemporaryStore';

const props = defineProps<{ dataSource: any }>();

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);

const data = ref(null as unknown as any);
const emit = defineEmits(['updateConfig']);

watch(tempStore, async () => {
  data.value = await tempStore.value.getData('DataTable');
}, { deep: true });

const query = ref(props.dataSource.config.sql || '');


watch(() => query, async () => {
  emit('updateConfig', {
    ...props.dataSource.config,
    sql: query.value,
  });

  data.value = await tempStore.value.getData('DataTable');
}, { deep: true });

</script>
<template>
  <div v-if="tempStore" style="overflow: hidden; height: 100%;" class="flex flex-col gap-4">
    <MonacoEditor class="h-full" :supportedLanguages="[ 'sql' ]" language="sql" v-model="query" />
    <div class="h-full">
        <VaDataTable v-if="data" :items="data.items" :stickyHeader="true" style="height: 100%;" />
    </div>
  </div>
</template>