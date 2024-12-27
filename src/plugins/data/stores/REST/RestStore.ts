import { extractDataByPath } from "@/utils/helpers";

export interface IRestStoreConfiguration {
  resourceUrl: string;
  connection: string;
  selectedJSONValue?: string;
}

export default class RestStore implements IDataRetrieveable {
  private connection: any;
  private resourceUrl: string;
  private selectedJSONValue?: string;

  constructor(configuration: IRestStoreConfiguration) {
    this.connection = configuration.connection;
    this.resourceUrl = configuration.resourceUrl;
    this.selectedJSONValue = configuration.selectedJSONValue;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    let response = null;
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    try {
      const connection = connectionRepository.getConnection(this.connection);
      const req = await connection.fetch(this.resourceUrl);
      const data = await req.json();

      if (this.selectedJSONValue) {
        response = extractDataByPath(data, this.selectedJSONValue);
      }

      if (type === 'DataTable') {
        response = this.parseToDataTable(response);
      } else if (type === 'object') {
        // Do nothing
      } else if (type === 'string') {
        response = JSON.stringify(response);
      }

      return response;
    } catch (e: any) {
      console.warn("Invalid resource URL", e.name);
    }
    return response as unknown as DataMap[T];
  }

  async getOriginalData() {
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    try {
      const connection = connectionRepository.getConnection(this.connection);
      const req = await connection.fetch(this.resourceUrl);
      const data = await req.json();

      return data;
    } catch (e: any) {
      console.warn("Invalid resource URL", e.name)
    }
  }

  parseToDataTable(data: any): IDataTable {
    if (!Array.isArray(data)) return { items: [] };

    const items = data.map((item: any) => {
      if (typeof item !== 'object') return {};

      const row: IDataTableRow = {};

      for (const key in item) {
        if (typeof item[key] === 'object' || Array.isArray(item[key])) continue;
        row[key] = item[key];
      }

      return row;
    });

    return { items };
  }

  static validateConfiguration(configuration: IRestStoreConfiguration) {
    if (!configuration.connection) {
      return false;
    }

    if (!configuration.resourceUrl) {
      return false;
    }

    return true;
  }
}
