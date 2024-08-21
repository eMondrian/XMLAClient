<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { ref, onMounted, computed, unref, toRaw, watch } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";

import { XMLAComposer } from "@/plugins/charts/impl/XMLAComposer";
import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import CSVComposerV from "@/plugins/charts/widgets/parts/CSVComposerV.vue";
import XMLAComposerV from "@/plugins/charts/widgets/parts/XMLAComposerV.vue";
import { deepUnref } from "vue-deepunref";
import useComposerManager from "@/plugins/charts/composables/ComposerManager";
import type {
    Composer,
    Selector,
} from "@/plugins/charts/widgets/api/ChartdataComposer";

export interface ITableSettings {
    composer: Composer<Selector>[];
}

interface ITableComponent {
    store: Store | XMLAStore;
    settings: ITableSettings;
    setSetting: (key: string, value: any) => void;
    setStore: (store: Store | XMLAStore) => any;
}

const { component } = defineProps<{ component: ITableComponent }>();

const opened = ref({
    storeSection: false,
});

// TODO: Move to store selection component
const storeManager = useStoreManager();

const requestResult = ref("");

const getStores = computed(() => {
    const storeList = storeManager.getStoreList();
    return Array.from(storeList.value.values());
});

const addComposer = (store: IStore) => {
    console.log("add ");
    const ComposerClass = useComposerManager().getComposerForStoreType(
        store.type,
    );
    const storeData = component.setStore(store as Store);
    if (ComposerClass) {
        const aComposer = new ComposerClass();
        aComposer.setStore(storeData.store.value);
        aComposer.setData(storeData.data);

        const val = [...toRaw(unref(component.settings.composer))];
        val.push(aComposer);
        component.setSetting("composer", val);
    }
};
onMounted(() => {});
</script>

<template>
    <va-collapse v-model="opened.storeSection" header="Data" v-if="component">
        <div class="settings-container">
            <div class="settings-block">
                <!--<DataSetPropertyList  v-model="component.settings.dataSets" @updatev-model="value => component.setSetting('dataSets',value)"></DataSetPropertyList>-->
                <VaDropdown>
                    <template #anchor>
                        <VaButton> Add+ </VaButton>
                    </template>

                    <VaDropdownContent>
                        <VaList>
                            <template v-for="store in getStores">
                                <VaListItem
                                    v-if="
                                        useComposerManager().isRegistered(
                                            store.type,
                                        )
                                    "
                                    @click="addComposer(store)"
                                >
                                    {{ store.caption }}
                                </VaListItem>
                            </template>
                        </VaList>
                    </VaDropdownContent>
                </VaDropdown>
            </div>
            <div
                class="composers"
                v-for="(composer, i) in component.settings.composer"
            >
                <template v-if="composer instanceof XMLAComposer">
                    <XMLAComposerV
                        :modelValue="component.settings.composer[i]"
                        :axes="component.settings.axes"
                        :component="component"
                    ></XMLAComposerV>
                </template>
                <template v-else>
                    <CSVComposerV
                        :modelValue="component.settings.composer[i]"
                        :axes="component.settings.axes"
                        :component="component"
                    ></CSVComposerV>
                </template>
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
    flex-direction: column;
}

.background-colors-block {
    display: flex;
    flex-direction: row;
}

.transparency-input {
    width: 120px;
}

.text-title,
.title-input,
.color-input {
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
    align-items: flex-end;

    .button-group {
        padding: 2px;
    }

    .align-button {
        &:hover {
            --va-background-color: rgb(162, 181, 218) !important;
        }

        &:nth-child(4) {
            // padding-left: 10px;
        }
    }
}
</style>
