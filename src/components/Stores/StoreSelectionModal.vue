<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { usePromisifiedModal } from "@/composables/promisifiedModal";
import { ref, watch, inject } from "vue";
import { useStoreManager } from "@/composables/storeManager";

const { t } = useI18n();
const storeManager = useStoreManager();
const field = ref("");
const options = [];
const requestResult = ref("");

const map = storeManager.getStoreList();
const availableStores = ref([]);
const selectedStore = ref("");
const EventBus = inject("customEventBus") as any;
console.log(EventBus);

watch(
  map,
  () => {
    availableStores.value = Array.from(map.value, function (entry) {
      return entry[1];
    });
  },
  { deep: true },
);

const reset = () => {
  field.value = "";
};

const { isOpened, run, close } = usePromisifiedModal(reset);

const ok = () => {
  if (!field.value) return;
  close(field.value);
};

const onKeyPress = (e) => {
  if (e.key === "Enter") {
    ok();
  }
};

watch(isOpened, () => {
  if (isOpened.value) {
    window.addEventListener("keypress", onKeyPress);
  } else {
    window.removeEventListener("keypress", onKeyPress);
  }
});

const createNew = () => {
  const storeId = storeManager.initStore(null, EventBus);
  close({
    type: "new",
    storeId,
  });
};

const select = () => {
  close({
    type: "existing",
    storeId: selectedStore.value.id,
  });
};

defineExpose({
  run,
  close,
});
</script>
<template>
  <va-modal
    :modelValue="isOpened"
    no-padding
    class="field-selection-modal"
    @ok="ok"
  >
    <template #content="{ ok }">
      <va-card-title class="va-h6">{{ t('StoreSelectionModal.storeSelection') }}:</va-card-title>
      <va-card-content>
        <div class="mb-4">
          <h4 class="mb-2">{{ t('StoreSelectionModal.createNewStore') }}:</h4>
          <va-button @click="createNew">{{ t('StoreSelectionModal.createButton') }}</va-button>
        </div>
        <div class="mb-4">
          <h4 class="mb-2">{{ t('StoreSelectionModal.selectExisting') }}:</h4>
          <div class="mb-2">
            <va-select
              v-model="selectedStore"
              :options="availableStores"
              text-by="caption"
            />
          </div>
          <div>
            <va-button @click="select" :disabled="!selectedStore"
              >{{ t('StoreSelectionModal.selectButton') }}</va-button
            >
          </div>
        </div>
        <!-- <DatasourceList class="mt-2" /> -->
      </va-card-content>
    </template>
  </va-modal>
</template>
<style lang="scss">
.field-selection-modal {
  .va-modal__container {
    width: 100%;
  }

  .response {
    background-color: var(--app-response-background);
    padding: 0.5rem;
    border-radius: 4px;
  }

  .input {
    width: 100%;
  }

  .va-modal__dialog {
    margin: auto;
  }
}
</style>
