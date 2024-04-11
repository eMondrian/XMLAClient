<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { ref, type Ref, onMounted } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";

import type { XMLAStore } from "@/stores/Widgets/XMLAStore";

interface ITextSettings {
  text: string;
  fontSize: number;
  fontColor: string;
  fontWeight: string;
  textDecoration: string;
  horizontalAlign: string;
  verticalAlign: string;
}

interface ITextComponent {
  store: Store | XMLAStore;
  settings: ITextSettings;
  setSetting: (key: string, value: any) => void;
  setStore: (store: Store | XMLAStore) => void;
}

const { component } = defineProps<{ component: ITextComponent }>();

const opened = ref({
  textSection: false,
  storeSection: false,
});

// TODO: Move to store selection component
const storeManager = useStoreManager();
let stores = ref([]) as Ref<Store[]>;
const requestResult = ref("");

const getStores = () => {
  const storeList = storeManager.getStoreList();

  stores.value = Array.from(storeList.value, function (entry) {
    return { ...entry[1] };
  });
};

const getData = async () => {
  const store = component.store as Store;
  const data = await store.getData();
  requestResult.value = JSON.stringify(data, null, 2);
};

const updateStore = (storeId) => {
  const store = storeManager.getStore(storeId) as Store;
  component.setStore(store);
  console.log(component);
  getData();
};

onMounted(() => {
  getStores();
  if (component.store) {
    getData();
  }
});
</script>

<template>
  <va-collapse v-model="opened.textSection" header="Text widget settings">
    <div class="settings-container">
      <va-input
        label="Text"
        :model-value="component.settings.text"
        @update:model-value="component.setSetting('text', $event)"
      />
      <va-input
        label="Font Size"
        :model-value="component.settings.fontSize"
        @update:model-value="component.setSetting('fontSize', $event)"
      />
      <va-input
        label="Font Color"
        :model-value="component.settings.fontColor"
        @update:model-value="component.setSetting('fontColor', $event)"
      />
      <va-input
        label="Font Weight"
        :model-value="component.settings.fontWeight"
        @update:model-value="component.setSetting('fontWeight', $event)"
      />
      <va-select
        label="Text decoration"
        :options="[
          'Underline solid',
          'Underline dashed',
          'Underline wavy',
          'Line-through',
          'Overline',
          'None',
        ]"
        :model-value="component.settings.textDecoration"
        @update:model-value="component.setSetting('textDecoration', $event)"
      />
      <va-select
        label="Horizontal align"
        :options="['Left', 'Center', 'Right']"
        :model-value="component.settings.horizontalAlign"
        @update:model-value="component.setSetting('horizontalAlign', $event)"
      />
      <va-select
        label="Vertical align"
        :options="['Top', 'Center', 'Bottom']"
        :model-value="component.settings.verticalAlign"
        @update:model-value="component.setSetting('verticalAlign', $event)"
      />
    </div>
  </va-collapse>
  <va-collapse v-model="opened.storeSection" header="Store settings">
    <div class="settings-container">
      <div>
        <h3 class="mb-2">Select store</h3>
        <div class="mb-2" v-for="store in stores" :key="store.id">
          <va-radio
            :model-value="component.store?.id"
            @update:model-value="updateStore"
            :option="{
              text: `${store.caption} ${store.id}`,
              id: store.id,
            }"
            value-by="id"
            name="store-radio-group"
          />
        </div>
        <pre class="response">{{ requestResult }}</pre>
      </div>
    </div>
  </va-collapse>
</template>
<style scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}
</style>
