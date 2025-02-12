import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import IconWidget from './IconWidget.vue';
import IconWidgetSettings from './IconWidgetSettings.vue';



const IconWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('IconWidget', IconWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['IconWidget'] = IconWidget;
      availableWidgetsSettings['IconWidget'] = IconWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        IconWidget: IconWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        IconWidget: IconWidgetSettings
      }
    }
  }
});

export default IconWidgetPlugin;
