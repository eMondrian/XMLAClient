import BaseConnection, { type BaseConnectionConfig } from "../BaseConnection";
import { createGraphiQLFetcher, type Fetcher } from '@graphiql/toolkit';

export interface IGraphQLConnectionConfiguration extends BaseConnectionConfig {
  url: string;
}

export default class GraphQLConnection extends BaseConnection {
  private url: any;
  public fetcher: Fetcher;

  constructor(configuration: IGraphQLConnectionConfiguration) {
    super(configuration);

    this.url = super.initVariable(configuration.url);

    // TODO: fix reactivity for computed string
    this.fetcher = createGraphiQLFetcher({ 
      url: this.url.value
    });
  }

  fetch(config: IRequestParams): Promise<any> {
    throw new Error("Method not implemented.");
  }

  setConfig(): void {
    throw new Error("Method not implemented.");
  }

  static validateConfiguration(configuration: IGraphQLConnectionConfiguration) {
    if (!configuration.url) {
      return false;
    }

    return true;
  }
}