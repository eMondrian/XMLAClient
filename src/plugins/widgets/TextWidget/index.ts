import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import TextWidget from './TextWidget.vue';
import TextWidgetSettings from './TextWidgetSettings.vue';

const TextWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('TextWidget', TextWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['TextWidget'] = TextWidget;
      availableWidgetsSettings['TextWidget'] = TextWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        TextWidget: TextWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        TextWidget: TextWidgetSettings
      }
    }
  }
});

export default TextWidgetPlugin;
