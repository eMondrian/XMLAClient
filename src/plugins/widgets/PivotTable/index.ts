import PivotTableWidget from "./PivotTableWidget.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import pivot_table from "./pivot_table.svg";

const PivotTableWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("PivotTable", {
            component: PivotTableWidget,
            supportedDSTypes: ["PivotTable"],
            icon: pivot_table,
        });
    },
});

export default PivotTableWidgetPlugin;
