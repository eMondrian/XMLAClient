import CSV from "@/utils/csv-parser";

export interface ICsvStoreConfiguration {
  resourceUrl: string;
  connection: string;
}

export default class CsvStore implements IDataRetrieveable {
  private connection: any;
  private resourceUrl: string;

  constructor(configuration: ICsvStoreConfiguration) {
    this.connection = configuration.connection;
    this.resourceUrl = configuration.resourceUrl;
  }

  async getData() {
    console.log(CSV);
    const connectionRepository = (this as any).connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }

    const connection = connectionRepository.getConnection(this.connection);
    const req = await connection.fetch(this.resourceUrl);

    if (!req.ok) return [];

    const text = await req.text();
    const data = CSV.parse(text);
    return data;
  }

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