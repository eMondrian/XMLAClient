import VideoWidget from "./VideoWidget.vue";
import VideoWidgetSettings from "./VideoWidgetSettings.vue";
import container from "@/config/inversify";
import { WidgetRepository } from "@/plugins/data/WidgetRepository";
import SERVICE_IDENTIFIER from "@/config/identifiers/services";
import video from "./video.svg";

const VideoWidgetPlugin = () => ({
    install() {
        const widgetRepository = container.get<WidgetRepository>(
            SERVICE_IDENTIFIER.WidgetRepository,
        );

        widgetRepository.registerWidget("VideoWidget", {
            component: VideoWidget,
            settingsComponent: VideoWidgetSettings,
            supportedDSTypes: ["None", "String", "Object"],
            icon: video,
        });
    },
});

export default VideoWidgetPlugin;
