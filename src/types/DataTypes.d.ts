type DataMap = {
  DataTable: IDataTable;
  PivotTable: IPivotTable;
  object: object;
  string: string;
}

interface IDataTableRow {
  [key: string]: any;
}

interface IDataTable {
  items: IDataTableRow[];
}

interface IPivotTable {
  rows: any[][];
  columns: any[][];
  cells: any[][];

  tableState: any;
}