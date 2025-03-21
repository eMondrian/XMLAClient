/*
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

*/
<script setup lang="ts">
import { onMounted, shallowRef, getCurrentInstance, watch, ref, computed } from 'vue';

import MonacoEditor from '../common/monacoEditor/MonacoEditor.vue';
import MetadataTree from '../XMLA/MetadataTree.vue';
import QueryDesigner from '../XMLA/QueryDesigner.vue';
import XmlaConnection from '@/plugins/data/connections/XMLA/XmlaConnection';
import PivotTable from '../XMLA/PivotTable/PivotTable.vue';
import useTemporaryStore from '@/composables/useTemporaryStore';

const props = defineProps<{ dataSource: any }>();

const { tempStore } = useTemporaryStore(props.dataSource.type, props.dataSource);

const data = ref(null as unknown as IPivotTable);
const connection = ref(null as unknown as XmlaConnection);

const emit = defineEmits(['updateConfig']);

const query = ref(props.dataSource.config.mdx || '');
const tabs = ["Code Editor", "Visual Editor"];
const currentTab = ref(0);

const queryConfig = ref({
  filters: props.dataSource.config.requestParams?.filters || [],
  rows: props.dataSource.config.requestParams?.rows || [],
  columns: props.dataSource.config.requestParams?.columns || [],
  measures: props.dataSource.config.requestParams?.measures || [],
});

const metadataStore = computed(() => {
  return {
    connection: connection.value,
    metadataStore: connection.value.metadata,
  }
});

const drilldownState = ref(props.dataSource.config.drilldownState || {});

watch(() => tempStore, async () => {
  await updateData();
}, { deep: true });

const updateData = async () => {
    const req = await tempStore.value.getData('PivotTable');
    data.value = req;
    if (props.dataSource.config.useVisualEditor) {
      query.value = await tempStore.value.getMdxRequest();
    }
    connection.value = tempStore.value.getConnection();
}

onMounted(async () => {
  updateData();
});

watch(() => props.dataSource, async () => {
  updateData();
}, { deep: true });

watch(() => queryConfig, async () => {
  emit('updateConfig', {
    ...props.dataSource.config,
    requestParams: queryConfig.value,
  });

  updateData();
}, { deep: true });

watch(() => query, async () => {
  emit('updateConfig', {
    ...props.dataSource.config,
    mdx: query.value,
  });

  updateData();
}, { deep: true });

const onExpand = async (e: any) => {
  drilldownState.value = tempStore.value.expand(e);

  emit('updateConfig', {
    ...props.dataSource.config,
    drilldownState: drilldownState.value,
  });

  updateData();
}

const onCollapse = async (e: any) => {
  drilldownState.value = tempStore.value.collapse(e);

  emit('updateConfig', {
    ...props.dataSource.config,
    drilldownState: drilldownState.value,
  });

  updateData();
}

</script>
<template>
  <div class="flex w-full h-full rounded gap-4">
    <div class="flex flex-col h-full overflow-hidden flex-grow">
      <va-tabs v-model="currentTab" hidePagination color="info" grow>
        <template #tabs>
          <div class="flex justify-between w-full">
            <div>
              <va-tab v-for="tab in tabs" :key="tab"
                :disabled="tab === 'Visual Editor' && !props.dataSource.config.useVisualEditor">
                {{ tab }}
              </va-tab>
            </div>

            <!-- eslint-disable-next-line vue/no-mutating-props -->
            <VaCheckbox v-model="props.dataSource.config.useVisualEditor" class="mt-2" label="Use query designer" />
          </div>
        </template>
        <template v-if="currentTab === 0 && connection">
          <MonacoEditor v-model="query" height="100%" width="100%" language="mdx" :supported-languages="[ 'mdx' ]" :metadata="metadataStore" />
        </template>
        <template v-else-if="currentTab === 1">
          <div class="w-full h-full">
            <QueryDesigner v-model="queryConfig" />
          </div>
        </template>
      </va-tabs>
      <div class="h-full flex flex-col">
        <h4>
          Data Preview
        </h4>
        <div class="w-full h-full">
          <PivotTable
            v-if="data"
            v-model="data"
            @onExpand="onExpand"
            @onCollapse="onCollapse"
            :rowsExpandedMembers="data.tableState.rowsExpandedMembers"
            :columnsExpandedMembers="data.tableState.columnsExpandedMembers"
          />
        </div>
      </div>
    </div>
    <div class="h-full flex-grow-0" v-if="connection">
      <MetadataTree :metadata="connection.metadata" />
    </div>
  </div>
</template>
<style>
.xmla_preview-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  gap: 16px;
}

.xmla_preview-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.xmla_preview-preview {
  width: 100%;
  height: 50%;
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
  height: 100%;
  width: 300px;
}

.xmla_preview-config {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  height: 50%;
  overflow: hidden;
  justify-content: space-between;
}

.xmla_preview-preview-content {
  height: 100%;
  flex-grow: 1;
}

.xmla_preview-visual_editor {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  height: 100%;
}
</style>
