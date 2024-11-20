import { extractDataByPath } from "@/utils/herlpers";

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

  async getData() {
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    try {
      const connection = connectionRepository.getConnection(this.connection);
      const req = await connection.fetch(this.resourceUrl);
      const data = await req.json();

      if (this.selectedJSONValue) {
        return extractDataByPath(data, this.selectedJSONValue);
      }

      return data;
    } catch(e: any) {
      console.warn("Invalid resource URL", e.name);
    }
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
    } catch(e: any) {
      console.warn("Invalid resource URL", e.name)
    }
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
