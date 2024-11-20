export interface DataTable {
  header: string[];
  rows: any[];
  mappedRows: Record<string, any>[];
}

export interface IDataTableComposerConfiguration {
  connectedDatasources: string[];
  composeBy: string;
}

export default class DataTableComposer implements IDataRetrieveable {
  private connectedDatasources: string[];
  private composeBy: string;

  constructor(configuration: IDataTableComposerConfiguration) {
    this.connectedDatasources = configuration.connectedDatasources;
    this.composeBy = configuration.composeBy;
  }
  
  async getData(): Promise<DataTable | null> {
    if (!this.composeBy) return null;

    const datasourceRepository = (this as any).datasourceRepository;
    
    const data = await Promise.all(this.connectedDatasources.map(async (datasourceId) => {
      console.log(datasourceId);
      if (!datasourceRepository) {
        throw new Error('DatasourceRepository is not provided to DataSource Classes');
      }
      const datasourceInstance = datasourceRepository.getDatasource(datasourceId);

      return await datasourceInstance.getData();
    }));

    return this.composeArrays(data);
  }

  static async getHeaders(connectedDatasources: string[], datasourceRepository: IDatasourceRepository): Promise<string[]> {
    // const datasourceRepository = (this as any).datasourceRepository;
    
    const data = await Promise.all(connectedDatasources.map(async (datasourceId) => {
      console.log(datasourceId);
      if (!datasourceRepository) {
        throw new Error('DatasourceRepository is not provided to DataSource Classes');
      }
      const datasourceInstance = datasourceRepository.getDatasource(datasourceId);

      return await datasourceInstance.getData();
    }));


    return data.reduce((acc, table) => {
      table.header.forEach((header: string) => {
        if (!acc.includes(header)) {
          acc.push(header);
        }
      });
      return acc;
    }, [] as string[]);
  }

  private composeArrays(data: DataTable[]): DataTable {
    const resultingDataTable: DataTable = {
      header: [],
      rows: [],
      mappedRows: [],
    };

    const rowMap = new Map<string, any>();

    data.forEach((table) => {
      table.mappedRows.forEach((row) => {
        const key = row[this.composeBy];

        if (!rowMap.has(key)) {
          rowMap.set(key, {});
        }

        rowMap.set(key, {
          ...rowMap.get(key),
          ...row,
        });
      });
    });

    resultingDataTable.mappedRows = Array.from(rowMap.values());

    resultingDataTable.header = data.reduce((acc, table) => {
      table.header.forEach((header) => {
        if (!acc.includes(header)) {
          acc.push(header);
        }
      });
      return acc;
    }, [] as string[]);

    const rows = [] as any[];

    resultingDataTable.mappedRows.forEach((row) => {
      const newRow = resultingDataTable.header.map((header) => {
        return row[header];
      });

      rows.push(newRow);
    });

    resultingDataTable.rows = rows;
    return resultingDataTable
  }

  static validateConfiguration(config: any): boolean {
    if (!config.connectedDatasources) return false;
    return true;
  }
}