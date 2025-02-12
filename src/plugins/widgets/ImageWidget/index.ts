import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import ImageWidget from './ImageWidget.vue';
import ImageWidgetSettings from './ImageWidgetSettings.vue';


const ImageWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('ImageWidget', ImageWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['ImageWidget'] = ImageWidget;
      availableWidgetsSettings['ImageWidget'] = ImageWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        ImageWidget: ImageWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        ImageWidget: ImageWidgetSettings
      }
    }
  }
});

export default ImageWidgetPlugin;
