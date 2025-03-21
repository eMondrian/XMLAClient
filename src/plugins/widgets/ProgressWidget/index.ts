import ProgressWidget from "./ProgressWidget.vue";
import ProgressWidgetSettings from "./ProgressWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import progress from "./progress.svg";

const ProgressWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("ProgressWidget", {
            component: ProgressWidget,
            settingsComponent: ProgressWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: progress,
        });
    },
});

export default ProgressWidgetPlugin;
