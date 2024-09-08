import ComposedTableWidget from "./widgets/ComposedTableWidget.vue";

import { enabledWidgets, widgetNames } from "@/components/Widgets";
import { useStoreManager } from "@/composables/storeManager";
import CSVStore from "@/plugins/charts/stores/CSVStore";
import CSVStoreListItem from "@/plugins/charts/stores/CSVStoreListItem.vue";
import useComposerManager from "@/plugins/charts/composables/ComposerManager";
import { CSVComposer } from "@/plugins/charts/impl/CSVComposer";
import CSVComposerV from "@/plugins/charts/widgets/parts/CSVComposerV.vue";
import type { Component } from "vue";
import XMLAComposerV from "@/plugins/charts/widgets/parts/XMLAComposerV.vue";
import { XMLAComposer } from "@/plugins/charts/impl/XMLAComposer";
import { XMLAStore } from "@/stores/Widgets/XMLAStore";

export default {
    install: (app) => {
        app.component(ComposedTableWidget);
        app.component("CSVStoreListItem", CSVStoreListItem);
        enabledWidgets["ComposedTableWidgetReworked"] = ComposedTableWidget;
        widgetNames.push({
            name: "ComposedTableWidgetReworked",
            label: "ComposedTableWidgetReworked",
        });

        useStoreManager().registerStoreType(CSVStore);
        useComposerManager().registerComposer(
            CSVComposer,
            CSVComposerV as unknown as Component,
            CSVStore.TYPE,
        );
        useComposerManager().registerComposer(
            XMLAComposer,
            XMLAComposerV as unknown as Component,
            XMLAStore.TYPE,
        );
    },
};
