import BaseDatasource, { type IBaseConnectionConfiguration } from "../../BaseDatasource";
import type { ComputedString } from "@/plugins/variables/ComputedString";
import type RSSConnection from "../../connections/RSS/RSSConnection";

export interface ICsvStoreConfiguration extends IBaseConnectionConfiguration {
  resourceUrl: string;
  connection: string;
}

export interface ICsvParseResult {
  header: string[];
  rows: any[];
  mappedRows: IDataTableRow[];
}

export default class CsvStore extends BaseDatasource {
  private connection: any;

  constructor(configuration: ICsvStoreConfiguration) {
    super(configuration);
    
    this.connection = configuration.connection;
  }

  async getOriginalData() {
    const connectionRepository = this.connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }

    const connection = connectionRepository.getConnection(this.connection) as RSSConnection;
    const req = await connection.fetch({});

    return req;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    const connectionRepository = this.connectionRepository;;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }

    const connection = connectionRepository.getConnection(this.connection) as RSSConnection;
    const req = await connection.fetch({});

    if (type === "object") {
      return req;
    } else {
      console.warn("Invalid data type");
      return null as unknown as DataMap[T];
    }
  }

  callEvent(event: string, params: any) {
    console.warn(`Event "${event}" is not available for this type of store`, params)
  };

  destroy(): void {}

  static validateConfiguration(configuration: ICsvStoreConfiguration) {
    if (!configuration.connection) {
      return false;
    }
    
    return true;
  }
}