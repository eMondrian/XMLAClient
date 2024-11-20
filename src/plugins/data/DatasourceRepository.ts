const datasources = new Map<string, IDataRetrieveable>();

export default class DatasourceRepository implements IDatasourceRepository {
  private availableDatasources: Record<string, any>;

  constructor(availableDatasources: Record<string, any>) {
    this.availableDatasources = availableDatasources;
  }

  removeDatasource(datasourceId: string): void {
    if (datasources.has(datasourceId)) {
      datasources.delete(datasourceId);
    }
  }

  getDatasource(datasourceId: string): IDataRetrieveable {
    const datasource = datasources.get(datasourceId);
    if (!datasource) throw new Error(`Store with id ${datasourceId} not found`);

    return datasource;
  }

  registerDatasource(datasourceId: string, type: string, config: any): void {
    const DatasourceConstructor = this.availableDatasources[type];
    if (!DatasourceConstructor) return;

    if (DatasourceConstructor.validateConfiguration(config)) {
      const datasource = new DatasourceConstructor(config);
      datasources.set(datasourceId, datasource);
    }
  }
}
