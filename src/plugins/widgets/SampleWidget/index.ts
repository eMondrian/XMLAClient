import SampleWidget from "./SampleWidget.vue";
import SampleWidgetSettings from "./SampleWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import sample from "./sample.svg";

const SampleWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("SampleWidget", {
            component: SampleWidget,
            settingsComponent: SampleWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: sample,
        });
    },
});

export default SampleWidgetPlugin;
