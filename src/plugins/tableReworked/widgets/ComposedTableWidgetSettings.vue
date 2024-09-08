<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import { ref, onMounted, computed, watch, inject } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { Store } from "@/stores/Widgets/Store";

import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import { DataTable } from "@/plugins/tableReworked/data/DataTable";
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
    setDataTables: (data: any) => void;
    getDataTables: () => any;
}

const EventBus = inject("customEventBus") as any;
const updateKey = ref(Date.now());

const dataTables = ref<any>([]);
const row = ref("");
const { component } = defineProps<{ component: ITableComponent }>();

const opened = ref({
    storeSection: false,
});

// TODO: Move to store selection component
const storeManager = useStoreManager();

const getStores = computed(() => {
    const storeList = storeManager.getStoreList();
    return Array.from(storeList.value.values());
});

watch(dataTables.value, (val) => {
    console.log(component);
    component.setDataTables(val);
});

const attachDataTable = (store: IStore) => {
    const dataTable = new DataTable(store, EventBus);
    console.log("add ");

    dataTables.value.push(dataTable);

    EventBus.on(`UPDATE:${dataTable.storeId}`, async () => {
        updateKey.value = Date.now();
    });
    // const ComposerClass = useComposerManager().getComposerForStoreType(
    //     store.type,
    // );
    // const storeData = component.setStore(store as Store);
    // if (ComposerClass) {
    //     const aComposer = new ComposerClass();
    //     aComposer.setStore(storeData.store.value);
    //     aComposer.setData(storeData.data);

    //     const val = [...toRaw(unref(component.settings.composer))];
    //     val.push(aComposer);
    //     component.setSetting("composer", val);
    // }
};
onMounted(() => {
    dataTables.value = component.getDataTables();

    dataTables.value.forEach((dataTable) => {
        EventBus.on(`UPDATE:${dataTable.storeId}`, async () => {
            updateKey.value = Date.now();
        });
    });
});
</script>

<template>
    <va-collapse
        v-model="opened.storeSection"
        header="Data"
        v-if="component"
        :key="updateKey"
    >
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
                                <VaListItem @click="attachDataTable(store)">
                                    {{ store.caption }}
                                </VaListItem>
                            </template>
                        </VaList>
                    </VaDropdownContent>
                </VaDropdown>
            </div>
            <div>
                <div
                    v-for="dataTable in dataTables"
                    style="border-top: 1px black solid; margin-top: 8px"
                >
                    <div>DataTable</div>
                    <VaSelect
                        :model-value="dataTable.getSelectedRows()"
                        @update:model-value="dataTable.setSelectedRows($event)"
                        :options="dataTable.rows"
                        text-by="header"
                        multiple
                        label="Row"
                        placeholder="Select an row"
                    />
                    <VaSelect
                        :model-value="dataTable.getSelectedColumns()"
                        @update:model-value="
                            dataTable.setSelectedColumns($event)
                        "
                        :options="dataTable.columns"
                        text-by="caption"
                        multiple
                        label="Columns"
                        placeholder="Select columns"
                    />
                </div>
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
