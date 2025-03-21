import BaseDatasource, { type IBaseConnectionConfiguration } from "../../BaseDatasource";

export interface ISqlXmlaStoreConfiguration extends IBaseConnectionConfiguration {
  connection: string;
  sql: string;
}

export default class SqlXmlaStore extends BaseDatasource {
  private connection: any;
  private sql: string;
  // private computedUrl: ComputedVariable;

  constructor(configuration: ISqlXmlaStoreConfiguration) {
    super(configuration);
    
    // console.log(configuration);
    this.connection = configuration.connection;
    this.sql = configuration.sql;
    // this.resourceUrl = configuration.resourceUrl;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    let response = null;
    const connectionRepository = this.connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    try {
      const connection = connectionRepository.getConnection(this.connection) as IConnection;
      const mdxResponse = await connection.fetch({
        data: {
          mdx: this.sql
        }
      })
    //   const req = await connection.fetch({ url: this.resourceUrl.value });
    //   const data = await req.json();
      
      const rowset = mdxResponse.Body?.DiscoverResponse?.return?.[0]?.root?.row;
      // console.log(rowset);
      // console.log(mdxResponse);
      if (!rowset) return null as unknown as DataMap[T];

      let response = null as any;

      if (type === 'DataTable') {
        response = this.parseToDataTable(rowset);
      } else if (type === 'object') {
        // Do nothing
      } else if (type === 'string') {
        response = JSON.stringify(response);
      }

      return response;
    } catch (e: any) {
      console.log(e);
      console.warn("Invalid resource URL", e.name);
    }
    return response as unknown as DataMap[T];
  }

  async getOriginalData() {
    const connectionRepository = this.connectionRepository;
    if (!connectionRepository) {
      throw new Error('ConnectionRepository is not provided to Store Classes');
    }
    try {
      const connection = connectionRepository.getConnection(this.connection) as IConnection;

      
      const data = [
        {
            field1: 'value1',
            field2: 'value2',
            field3: 'value3', 
        },
        {
            field1: 'value4',
            field2: 'value5',
            field3: 'value6',
        }
      ]
      return data;
    } catch (e: any) {
      console.warn("Invalid resource URL", e.name)
    }
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

  destroy(): void {}

  static validateConfiguration(configuration: ISqlXmlaStoreConfiguration) {
    if (!configuration.connection) {
      return false;
    }

    return true;
  }
}
