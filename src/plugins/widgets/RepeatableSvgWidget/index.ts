import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import RepeatableSvgWidget from './RepeatableSvgWidget.vue';
import RepeatableSvgWidgetSettings from './RepeatableSvgWidgetSettings.vue';

const RepeatableSvgWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('RepeatableSvgWidget', RepeatableSvgWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['RepeatableSvgWidget'] = RepeatableSvgWidget;
      availableWidgetsSettings['RepeatableSvgWidget'] = RepeatableSvgWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        RepeatableSvgWidget: RepeatableSvgWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        RepeatableSvgWidget: RepeatableSvgWidgetSettings
      }
    }
  }
});

export default RepeatableSvgWidgetPlugin;
