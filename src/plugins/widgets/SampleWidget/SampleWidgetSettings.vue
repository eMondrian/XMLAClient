<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

export interface ITextSettings {
  text: string;
  fontSize: number;
  fontColor: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  horizontalAlign: string;
  verticalAlign: string;
}

const opened = ref({
  widgetSection: false,
  storeSection: false,
})

const widgetSettings = defineModel<ITextSettings>({ required: true });

const { t } = useI18n();
const isDarkTheme = ref(false);

const fontColor = computed(() => {
  return isDarkTheme.value ? "#ffffff" : "";
});
</script>

<template>
  <va-collapse v-model="opened.widgetSection" :header="t('TextWidget.title')">
    <div class="settings-container">
      <div class="settings-block">
        <va-input class="text-title" :label="t('TextWidget.label')" v-model="widgetSettings.text" />
        <va-input class="text-size" :label="t('TextWidget.fontSize')" v-model="widgetSettings.fontSize" />
      </div>
      <div class="settings-block">
        <va-color-input class="text-color" :label="t('TextWidget.fontColor')" v-model="widgetSettings.fontColor" />
        <div class="align-buttons-group align-buttons-group__format">
          <VaButton color="#fafafa" class="align-button" icon="format_bold" size="small" icon-color="#000000"
            v-model="widgetSettings.fontWeight" />
          <VaButton color="#fafafa" class="align-button" icon="format_italic" size="small" icon-color="#000000"
            v-model="widgetSettings.fontStyle" />
          <VaButton color="#fafafa" class="align-button" icon="format_underline" size="small" icon-color="#000000"
            v-model="widgetSettings.textDecoration" />
        </div>
      </div>
      <div class="settings-block">
        <div class="align-buttons-group">
          <div class="align-horizontal-buttons">
            <VaButton color="#fafafa" class="align-button" icon="align_horizontal_left" size="small"
              icon-color="#000000" v-model="widgetSettings.horizontalAlign"
              @click="widgetSettings.horizontalAlign = 'Left'" />
            <VaButton color="#fafafa" class="align-button" icon="align_horizontal_center" size="small"
              icon-color="#000000" v-model="widgetSettings.horizontalAlign"
              @click="widgetSettings.horizontalAlign = 'Center'" />
            <VaButton color="#fafafa" class="align-button" icon="align_horizontal_right" size="small"
              icon-color="#000000" v-model="widgetSettings.horizontalAlign"
              @click="widgetSettings.horizontalAlign = 'Right'" />
          </div>
          <div class="align-vertical-buttons ml-2">
            <VaButton color="#fafafa" class="align-button" icon="align_vertical_top" size="small" icon-color="#000000"
              v-model="widgetSettings.verticalAlign" @click="widgetSettings.verticalAlign = 'Top'" />
            <VaButton color="#fafafa" class="align-button" icon="align_vertical_center" size="small"
              icon-color="#000000" v-model="widgetSettings.verticalAlign"
              @click="widgetSettings.verticalAlign = 'Center'" />
            <VaButton color="#fafafa" class="align-button" icon="align_vertical_bottom" size="small"
              icon-color="#000000" v-model="widgetSettings.verticalAlign"
              @click="widgetSettings.verticalAlign = 'Bottom'" />
          </div>
        </div>
      </div>
    </div>
  </va-collapse>
  <va-collapse v-model="opened.storeSection" :header="t('Widgets.storeSettingsTitle')">
  </va-collapse>
</template>
<style lang="scss" scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.settings-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.text-title {
  width: 100%;
}

.text-size {
  width: 63px;
  margin-left: 12px;
}

.text-color {
  width: 156px;
}

.text-weight {
  width: 100px;
}

.align-buttons-group {
  display: flex;
  align-self: flex-end;
  border: 2px solid #cdcfdb;
  border-radius: 4px;
  margin-left: 12px;

  &__format {
    width: 100%;
  }

  .align-vertical-buttons,
  .align-horizontal-buttons {
    display: flex;
  }

  .align-button {
    width: 100%;
    height: 32px;
    padding: 0 7.5px;

    &:hover {
      --va-background-color: rgb(162, 181, 218) !important;
    }
  }
}

.loading {
  height: 100%;
  padding: 50px;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--app-response-background);
}
</style>
