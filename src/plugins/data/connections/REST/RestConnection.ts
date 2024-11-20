export interface IRestConnectionConfiguration {
  url: string;
}

export default class RestConnection implements IConnection {
  private url: any;

  constructor(configuration: IRestConnectionConfiguration) {
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