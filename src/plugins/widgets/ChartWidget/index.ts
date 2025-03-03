import ChartWidget from "./ChartWidget.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import chart from "./chart.svg";

const ChartPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("IconWidget", {
            component: ChartWidget,
            supportedDSTypes: ["Chart"],
            icon: chart,
        });
    },
});

export default ChartPlugin;
