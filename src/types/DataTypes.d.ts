type DataMap = {
  DataTable: IDataTable;
  object: object;
  string: string;
}

interface IDataTableRow {
  [key: string]: any;
}

interface IDataTable {
  items: IDataTableRow[];
}