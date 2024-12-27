import { getMdxRequest } from "@/utils/MdxRequests/MdxRequestConstructor";
import type XmlaConnection from "../../connections/XMLA/XmlaConnection";
import { parseMdxRequest } from "@/utils/MdxRequests/MdxRequestHelper";

export interface IXmlaStoreConfiguration {
  connection: string;
  requestParams: XMLARequestParams;
  useVisualEditor: boolean;
  mdx: string;
}

interface XMLARequestParams {
  rows: any[];
  columns: any[];
  measures: any[];
  filters: any[];
}



export default class XmlaStore implements IDataRetrieveable {
  private connection: any;
  private requestParams: XMLARequestParams;
  private useVisualEditor: boolean;
  private mdx: string;

  constructor(configuration: IXmlaStoreConfiguration) {
    this.connection = configuration.connection;

    if (configuration.useVisualEditor) {
      this.useVisualEditor = configuration.useVisualEditor;
    }

    if (configuration.mdx) {
      this.mdx = configuration.mdx
    }

    if (configuration.requestParams) {
      this.requestParams = configuration.requestParams;
    }

    // throw new Error("Method not implemented.");
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    let request;
    let response = null;
    const connectionRepository = (this as any).connectionRepository;
    const connection = connectionRepository.getConnection(this.connection);

    if (this.useVisualEditor) {
      request = await this.getMdxRequest();;
    } else {
      request = this.mdx
    }

    const mdxResponse = await connection.fetch({
      data: {
        mdx: request
      }
    });

    if (type === 'PivotTable') {
      response = this.parseToPivotTable(mdxResponse);
    } else {
      throw new Error("Invalid data type");
    }

    return response as unknown as DataMap[T];
  }

  async getMdxRequest() {
    const connectionRepository = (this as any).connectionRepository;
    const connection = connectionRepository.getConnection(this.connection) as XmlaConnection;
    const properties = await connection.getProperties();
    const levels = await connection.getLevels();

    const mdxRequest = await getMdxRequest(
      connection.cubeName,
      [],
      [],
      [],
      [],
      // rowsDrilldownMembers,
      // columnsDrilldownMembers,
      // rowsExpandedMembers,
      // columnsExpandedMembers,
      this.requestParams.rows,
      this.requestParams.columns,
      this.requestParams.measures,
      {},
      properties,
      [],
      levels,
    );

    return mdxRequest;
  }

  getConnection(): XmlaConnection {
    const connectionRepository = (this as any).connectionRepository;
    return connectionRepository.getConnection(this.connection);
  }

  parseToPivotTable(mdxResponse: any): IPivotTable {
    return parseMdxRequest(mdxResponse) as unknown as IPivotTable;
  }

  static validateConfiguration(configuration: IXmlaStoreConfiguration) {
    if (!configuration?.connection) {
      return false;
    }
    return true;
  }
}