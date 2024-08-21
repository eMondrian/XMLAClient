<!--
Copyright (c) 2023 Contributors to the  Eclipse Foundation.
This program and the accompanying materials are made
available under the terms of the Eclipse Public License 2.0
which is available at https://www.eclipse.org/legal/epl-2.0/
SPDX-License-Identifier: EPL-2.0

Contributors: Smart City Jena

-->
<script lang="ts" setup>
import ComposedTableWidgetSettings, {
    type ITableSettings,
} from "@/plugins/table/widgets/ComposedTableWidgetSettings.vue";
import { inject, onMounted, ref, watch, computed } from "vue";
import { useSettings } from "@/composables/widgets/settings";
import { useStoreManager } from "@/composables/storeManager";
import { useStore } from "@/composables/widgets/store";
import type { Store } from "@/stores/Widgets/Store";
import { useSerialization } from "@/composables/widgets/serialization";
import { deepUnref } from "vue-deepunref";
import { useDataSetSelector } from "@/plugins/charts/composables/dataSetSelector";
import type { TinyEmitter } from "tiny-emitter";
import useChartDataComposer from "@/plugins/charts/composables/ChartDataComposer";
import useComposerManager from "@/plugins/charts/composables/ComposerManager";

const settingsComponent = ComposedTableWidgetSettings;

const props = withDefaults(defineProps<ITableSettings>(), {
    composer: [],
} as any);

const data = ref([]);
const headers = ref([]);

const filter = ref("");
const filterByFields = ref([]);

const currentPage = ref(0);
const perPage = ref(10);
const columns = ref([]);
const filteredItemsAmount = ref(0);

const customFilteringFn = (source, cellData) => {
    if (!filter.value) {
        return true;
    }

    if (filterByFields.value.length >= 1) {
        const searchInCurrentRow = filterByFields.value.some(
            (field) => cellData.column.key === field,
        );
        if (!searchInCurrentRow) return false;
    }

    const filterRegex = new RegExp(filter.value, "i");

    return filterRegex.test(source);
};

const pagesAmount = computed(() => {
    if (!perPage.value) return 1;
    return Math.ceil(filteredItemsAmount.value / perPage.value);
});

const { settings, setSetting } = useSettings(props);
const eventbus = inject("customEventBus") as TinyEmitter;
const getStateComposeable = useSerialization(settings).getState;
const { getDataFilterer } = useDataSetSelector();
const stores = ref([]);
const setStore = (store: Store) => {
    console.log("setStore");
    const storeData = useStore<Store>(eventbus, undefined, undefined);
    storeData.setStore(store);
    stores.value.push(storeData);
    return storeData;
};
const getState = () => {
    const state = deepUnref(getStateComposeable() as any);
    for (let index of state.composer) {
        delete index["data"];
    }
    return state;
};
defineExpose({
    setSetting,
    settings,
    settingsComponent,
    setStore,
    getState,
});

onMounted(() => {});

const chartDataComposer = useChartDataComposer();

chartDataComposer.setComposers(settings.value.composer);

watch(
    () => settings.value.composer,
    (composers) => {
        if (composers && composers.length > 0) {
            let InitializedComposerds = [];
            composers.forEach((composer) => {
                let composerClass = null;
                if ((composer as any).store.type) {
                    //not instanciated
                    composerClass =
                        useComposerManager().getComposerForStoreType(
                            (composer as any).store.type,
                        );
                }
                if (composer instanceof composerClass) {
                    return;
                } else {
                    let composerObj = composer as any;
                    let aCo = new composerClass();

                    let store = useStoreManager().getStore(
                        composerObj.store.id,
                    );
                    let configuredStore = setStore(store as Store);
                    aCo.setStore(configuredStore.store.value);
                    aCo.setData(configuredStore.data);
                    aCo.restoreState(composerObj);

                    InitializedComposerds.push(aCo);
                }
            });

            if (InitializedComposerds.length > 0) {
                setSetting("composer", InitializedComposerds);
            }
            chartDataComposer.setComposers(settings.value.composer);
        }
    },
);

const dataComp = computed(() => {
    if (settings.value.composer && settings.value.composer.length>0) {
        const y = chartDataComposer.getDataForAxesY().value;

        console.log(y);
        const data = y.map((row) => {
            const rowData = row.data;
            const parsedRow = {} as any;
            rowData.forEach((cell, index) => {
                parsedRow[cell.x] = cell.y;
            });

            parsedRow["Row Name"] = row.title;
            return parsedRow;
        });

        return data;
    }
    return [];
});

const colsComputed = computed(() => {
    if (settings.value.composer && settings.value.composer.length>0) {
        const x = chartDataComposer.getDataForMergedAxisX().value;
        return ["Row Name", ...x.data] as any[];
    }
    return [];
})
</script>

<template>
    <div class="table_container">
        <div class="filters">
            <VaInput v-model="filter" placeholder="Filter..." />
            <VaSelect
                v-model="filterByFields"
                placeholder="Select filter fields"
                :options="headers"
                value-by="value"
                multiple
            />
        </div>
        <Suspense>
            <va-data-table
                class="table"
                :items="dataComp"
                sticky-header
                :per-page="-(-perPage)"
                :current-page="currentPage"
                :columns="colsComputed"
                :filter="filter"
                :filter-method="customFilteringFn"
                @filtered="
                    filteredItemsAmount = $event.items.length;
                    currentPage = 1;
                "
            />
        </Suspense>
        <div class="pagination">
            <VaInput
                v-model="perPage"
                label="Items per page"
                class="page_input"
                type="number"
            />
            <VaPagination
                v-model="currentPage"
                :pages="pagesAmount"
                :visible-pages="5"
            />
        </div>
    </div>
</template>

<style scoped>
.filters {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
    flex-grow: 0;
}

.table_container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.table_container .pagination {
    flex-grow: 0;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: end;
}

.table_container .pagination .page_input {
    justify-self: start;
}

.table_container .table {
    flex-grow: 1;
    flex-shrink: 1;
}
</style>
