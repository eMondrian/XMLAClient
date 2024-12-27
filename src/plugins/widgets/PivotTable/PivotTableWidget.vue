<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { toRefs } from "vue";
import { useDatasourceRepository } from '@/plugins/widgets/composables/datasourceRepository';
import PivotTable from "@/components/XMLA/PivotTable/PivotTable.vue";

const props = defineProps<{ datasourceId: string, config: ITextSettings }>();
const { datasourceId } = toRefs(props);

const { data } = useDatasourceRepository(datasourceId, "PivotTable");
</script>

<template>
  <div class="text-container">
    <div class="component">
      <PivotTable :model-value="data" />
    </div>
  </div>
</template>

<style scoped>
.text-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  align-items: stretch;
}

.component {
  overflow: hidden;
}
</style>
