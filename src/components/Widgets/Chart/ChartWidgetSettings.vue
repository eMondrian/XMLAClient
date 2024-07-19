<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref, type Ref, onMounted, watch} from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";

import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import type { CollapseState } from "@/@types/widgets";

export interface IChartSettings {
    chartType: string;
    title: string;
    titlePosition: string;
    legendPosition: string,
    borderColor: string;
    canvasBackgroundColor: string;
    dataSetBackgroundColors: string[];
    X_axes: {
      type: string;
      display: boolean;
      label: string;
      backgroundColor: string;
    };
    X_ticks: {
      display: boolean;
      color: string;
      fontSize: number;
      callback: string;
    };
    // Y_axes: {
    //   type: string;
    //   display: boolean;
    //   label: string;
    // };
    // Y_ticks: {
    //   display: boolean;
    //   color: string;
    //   fontSize: number;
    //   callback: string;
    // };
};

export interface IChartComponent {
    store: Store | XMLAStore;
    settings: IChartSettings;
    setSetting: (key: string, value: any) => void;
    setStore: (store: Store | XMLAStore) => void;
}

const { t } = useI18n();
const { component } = defineProps<{ component: IChartComponent }>();
const backgroundColors = ref(component.settings.dataSetBackgroundColors.map(color => {
  return {
    color,
    transparency: 99,
  };
}));

const opened: Ref<CollapseState> = ref({
    widgetSection: false,
    storeSection: false,
});

const openedSettings = ref({
    main: true,
    datasets: false,
    axes: false,
    gridLine: false,
});

const updateBgc = (index, newColor) => {
  backgroundColors.value[index].color = newColor;
  component.settings.dataSetBackgroundColors = backgroundColors.value.map(
    bgc => `${bgc.color}${bgc.transparency.toString().padStart(2, '0')}`
  );
};

const updateTransparency = (index, newTransparency) => {
  backgroundColors.value[index].transparency = newTransparency;
  component.settings.dataSetBackgroundColors = backgroundColors.value.map(
    bgc => `${bgc.color}${bgc.transparency.toString().padStart(2, '0')}`
  );
};

const addBgc = () => {
  backgroundColors.value.push({ color: "", transparency: 99 });
};

const deleteBgc = (id: number) => {
  backgroundColors.value.splice(id, 1);
};

watch(
  backgroundColors.value,
  (nV) => {

    component.settings.dataSetBackgroundColors = nV.map(bgc => bgc.color + bgc.transparency);
  },
  { deep: true }
);

// const storeManager = useStoreManager();
// let stores = ref([]) as Ref<IStore[]>;
// const requestResult = ref("");

// const getStores = () => {
//     const storeList = storeManager.getStoreList();

//     stores.value = Array.from(storeList.value, function (entry) {
//         return { ...entry[1] };
//     });
// };

// const getData = async () => {
//     const store = component.store as Store;
//     const data = await store.getData();
//     requestResult.value = JSON.stringify(data, null, 2);
// };

// const updateStore = (storeId) => {
//     const store = storeManager.getStore(storeId) as Store;
//     component.setStore(store);
//     console.log(component);
//     getData();
// };

// onMounted(() => {
//     getStores();
//     if (component.store) {
//         getData();
//     }
// });
</script>

<template>
    <va-collapse v-model="opened.widgetSection" :header="t('TextWidget.title')">
      <div class="settings-container">
        <va-collapse v-model="openedSettings.main" header="Main section">
          <div class="settings-block mb-3">
              <va-select
                label="Chart type:"
                :model-value="component.settings.chartType"
                @update:model-value="component.setSetting('chartType', $event)"
                :options="['Bar', 'Line']"
              />
            </div>
            <div class="settings-block mb-3">
              <va-input
                label="Title:"
                :model-value="component.settings.title"
                @update:model-value="component.setSetting('title', $event)"
              />
            </div>
            <div class="settings-block mb-3">
              <va-select
                label="Title position:"
                :model-value="component.settings.titlePosition"
                @update:model-value="component.setSetting('titlePosition', $event)"
                :options="['top', 'left', 'bottom', 'right']"
              />
            </div>
          </va-collapse>
          <va-collapse v-model="openedSettings.datasets" header="Datasets section">
            <div class="events-list-label mb-3">
              <h3>Datasets background colors</h3>
              <va-button
                icon="add"
                @click="addBgc"
              >
              </va-button>
            </div>
            <div
              v-for="(bgc, index) in backgroundColors"
              :key="index"
              class="settings-block mb-3"
            >
              <va-color-input
                class="color-input"
                :model-value="bgc.color"
                @update:model-value="updateBgc(index, $event)"
                label="Background color"
              />
              <va-input
                class="transparency-input ml-2"

                :model-value="bgc.transparency"
                @update:model-value="updateTransparency(index, $event)"
                label="Transparency"
              />
              <va-button
                class="delete-btn mt-3 ml-2"
                preset="plain"
                icon="delete"
                icon-color="#ff0000"
                @click="deleteBgc(index)"
              />
            </div>
            <!-- <div class="settings-block">
              <va-color-input
                class="color-input"
                label="Border color:"
                :model-value="component.settings.borderColor"
                @update:model-value="component.setSetting('borderColor', $event)"
              />
            </div> -->
            <div class="settings-block mb-3">
              <va-select
                label="Legend position:"
                :model-value="component.settings.legendPosition"
                @update:model-value="component.setSetting('legendPosition', $event)"
                :options="['top', 'left', 'bottom', 'right', 'chartArea']"
              />
            </div>
            <div class="settings-block mb-3">
              <va-color-input
                class="color-input"
                label="Canvas background color:"
                :model-value="component.settings.canvasBackgroundColor"
                @update:model-value="component.setSetting('canvasBackgroundColor', $event)"
              />
            </div>
          </va-collapse>
          
          <va-collapse v-model="openedSettings.axes" header="Axes">
            <div class="settings-block mb-3">
              <va-select
                label="X-axis type:"
                :model-value="component.settings.X_axes.type"
                @update:model-value="component.setSetting('X_axes.type', $event)"
                :options="['linear', 'logarithmic']"
              />
            </div>
            </va-collapse>
          <va-collapse v-model="openedSettings.gridLine" header="Grid line">gridLine...</va-collapse>
        </div>
    </va-collapse>
    <!-- <va-collapse
        v-model="opened.storeSection"
        :header="t('Widgets.storeSettingsTitle')"
    >
        <div class="settings-container">
            <div>
                <h3 class="mb-2">{{ t("Widgets.selectStore") }}</h3>
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
    </va-collapse> -->
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
}

.color-input {
  width: 100%;
}

.transparency-input {
  width: 120px;
}

.delete-btn {
  align-items: center;
  text-align: center;
}
</style>
