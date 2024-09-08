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
} from "@/plugins/tableReworked/widgets/ComposedTableWidgetSettings.vue";
import { ref, computed, inject } from "vue";
import { useSettings } from "@/composables/widgets/settings";
import { union, merge } from "lodash";

const settingsComponent = ComposedTableWidgetSettings;
const EventBus = inject("customEventBus") as any;

const props = withDefaults(defineProps<ITableSettings>(), {
    composer: [],
} as any);

const { settings, setSetting } = useSettings(props);

const dataTables = ref<any>([]);

defineExpose({
    setSetting,
    settings,
    settingsComponent,
    setDataTables: (data: any) => {
        dataTables.value = data;
        console.log(dataTables.value);
    },
    getDataTables: () => {
        return dataTables.value;
    },
});

const dataComp = computed(() => {
    // Logic for getting data from composer
    let result = [] as any[];

    dataTables.value.forEach((dataTable) => {
        const data = dataTable.getData().data;
        console.log("data", data);
        delete data.Headers;

        data.forEach((row) => {
            const existingRow = result.findIndex(
                (r) => r["Row Name"] === row["Row Name"],
            );
            if (existingRow !== -1) {
                result[existingRow] = { ...result[existingRow], ...row };
            } else {
                result.push(row);
            }
        });
        result = merge(result, dataTable.getData().data);
    });
    // if (settings.value.composer && settings.value.composer.length>0) {
    //     const y = chartDataComposer.getDataForAxesY().value;

    //     console.log(y);
    //     const data = y.map((row) => {
    //         const rowData = row.data;
    //         const parsedRow = {} as any;
    //         rowData.forEach((cell, index) => {
    //             parsedRow[cell.x] = cell.y;
    //         });

    //         parsedRow["Row Name"] = row.title;
    //         return parsedRow;
    //     });

    //     return data;
    // }
    // return [];
    console.log("result", result);
    return result;
});

const colsComputed = computed(() => {
    // Logic for parsing data from composer
    const result = new Map() as Map<string, any>;

    dataTables.value.forEach((dataTable) => {
        const cols = dataTable.getData().columns;
        console.log(cols);

        cols.forEach((col) => {
            col.key = col.caption;
            col.label = col.caption;
            if (result.has(col.caption)) {
                result.set(col.caption, union(result.get(col.caption), col));
            } else {
                result.set(col.caption, col);
            }
        });
    });

    const qwe = Array.from(result).map((e) => e[1]);
    console.log(qwe);
    return qwe;

    // if (settings.value.composer && settings.value.composer.length>0) {
    //     const x = chartDataComposer.getDataForMergedAxisX().value;
    //     return ["Row Name", ...x.data] as any[];
    // }
    // return [];
});

const getDrilldownOptions = (source: any) => {
    const result = [];
    if (source.axis1) {
        result.push("Drilldown on row");
    }

    if (source.axis0) {
        result.push("Drilldown on column");
    }

    return result;
};

const drilldown = (value: string, source: any) => {
    dataTables.value.forEach((dt) => {
        const store = dt.storeId;

        if (value === "Drilldown on row") {
            EventBus.emit(`EXPAND:${store}`, {
                value: source.axis1.Member,
                area: "rows",
            });
        } else if (value === "Drilldown on column") {
            EventBus.emit(`EXPAND:${store}`, {
                value: source.axis0.Member,
                area: "columns",
            });
        }
        console.log(store, source);
    });
    console.log(value, source);
};
</script>

<template>
    <div class="table_container">
        <Suspense>
            <va-data-table
                class="table"
                :items="dataComp"
                sticky-header
                :columns="colsComputed"
            >
                <!-- <template #header="header">
                    <span @contextmenu.stop.prevent="console.log(header)">header</span>
                </template> -->
                <template
                    v-for="col in colsComputed"
                    :key="col.key"
                    #[`header(${col.key})`]="{ key, label }"
                >
                    <VaMenu
                        :options="col.__meta ? ['Drilldown'] : []"
                        @selected="(v) => drilldown(v, col)"
                    >
                        <template #anchor>
                            {{ label }}
                        </template>
                    </VaMenu>
                </template>
                <template
                    v-for="col in colsComputed"
                    :key="col.key"
                    #[`cell(${col.key})`]="{ source }"
                >
                    <VaMenu
                        :options="getDrilldownOptions(source)"
                        @selected="(v) => drilldown(v, source)"
                    >
                        <template #anchor>
                            {{ source.value || source.caption }}
                        </template>
                    </VaMenu>
                </template>
            </va-data-table>
        </Suspense>
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
