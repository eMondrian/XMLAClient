interface IRequestParams {
  url?: string;
  data?: any;
}

interface IConnection {
  fetch(config: IRequestParams): Promise<any>;
  setConfig(config: any): void;
}

type PubSubEvents = "connect" | "message" | "close" | "error";

interface PubSubConnection {
  setConfig(config: any): void;
  subscribe(subscriber: (event: PubSubEvents, data?) => any): void;
  unsubscribe(subscriber: () => any): void;
  notify(event: PubSubEvents, data?: any): void;
}

interface IConnectionConfig {
  [key: string]: any;
}

interface IConnectionRepository {
  getConnection(connectionId: string): IConnection;
  registerConnection(connectionId: string, type: string, connectionConfig: IConnectionConfig): void;
  removeConnection(connectionId: string): void;
}