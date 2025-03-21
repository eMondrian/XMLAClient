import BaseDatasource, { type IBaseConnectionConfiguration } from "../../BaseDatasource";
import type GraphQLConnection from "../../connections/GraphQL/GraphQLConnection";

export interface IGraphQLStoreConfiguration extends IBaseConnectionConfiguration {
  connection: string;
  query: string;
  variables?: any;
}

export default class GraphQLStore extends BaseDatasource {
  private connection: any;
  private query: string;

  constructor(configuration: IGraphQLStoreConfiguration) {
    super(configuration);

    this.connection = configuration.connection;
    this.query = configuration.query;
    this.pollingInterval = configuration.pollingInterval ?? 5000;
    if (this.pollingEnabled) {
        this.startPolling(this.pollingInterval);
    }
  }

  get fetcher() {
    const connectionRepository = this.connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    const connection = connectionRepository.getConnection(this.connection) as GraphQLConnection;

    return connection.fetcher;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    if (this.query) {
      const request = await this.fetcher({ query: this.query }) as any;
      const result = (await request.next()).value.data;
      return result as unknown as DataMap[T];
    } else {
      console.warn('Query is not provided for GraphQLStore');
      return null as unknown as DataMap[T];
    }
  }

  async getOriginalData() {
    throw new Error("Not Implemented");
  }

  parseToDataTable(data: any): IDataTable {
    if (!Array.isArray(data)) return { items: [], headers: [], rows: [] };

    const headers: string[] = ['index'];
    const rows: any[] = [];

    const items = data.map((item: any, index: number) => {
      if (typeof item !== 'object') return {};

      const row: IDataTableRow = {
        index
      };

      for (const key in item) {
        if (typeof item[key] === 'object' || Array.isArray(item[key])) continue;

        if (!headers.includes(key)) {
          headers.push(key);
        }

        row[key] = item[key];
      }

      return row;
    });

    items.forEach((item: IDataTableRow, index:number) => {
      rows[index] = [];

      headers.forEach((header: string) => {
        rows[index].push(item[header]);
      })
    })

    return { items, headers, rows };
  }

  callEvent(event: string, params: any) {
    console.warn(`Event "${event}" is not available for this type of store`, params)
  };

  destroy(): void {
    this.stopPolling();
  }

  static validateConfiguration(configuration: IGraphQLStoreConfiguration) {
    if (!configuration.connection) {
      return false;
    }

    return true;
  }
}
