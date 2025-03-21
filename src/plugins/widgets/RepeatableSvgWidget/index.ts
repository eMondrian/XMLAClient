import RepeatableSvgWidget from "./RepeatableSvgWidget.vue";
import RepeatableSvgWidgetSettings from "./RepeatableSvgWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import repeatable_svg from "./repeatable_svg.svg";

const RepeatableSvgWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("RepeatableSvgWidget", {
            component: RepeatableSvgWidget,
            settingsComponent: RepeatableSvgWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: repeatable_svg,
        });
    },
});

export default RepeatableSvgWidgetPlugin;
