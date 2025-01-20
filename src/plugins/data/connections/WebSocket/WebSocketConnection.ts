import BaseConnection from "../BaseConnection";

export interface IWSConnectionConfiguration {
  url: string;
}

export default class WSConnection extends BaseConnection {
  private url: any;
  private socket: WebSocket;
  private ready: boolean;
  private lastRecievedData = null as unknown as any;

  constructor(configuration: IWSConnectionConfiguration) {
    super();
  
    this.url = configuration.url;

    this.socket = new WebSocket(this.url);
    this.ready = false;

    this.socket.onopen = () => {
      this.ready = true;
    }

    this.socket.onmessage = (event: any) => {
      this.lastRecievedData = JSON.parse(event.data);

      this.notify();
    }

    this.socket.onclose = () => {
      this.ready = false;
    }
    this.socket.onerror = () => {
      this.ready = false;
    }
  }

  fetch(): Promise<any> {
    return this.lastRecievedData;
  }

  setConfig(): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: IWSConnectionConfiguration) {
    if (!configuration.url) {
      return false;
    }

    return true;
  }
}