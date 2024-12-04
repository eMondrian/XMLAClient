import DatasourceRepository from '@/plugins/data/DatasourceRepository';
import DataTable from './DataTable.vue';

const DataTablePlugin = (datasourceRepository: DatasourceRepository) => ({
  install(app: any) {
    const component = app.component('DataTable', DataTable);
    component.config.datasourceRepository = datasourceRepository;
    const availableWidgets = app.config.globalProperties.availableWidgets;

    if (availableWidgets) {
      availableWidgets['DataTable'] = DataTable;
    } else {
      app.config.globalProperties.availableWidgets = {
        DataTable: DataTable
      };
    }
  }
});

export default DataTablePlugin;
