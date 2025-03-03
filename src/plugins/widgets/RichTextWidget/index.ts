import RichTextWidget from "./RichTextWidget.vue";
import RichTextWidgetSettings from "./RichTextWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import rich_text from "./rich_text.svg";

const RichTextWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("RichTextWidget", {
            component: RichTextWidget,
            settingsComponent: RichTextWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: rich_text,
        });
    },
});

export default RichTextWidgetPlugin;
