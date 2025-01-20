import BaseDatasource from "../../BaseDatasource";

export interface IWSStoreConfiguration {
  connection: string;
}

export default class WSStore extends BaseDatasource {
  private connection: any;
  constructor(configuration: IWSStoreConfiguration) {
    super();

    this.connection = configuration.connection;

    const connectionRepository = (this as any).connectionRepository;
    const connection = connectionRepository.getConnection(this.connection);

    connection.subscribe(() => {
      this.notify();
    });
  }

  getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    const connectionRepository = (this as any).connectionRepository;
    const connection = connectionRepository.getConnection(this.connection);

    const data = connection.fetch();
    if (type === "object") {
      return data as Promise<DataMap[T]>;
    } if (type === "string") {
      return JSON.stringify(data) as unknown as Promise<DataMap[T]>;
    }
    
    throw new Error("Method not implemented.");
  }
  getOriginalData() {
    throw new Error("Method not implemented.");
  }
  callEvent(event: string, params: any): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: IWSStoreConfiguration) {
    if (!configuration?.connection) {
      return false;
    }
    return true;
  }
}