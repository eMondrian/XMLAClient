interface IDataRetrieveable {
  getData(): Promise<any>;
  getOriginalData(): any;
}

interface IDatasourceRepository {
  getDatasource(datasourceName: string): IDataRetrieveable;
  registerDatasource(datasourceName: string, type: string, config: any): void;
}