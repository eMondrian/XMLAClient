import { getMdxRequest } from "@/utils/MdxRequests/MdxRequestConstructor";
import type XmlaConnection from "../../connections/XMLA/XmlaConnection";
import { parseMdxRequest, parseRequestToTable } from "@/utils/MdxRequests/MdxRequestHelper";
import DrilldownHandler from "./DrilldownHandler";
import BaseDatasource, { type IBaseConnectionConfiguration } from "../../BaseDatasource";

export interface IXmlaStoreConfiguration extends IBaseConnectionConfiguration {
  connection: string;
  requestParams: XMLARequestParams;
  useVisualEditor: boolean;
  mdx: string;
  drilldownState?: any;
}

interface XMLARequestParams {
  rows: any[];
  columns: any[];
  measures: any[];
  filters: any[];
}

export default class XmlaStore extends BaseDatasource {
  private connection: any;
  private requestParams: XMLARequestParams = {
    rows: [],
    columns: [],
    measures: [],
    filters: [],
  };
  private useVisualEditor: boolean = false;
  private mdx: string = '';
  private drilldownHandler: DrilldownHandler | null = null;

  constructor(configuration: IXmlaStoreConfiguration) {
    super(configuration);

    this.connection = configuration.connection;

    if (this.connection) {
      const connectionRepository = (this as any).connectionRepository;
      const connection = connectionRepository.getConnection(this.connection);

      this.drilldownHandler = new DrilldownHandler(connection, configuration.drilldownState);
    }

    if (configuration.useVisualEditor) {
      this.useVisualEditor = configuration.useVisualEditor;
    }

    if (configuration.mdx) {
      this.mdx = configuration.mdx
    }

    if (configuration.requestParams) {
      this.requestParams = configuration.requestParams;
    }
    this.pollingInterval = configuration.pollingInterval ?? 5000;
    if (this.pollingEnabled) {
        this.startPolling(this.pollingInterval);
    }
  }

  async getOriginalData() {
      throw new Error("Not Implemented");
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

      response.tableState = {
        rowsExpandedMembers: this.drilldownHandler?.rowsExpandedMembers || [],
        rowsDrilldownMembers: this.drilldownHandler?.rowsDrilldownMembers || [],
        columnsExpandedMembers: this.drilldownHandler?.columnsExpandedMembers || [],
        columnsDrilldownMembers: this.drilldownHandler?.columnsDrilldownMembers || [],
      }
    } else if (type === 'DataTable') {
      response = this.parseToDataTable(mdxResponse);
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
      this.drilldownHandler?.columnsDrilldownMembers || [],
      this.drilldownHandler?.rowsDrilldownMembers || [],
      this.drilldownHandler?.rowsExpandedMembers || [],
      this.drilldownHandler?.columnsExpandedMembers || [],
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

  expand(e: DrilldownPayload): any {
    this.drilldownHandler?.handleExpand(e);

    return this.drilldownHandler?.getDrilldownState();
  }

  collapse(e: DrilldownPayload): any {
    this.drilldownHandler?.handleCollapse(e);

    return this.drilldownHandler?.getDrilldownState();
  }

  getConnection(): XmlaConnection {
    const connectionRepository = (this as any).connectionRepository;
    return connectionRepository.getConnection(this.connection);
  }

  callEvent(event: string, params: any) {
    switch (event) {
      case "expand":
        this.expand(params);
        break;
      case "collapse":
        this.collapse(params);
        break;
      default:
        console.warn('Event is not available for this type of store');
    }

    this.notify();
  };

  parseToPivotTable(mdxResponse: any): IPivotTable {
    return parseMdxRequest(mdxResponse) as unknown as IPivotTable;
  }

  parseToDataTable(mdxResponce: any): IDataTable {
    return parseRequestToTable(mdxResponce, 0);
  }

  destroy(): void {
    this.stopPolling();
  }

  static validateConfiguration(configuration: IXmlaStoreConfiguration) {
    if (!configuration?.connection) {
      return false;
    }
    return true;
  }
}