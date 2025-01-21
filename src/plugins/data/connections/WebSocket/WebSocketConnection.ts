import TwoWayConnection from "../TwoWayConnection";

export interface IWSConnectionConfiguration {
  url: string;
}

export default class WSConnection extends TwoWayConnection {
  private socket: WebSocket;

  constructor(configuration: IWSConnectionConfiguration) {
    super();
  
    this.socket = new WebSocket(configuration.url);

    this.socket.onopen = () => {
      super.onConnect();
    }

    this.socket.onmessage = (event: any) => {
      super.onMessage(event.data);
    }

    this.socket.onclose = () => {
      super.onClose();
    }

    this.socket.onerror = (error) => {
      super.onError(error);
    }
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

  hasTopics(): boolean {
    return false;
  }
}