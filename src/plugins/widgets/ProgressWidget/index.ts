import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import ProgressWidget from './ProgressWidget.vue';
import ProgressWidgetSettings from './ProgressWidgetSettings.vue';

const ProgressWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('ProgressWidget', ProgressWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['ProgressWidget'] = ProgressWidget;
      availableWidgetsSettings['ProgressWidget'] = ProgressWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        ProgressWidget: ProgressWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        ProgressWidget: ProgressWidgetSettings
      }
    }
  }
});

export default ProgressWidgetPlugin;
