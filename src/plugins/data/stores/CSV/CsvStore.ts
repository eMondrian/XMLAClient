import CSV from "@/utils/csv-parser";
import BaseDatasource from "../../BaseDatasource";

export interface ICsvStoreConfiguration {
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
  private resourceUrl: string;

  constructor(configuration: ICsvStoreConfiguration) {
    super();
    
    this.connection = configuration.connection;
    this.resourceUrl = configuration.resourceUrl;
  }

  async getOriginalData() {
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }

    const connection = connectionRepository.getConnection(this.connection);
    const req = await connection.fetch({ url: this.resourceUrl });

    if (!req.ok) return [];

    const text = await req.text();
    const data = CSV.parse(text);
    return data;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }

    const connection = connectionRepository.getConnection(this.connection);
    const req = await connection.fetch({ url: this.resourceUrl });

    if (!req.ok) return null as unknown as DataMap[T];

    const text = await req.text();
    const data: ICsvParseResult = CSV.parse(text);

    if (type === "DataTable") {
      return {
        headers: data.header,
        items: data.mappedRows,
        rows: data.rows,
      } as IDataTable as DataMap[T];
    } else {
      console.warn("Invalid data type");
      return null as unknown as DataMap[T];
    }
  }

  callEvent(event: string, params: any) {
    console.warn(`Event "${event}" is not available for this type of store`, params)
  };

  static validateConfiguration(configuration: ICsvStoreConfiguration) {
    if (!configuration.connection) {
      return false;
    }

    if (!configuration.resourceUrl) {
      return false;
    }

    return true;
  }
}