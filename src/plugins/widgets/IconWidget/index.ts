import IconWidget from "./IconWidget.vue";
import IconWidgetSettings from "./IconWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import icon from "./icon.svg";

const IconWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("IconWidget", {
            component: IconWidget,
            settingsComponent: IconWidgetSettings,
            supportedDSTypes: ["None"],
            icon: icon,
        });
    },
});

export default IconWidgetPlugin;
