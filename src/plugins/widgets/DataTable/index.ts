import DataTable from "./DataTable.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import data_table from "./data_table.svg";

const DataTablePlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("DataTable", {
            component: DataTable,
            supportedDSTypes: ["DataTable"],
            icon: data_table,
        });
    },
});

export default DataTablePlugin;
