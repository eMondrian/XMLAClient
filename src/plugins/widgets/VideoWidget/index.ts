import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import VideoWidget from './VideoWidget.vue';
import VideoWidgetSettings from './VideoWidgetSettings.vue';

const VideoWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('VideoWidget', VideoWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['VideoWidget'] = VideoWidget;
      availableWidgetsSettings['VideoWidget'] = VideoWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        VideoWidget: VideoWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        VideoWidget: VideoWidgetSettings
      }
    }
  }
});

export default VideoWidgetPlugin;
