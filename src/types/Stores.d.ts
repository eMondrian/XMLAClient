interface IDataRetrieveable {
  getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]>;
  getOriginalData(): any;
}

interface IDatasourceRepository {
  getDatasource(datasourceName: string): IDataRetrieveable;
  registerDatasource(datasourceName: string, type: string, config: any): void;
}