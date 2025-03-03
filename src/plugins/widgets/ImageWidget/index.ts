import ImageWidget from "./ImageWidget.vue";
import ImageWidgetSettings from "./ImageWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import image from "./image.svg";

const ImageWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("IconWidget", {
            component: ImageWidget,
            settingsComponent: ImageWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: image,
        });
    },
});

export default ImageWidgetPlugin;
