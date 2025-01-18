import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import SvgWidget from './SvgWidget.vue';
import SvgWidgetSettings from './SvgWidgetSettings.vue';

const SvgWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('SvgWidget', SvgWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['SvgWidget'] = SvgWidget;
      availableWidgetsSettings['SvgWidget'] = SvgWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        SvgWidget: SvgWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        SvgWidget: SvgWidgetSettings
      }
    }
  }
});

export default SvgWidgetPlugin;
