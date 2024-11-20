export interface ICsvConnectionConfiguration {
  url: string;
}

export default class CsvConnection implements IConnection {
  private url: any;

  constructor(configuration: ICsvConnectionConfiguration) {
    this.url = configuration.url;
  }

  fetch(config: IRequestParams): Promise<any> {
    return fetch(this.url + config.url);
  }

  setConfig(): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: ICsvConnectionConfiguration) {
    if (!configuration.url) {
      return false;
    }

    return true;
  }
}