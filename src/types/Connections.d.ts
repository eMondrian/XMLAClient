interface IRequestParams {
  url?: string;
  data?: any;
}

interface IConnection {
  fetch(config: IRequestParams): Promise<any>;
  setConfig(config: any): void;
}

interface IConnectionConfig {
  [key: string]: any;
}

interface IConnectionRepository {
  getConnection(connectionId: string): IConnection;
  registerConnection(connectionId: string, type: string, connectionConfig: IConnectionConfig): void;
  removeConnection(connectionId: string): void;
}