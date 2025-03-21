import TextWidget from "./TextWidget.vue";
import TextWidgetSettings from "./TextWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import text from "./text.svg";

const TextWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("TextWidget", {
            component: TextWidget,
            settingsComponent: TextWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: text,
        });
    },
});

export default TextWidgetPlugin;
