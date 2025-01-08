import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import ChartWidget from './ChartWidget.vue';

const ChartPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('ChartWidget', ChartWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;

    if (availableWidgets) {
      availableWidgets['ChartWidget'] = ChartWidget;
    } else {
      app.config.globalProperties.availableWidgets = {
        ChartWidget: ChartWidget
      };
    }
  }
});

export default ChartPlugin;
