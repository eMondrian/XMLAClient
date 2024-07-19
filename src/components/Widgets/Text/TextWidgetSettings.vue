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
import { ref, type Ref, onMounted } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";

import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import type { CollapseState } from "@/@types/widgets";

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

export interface ITextComponent {
    store: Store | XMLAStore;
    settings: ITextSettings;
    setSetting: (key: string, value: any) => void;
    setStore: (store: Store | XMLAStore) => void;
}

const { t } = useI18n();
const { component } = defineProps<{ component: ITextComponent }>();

const opened: Ref<CollapseState> = ref({
    widgetSection: false,
    storeSection: false,
});

// TODO: Move to store selection component
const storeManager = useStoreManager();
let stores = ref([]) as Ref<IStore[]>;
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
    <va-collapse v-model="opened.widgetSection" :header="t('TextWidget.title')">
        <div class="settings-container">
            <div class="settings-block">
                <va-input
                    class="text-title"
                    :label="t('TextWidget.label')"
                    :model-value="component.settings.text"
                    @update:model-value="component.setSetting('text', $event)"
                />
                <va-input
                    class="text-size"
                    :label="t('TextWidget.fontSize')"
                    :model-value="component.settings.fontSize"
                    @update:model-value="
                        component.setSetting('fontSize', $event)
                    "
                />
            </div>
            <div class="settings-block">
                <va-color-input
                    class="text-color"
                    :label="t('TextWidget.fontColor')"
                    :model-value="component.settings.fontColor"
                    @update:model-value="
                        component.setSetting('fontColor', $event)
                    "
                />
                <div class="align-buttons-group align-buttons-group__format">
                    <VaButton
                        color="#fafafa"
                        class="align-button"
                        :class="{'active':component.settings.fontWeight === 'bold'}"
                        icon="format_bold"
                        size="small"
                        icon-color="#000000"
                        :model-value="component.settings.fontWeight"
                        @click="
                            component.settings.fontWeight === 'bold'
                                ? component.setSetting('fontWeight', 'normal')
                                : component.setSetting('fontWeight', 'bold')
                        "
                    />
                    <VaButton
                        color="#fafafa"
                        class="align-button"
                        :class="{'active':component.settings.fontStyle === 'italic'}"
                        icon="format_italic"
                        size="small"
                        icon-color="#000000"
                        :model-value="component.settings.fontStyle"
                        @click="
                            component.settings.fontStyle === 'italic'
                                ? component.setSetting('fontStyle', 'normal')
                                : component.setSetting('fontStyle', 'italic')
                        "
                    />
                    <VaButton
                        class="align-button"
                        :class="{'active':component.settings.textDecoration === 'underline'}"
                        icon="format_underline"
                        size="small"
                        icon-color="#000000"
                        :model-value="component.settings.textDecoration"
                        @click="
                            component.settings.textDecoration === 'underline'
                                ? component.setSetting('textDecoration', 'none')
                                : component.setSetting(
                                      'textDecoration',
                                      'underline',
                                  )
                        "
                    />
                </div>
                <div class="align-buttons-group">
                    <div class="align-horizontal-buttons">
                        <VaButton
                            :class="{'active':component.settings.horizontalAlign === 'Left'}"
                            class="align-button"
                            icon="align_horizontal_left"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.horizontalAlign"
                            @click="
                                component.setSetting('horizontalAlign', 'Left')
                            "
                        />
                        <VaButton
                            :class="{'active':component.settings.horizontalAlign === 'Center'}"
                            class="align-button"
                            icon="align_horizontal_center"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.horizontalAlign"
                            @click="
                                component.setSetting(
                                    'horizontalAlign',
                                    'Center',
                                )
                            "
                        />
                        <VaButton
                            :class="{'active':component.settings.horizontalAlign === 'Right'}"
                            class="align-button"
                            icon="align_horizontal_right"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.horizontalAlign"
                            @click="
                                component.setSetting('horizontalAlign', 'Right')
                            "
                        />
                    </div>
                    <div class="align-vertical-buttons ml-2">
                        <VaButton
                            :class="{'active':component.settings.verticalAlign === 'Top'}"
                            class="align-button"
                            icon="align_vertical_top"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.verticalAlign"
                            @click="
                                component.setSetting('verticalAlign', 'Top')
                            "
                        />
                        <VaButton
                            :class="{'active':component.settings.verticalAlign === 'Center'}"
                            class="align-button"
                            icon="align_vertical_center"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.verticalAlign"
                            @click="
                                component.setSetting('verticalAlign', 'Center')
                            "
                        />
                        <VaButton
                            :class="{'active':component.settings.verticalAlign === 'Bottom'}"
                            class="align-button"
                            icon="align_vertical_bottom"
                            size="small"
                            icon-color="#000000"
                            :model-value="component.settings.verticalAlign"
                            @click="
                                component.setSetting('verticalAlign', 'Bottom')
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </va-collapse>
    <va-collapse
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
}

.text-title {
    width: 100%;
}

.text-size {
    width: 63px;
    margin-left: 12px;
}

.text-color {
    width:100px;
}

.text-weight {
    width: 100px;
}

.align-buttons-group {
    display: flex;
    align-self: flex-end;
    margin-left: 12px;

    &__format {
        width: 100%;
    }

    .align-vertical-buttons,
    .align-horizontal-buttons {
        display: flex;
    }

    .align-button {
        width: 32px;
        height: 36px;
        margin-left: 4px;
        border-radius: 4px;

        &:hover {
            --va-background-color: rgb(122, 143, 184) !important;
        }
    }
}

.va-button {
    --va-background-color: var(--app-button-with-icon) !important;
}

.active {
    border-radius: 5px !important;
    border: 2px solid rgb(22, 253, 22) !important;
}
</style>
