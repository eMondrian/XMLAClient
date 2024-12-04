import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import SampleWidget from './SampleWidget.vue';
import SampleWidgetSettings from './SampleWidgetSettings.vue';

const SampleWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('SampleWidget', SampleWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['SampleWidget'] = SampleWidget;
      availableWidgetsSettings['SampleWidget'] = SampleWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        SampleWidget: SampleWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        SampleWidget: SampleWidgetSettings
      }
    }
  }
});

export default SampleWidgetPlugin;
