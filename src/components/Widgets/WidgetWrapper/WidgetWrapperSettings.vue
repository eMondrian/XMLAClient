<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n';

interface IWrapperSettings {
  title?: string;
  backgroundColor: string;
  backgroundColorTransparence: number;
  titleColor: string;
  titleFontSize: number;
  borderSize: number;
  borderColor: string;
  borderRadius: number;
  fullscreen: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowX: number;
  shadowY: number;
  shadowTransparence: number;
  transparency: number;
}

interface IWrapperComponent {
  settings: IWrapperSettings;
  setSetting: (key: string, value: any) => void;
}

const { t } = useI18n();
const { wrapper } = defineProps<{ wrapper: IWrapperComponent }>();
const opened = ref(false);
</script>

<template>
  <va-collapse v-model="opened" header="Widget wrapper settings">
    <div class="settings-container">
      <VaDivider class="pad_bottom" orientation="left">
        <span class="px-2">{{ t('WidgetWrapper.title') }}</span>
      </VaDivider>
      <va-input
        v-model="wrapper.settings.title"
        :label="t('WidgetWrapper.label')"
        @update:model-value="wrapper.setSetting('title', $event)"
      />
      <va-input
        v-model="wrapper.settings.titleFontSize"
        :label="t('WidgetWrapper.fontSize')"
        @update:model-value="wrapper.setSetting('titleFontSize', $event)"
      />
      <va-color-input
        v-model="wrapper.settings.titleColor"
        :label="t('WidgetWrapper.fontColor')"
        @update:model-value="wrapper.setSetting('titleColor', $event)"
      />

      <VaDivider class="pad_bottom" orientation="center">
        <span class="px-2">{{ t('WidgetWrapper.background') }}</span>
      </VaDivider>

      <va-color-input
        autofocus
        :label="t('WidgetWrapper.backgroundColor')"
        class="color-fill"
        v-model="wrapper.settings.backgroundColor"
        @update:model-value="wrapper.setSetting('backgroundColor', $event)"
      />
      <VaSlider
        v-model="wrapper.settings.backgroundColorTransparence"
        :label="t('WidgetWrapper.backgroundColorTrancparency')"
        :min="0"
        :max="255"
        @update:model-value="wrapper.setSetting('backgroundColorTransparence', $event)"
        >
        <template #append>
          <VaCounter
            v-model="wrapper.settings.backgroundColorTransparence"
            :min="0"
            :max="255"
            class="w-[110px]"
            @update:model-value="wrapper.setSetting('backgroundColorTransparence', $event)"
          />
        </template>
      </VaSlider>
      <VaDivider class="pad_bottom" orientation="center">
        <span class="px-2">{{ t('WidgetWrapper.border') }}</span>
      </VaDivider>
      <va-input
        v-model="wrapper.settings.borderSize"
        :label="t('WidgetWrapper.borderSize')"
        @update:model-value="wrapper.setSetting('borderSize', $event)"
      />
      <va-color-input
        autofocus
        :label="t('WidgetWrapper.borderColor')"
        class="color-fill"
        v-model="wrapper.settings.borderColor"
        @update:model-value="wrapper.setSetting('borderColor', $event)"
      />
      <va-input
        v-model="wrapper.settings.borderRadius"
        :label="t('WidgetWrapper.borderRadius')"
        @update:model-value="wrapper.setSetting('borderRadius', $event)"
      />
      <VaDivider class="pad_bottom" orientation="left">
        <span class="px-2">{{ t('WidgetWrapper.fullScreen') }}</span>
      </VaDivider>
      <va-checkbox
        v-model="wrapper.settings.fullscreen"
        :label="t('WidgetWrapper.showFullScreen')"
        @update:model-value="wrapper.setSetting('fullscreen', $event)"
      />
      <VaDivider class="pad_bottom" orientation="left">
        <span class="px-2">{{ t('WidgetWrapper.shadow') }}</span>
      </VaDivider>
    <va-input
      v-model="wrapper.settings.shadowX"
      :label="t('WidgetWrapper.shadowX')"
    />
    <va-input
      v-model="wrapper.settings.shadowY"
      :label="t('WidgetWrapper.shadowY')"
      @update:model-value="wrapper.setSetting('shadowY', $event)"
    />
    <va-input
      v-model="wrapper.settings.shadowBlur"
      :label="t('WidgetWrapper.shadowBlur')"
      @update:model-value="wrapper.setSetting('shadowBlur', $event)"
    />
    <va-color-input
      autofocus
      :label="t('WidgetWrapper.shadowColorTransparency')"
      class="color-fill"
      v-model="wrapper.settings.shadowColor"
      @update:model-value="wrapper.setSetting('shadowColor', $event)"
    />
      <VaSlider
        v-model="wrapper.settings.shadowTransparence"
        :label="t('WidgetWrapper.showFullScreen')"
        :min="0"
        :max="255"
        @update:model-value="wrapper.setSetting('shadowTransparence', $event)"
      >
        <template #append>
          <VaCounter
            v-model="wrapper.settings.shadowTransparence"
            :min="0"
            :max="255"
            class="w-[110px]"
            @update:model-value="wrapper.setSetting('shadowTransparence', $event)"
          />
        </template>
      </VaSlider>
      <VaDivider class="pad_bottom" orientation="left">
        <span class="px-2">{{ t('WidgetWrapper.transparence') }}</span>
      </VaDivider>
      <VaSlider
        v-model="wrapper.settings.transparency"
        :label="t('WidgetWrapper.transparency')"
        :min="0"
        :max="1"
        :step="1"
        @update:model-value="wrapper.setSetting('transparency', $event)"
      >
        <template #append>
          <VaCounter
            v-model="wrapper.settings.transparency"
            :min="0"
            :max="255"
            class="w-[110px]"
            @update:model-value="wrapper.setSetting('transparency', $event)"
          />
        </template>
      </VaSlider>
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
.pad_bottom{
  padding-top: 30px;
  padding-bottom: 10px;
}
</style>
