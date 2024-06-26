<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->

<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { usePromisifiedModal } from "@/composables/promisifiedModal";
import { ref, watch } from "vue";
import { useI18n } from 'vue-i18n';

export default {
  name: "ServerSelectionModal",
  setup() {
    const { t } = useI18n();
    const serverUrl = ref("");
    const reset = () => {
      serverUrl.value = "";
    };

    const { isOpened, run, close } = usePromisifiedModal(reset);

    const ok = () => {
      if (!serverUrl.value) return;
      close(serverUrl.value);
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

    return {
      t,
      serverUrl,
      isOpened,
      run,
      close,
      reset,
      ok,
    };
  },
};
</script>
<template>
  <va-modal :modelValue="isOpened" no-padding class="server-url-modal" @ok="ok">
    <template #content="{ ok }">
      <va-card-title class="va-h6">{{ t('ServerSelectionModal.serverUrl') }}</va-card-title>
      <va-card-content>
        <va-input
          class="mb-2 server-url-input"
          v-model="serverUrl"
          placeholder="Server url"
        />
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok">{{ t('Modals.okButton') }}</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>
<style lang="scss">
.server-url-modal {
  .va-modal__container {
    width: 100%;
  }

  .server-url-input {
    width: 100%;
  }

  .va-modal__dialog {
    margin: auto;
  }
}
</style>
