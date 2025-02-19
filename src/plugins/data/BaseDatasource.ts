import type { VariableStorage } from "../variables/VariableStorage";
import type ConnectionRepository from "./ConnectionRepository";
import UsesComputedVariable from "./connections/UsesComputedVariable";
import type DatasourceRepository from "./DatasourceRepository";

export interface IBaseConnectionConfiguration {
  connectionRepository: ConnectionRepository;
  datasourceRepository: DatasourceRepository;
  variableStorage: VariableStorage;
  [key: string]: any;
}

export default abstract class BaseDatasource extends UsesComputedVariable implements IDataRetrieveable {
  private subscribers: any[] = [];
  protected datasourceRepository: DatasourceRepository;
  protected connectionRepository: ConnectionRepository;
  protected variableStorage: VariableStorage;

  constructor(configuration: IBaseConnectionConfiguration) {
    super(configuration);

    this.setUpdateCb(() => {
      console.log("Test notify");
      this.notify();
    })

    this.datasourceRepository = configuration.datasourceRepository;
    this.connectionRepository = configuration.connectionRepository;
    this.variableStorage = configuration.variableStorage;
  }

  subscribe(subscriber: () => any) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: () => any) {
    this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
  }

  notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber();
    })
  }
  
  static validateConfiguration(config: any): boolean {
    return true;
  };

  abstract getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]>;
  abstract getOriginalData(): any;
  abstract callEvent(event: string, params: any): void;


  abstract destroy(): void;
}