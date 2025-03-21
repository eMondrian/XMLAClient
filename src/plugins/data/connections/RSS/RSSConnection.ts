import BaseConnection, { type BaseConnectionConfig } from "../BaseConnection";
import Parser from 'rss-parser/dist/rss-parser.js';

export interface IRestConnectionConfiguration extends BaseConnectionConfig {
  url: string;
}

export default class RestConnection extends BaseConnection {
  private url;
  private parser;

  constructor(configuration: IRestConnectionConfiguration) {
    super(configuration);

    this.url = super.initVariable(configuration.url);
    this.parser = new Parser();
  }

  fetch(config: IRequestParams): Promise<any> {
    return this.parser.parseURL('https://cors-anywhere.herokuapp.com/' + this.url.value);
    // return fetch(this.url.value + config.url);
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