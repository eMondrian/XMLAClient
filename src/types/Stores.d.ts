interface IDataRetrieveable {
  getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]>;
  getOriginalData(): any;
  callEvent: (event: string, params: any) => void;
  subscribe: (subscriber: () => any) => void;
  unsubscribe: (subscriber: () => any) => void;
}

interface IDatasourceRepository {
  getDatasource(datasourceName: string): IDataRetrieveable;
  registerDatasource(datasourceName: string, type: string, config: any): void;
}