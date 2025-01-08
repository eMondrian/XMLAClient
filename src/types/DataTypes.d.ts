type DataMap = {
  DataTable: IDataTable;
  PivotTable: IPivotTable;
  object: object;
  string: string;
  ChartData: IChartData;
}

interface IDataTableRow {
  [key: string]: any;
}

interface IDataTable {
  items: IDataTableRow[];
  headers: string[];
  rows: any[];
}

interface IPivotTable {
  rows: any[][];
  columns: any[][];
  cells: any[][];

  tableState: any;
}

interface IChartData {
  labels: string[];
  datasets: any[];
}