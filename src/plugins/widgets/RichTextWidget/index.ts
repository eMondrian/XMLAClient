import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import RichTextWidget from './RichTextWidget.vue';
import RichTextWidgetSettings from './RichTextWidgetSettings.vue';


const RichTextWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('RichTextWidget', RichTextWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['RichTextWidget'] = RichTextWidget;
      availableWidgetsSettings['RichTextWidget'] = RichTextWidgetSettings;
    } else {
      app.config.globalProperties.availableWidgets = {
        RichTextWidget: RichTextWidget
      };

      app.config.globalProperties.availableWidgetsSettings = {
        RichTextWidget: RichTextWidgetSettings
      }
    }
  }
});

export default RichTextWidgetPlugin;
