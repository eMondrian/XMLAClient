import BaseConnection from "../BaseConnection";

export interface IRestConnectionConfiguration {
  url: string;
}

export default class RestConnection extends BaseConnection {
  private url: any;

  constructor(configuration: IRestConnectionConfiguration) {
    super();

    this.url = configuration.url;
  }

  fetch(config: IRequestParams): Promise<any> {
    return fetch(this.url + config);
  }

  setConfig(): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: IRestConnectionConfiguration) {
    if (!configuration.url) {
      return false;
    }

    return true;
  }
}