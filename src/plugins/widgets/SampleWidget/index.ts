import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import SampleWidget from './SampleWidget.vue';

const SampleWidgetPlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('SampleWidget', SampleWidget);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;

    if (availableWidgets) {
      availableWidgets['SampleWidget'] = SampleWidget;
    } else {
      app.config.globalProperties.availableWidgets = {
        SampleWidget: SampleWidget
      };
    }
  }
});

export default SampleWidgetPlugin;
