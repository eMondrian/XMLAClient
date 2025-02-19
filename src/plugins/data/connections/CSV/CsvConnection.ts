import BaseConnection, { type BaseConnectionConfig } from "../BaseConnection";

export interface ICsvConnectionConfiguration extends BaseConnectionConfig {
  url: string;
}

export default class CsvConnection extends BaseConnection {
  private url: any;

  constructor(configuration: ICsvConnectionConfiguration) {
    super(configuration);
  
    this.url = super.initVariable(configuration.url);
  }

  fetch(config: IRequestParams): Promise<any> {
    return fetch(this.url.value + config.url);
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