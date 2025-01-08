import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import PivotTableWidget from './PivotTableWidget.vue';
// import TextWidgetSettings from './TextWidgetSettings.vue';

const PivotTableWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('PivotTableWidget', PivotTableWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;
    // const availableWidgetsSettings = app.config.globalProperties.availableWidgetsSettings;

    if (availableWidgets) {
      availableWidgets['PivotTableWidget'] = PivotTableWidget;
      // availableWidgetsSettings['PivotTableWidget'] = PivotTableWidget;
    } else {
      app.config.globalProperties.availableWidgets = {
        PivotTableWidget: PivotTableWidget
      };

      // app.config.globalProperties.availableWidgetsSettings = {
      //   PivotTableWidget: PivotTableWidget
      // }
    }
  }
});

export default PivotTableWidgetPlugin;
