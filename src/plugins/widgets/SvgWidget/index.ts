import SvgWidgetSettings from "./SvgWidgetSettings.vue";
import SvgWidget from "./SvgWidget.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import svg_icon from "./svg_icon.svg";

const SvgWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("SvgWidget", {
            component: SvgWidget,
            settingsComponent: SvgWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: svg_icon,
        });
    },
});

export default SvgWidgetPlugin;
