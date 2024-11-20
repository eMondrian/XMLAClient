// import { getMdxRequest } from "@/utils/MdxRequests/MdxRequestConstructor";

export interface IXmlaStoreConfiguration {
  connection: string;
  requestParams: XMLARequestParams;
  useMdx: boolean;
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
  private useMdx: boolean;
  private mdx: string;

  constructor(configuration: IXmlaStoreConfiguration) {
    this.connection = configuration.connection;

    throw new Error("Method not implemented.");
  }

  async getData() {
    // let request;

    // if (this.useMdx) {
    //   request = this.mdx
    // } else {
    //   request = '';
    // }

    
    const connectionRepository = (this as any).connectionRepository;
    const connection = connectionRepository.getConnection(this.connection);

    return connection;
    // return this.connection.fetch({
    //   data: {
    //     mdx: request
    //   }
    // });
  }

  async getMdxRequest() {
    // const mdxRequest = await getMdxRequest(
    //   datasource.cube.CUBE_NAME,
    //   rowsDrilldownMembers,
    //   columnsDrilldownMembers,
    //   rowsExpandedMembers,
    //   columnsExpandedMembers,
    //   rows,
    //   columns,
    //   measures,
    //   pivotTableSettings,
    //   datasource.getProperties(),
    //   [],
    //   datasource.getLevels(),
    // );

    // return mdxRequest;
  }

  static validateConfiguration(configuration: IXmlaStoreConfiguration) {
    return false;
  }
}