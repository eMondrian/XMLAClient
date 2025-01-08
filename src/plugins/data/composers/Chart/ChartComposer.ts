import BaseDatasource from "../../BaseDatasource";

export interface IChartComposerConfiguration {
  connectedDatasources: string[];
  composeBy: string;
  usedSets: string[];
  labelColumn: string;
}

export default class ChartComposer extends BaseDatasource {
  private connectedDatasources: string[];
  private composeBy: string;
  private usedSets: string[];
  private labelColumn: string;

  constructor(configuration: IChartComposerConfiguration) {
    super();

    this.connectedDatasources = configuration.connectedDatasources;

    const updateFn = async () => {
      await this.getData('DataTable');
      this.notify();
    };

    const datasourceRepository = (this as any).datasourceRepository;

    this.connectedDatasources.forEach(function (ds) {
      const datasource = datasourceRepository.getDatasource(ds);
      datasource.subscribe(updateFn)
    });

    this.composeBy = configuration.composeBy;
    this.usedSets = configuration.usedSets;
    this.labelColumn = configuration.labelColumn;
  }

  async getData<T extends keyof DataMap>(type: T): Promise<DataMap[T]> {
    if (!this.composeBy) return null as unknown as DataMap[T];

    const datasourceRepository = (this as any).datasourceRepository;

    const data = await Promise.all(this.connectedDatasources.map(async (datasourceId) => {
      console.log(datasourceId);
      if (!datasourceRepository) {
        throw new Error('DatasourceRepository is not provided to DataSource Classes');
      }
      const datasourceInstance = datasourceRepository.getDatasource(datasourceId);

      return await datasourceInstance.getData('DataTable');
    }));

    if (type === "DataTable") {
      return this.composeArrays(data) as DataMap[T];
    } else if (type === "ChartData") {
      const composedData = this.composeArrays(data);
      return this.parseToChartData(composedData) as DataMap[T];
    } else {
      console.warn("Invalid data type");
      return null as unknown as DataMap[T];
    }
  }

  async getOriginalData() {
    return [];
  }

  callEvent(event: string, params: any) {
    console.warn(`Event "${event}" is not available for this type of store`, params)
  };

  static async getHeaders(connectedDatasources: string[], datasourceRepository: IDatasourceRepository): Promise<string[]> {
    const data = await Promise.all(connectedDatasources.map(async (datasourceId) => {
      if (!datasourceRepository) {
        throw new Error('DatasourceRepository is not provided to DataSource Classes');
      }
      const datasourceInstance = datasourceRepository.getDatasource(datasourceId);

      return await datasourceInstance.getData('DataTable');
    }));

    return data.reduce((acc, table: IDataTable) => {
      table.headers.forEach((header: string) => {
        if (!acc.includes(header)) {
          acc.push(header);
        }
      });
      return acc;
    }, [] as string[]);
  }

  private composeArrays(data: IDataTable[]): IDataTable {
    const resultingDataTable: IDataTable = {
      headers: [],
      rows: [],
      items: [],
    };

    const rowMap = new Map<string, any>();

    data.forEach((table) => {
      table.items.forEach((row) => {
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

    resultingDataTable.items = Array.from(rowMap.values());

    resultingDataTable.headers = data.reduce((acc, table) => {
      table.headers.forEach((header) => {
        if (!acc.includes(header)) {
          acc.push(header);
        }
      });
      return acc;
    }, [] as string[]);

    const rows = [] as any[];

    resultingDataTable.items.forEach((row) => {
      const newRow = resultingDataTable.headers.map((header) => {
        return row[header];
      });

      rows.push(newRow);
    });

    resultingDataTable.rows = rows;
    return resultingDataTable
  }

  private parseToChartData(data: IDataTable): IChartData {
    const chartData = {} as IChartData;
    chartData.labels = data.items.map((e: any) => e[this.labelColumn]);
    chartData.datasets = this.usedSets.map((set) => {
      return {
        label: set,
        data: data.items.map((e: any) => --e[set]),
        backgroundColor: 'red',
      }
    });

    return chartData;
  }

  static validateConfiguration(config: IChartComposerConfiguration): boolean {
    if (!config.connectedDatasources || !config.labelColumn || !config.usedSets || !config.composeBy) return false;
    return true;
  }
}