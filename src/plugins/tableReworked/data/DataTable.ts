import { parseRequestToTable } from "@/utils/MdxRequests/MdxRequestHelper";

export class DataTable {
    // private TableName: string;
    private columns: string[] = [];
    private rows: string[] = [];
    private data: any = {};
    private selectedRows: string[] = [];
    private selectedColumns: string[] = [];
    public storeId: string;

    constructor(store, eventBus) {
        this.storeId = store.id;
        store.getData().then((e) => {
            const parsedData = parseRequestToTable(e, 1);
            console.log(parsedData);

            this.columns = parsedData.Headers;
            this.rows = Object.keys(parsedData).filter((e) => e !== "Headers");
            this.data = parsedData;
            console.log(this);
        });

        eventBus.on(`UPDATE:${store.id}`, async () => {
            store.getData().then((e) => {
                const parsedData = parseRequestToTable(e, 1);
                console.log(parsedData);

                this.columns = parsedData.Headers;
                this.rows = Object.keys(parsedData).filter(
                    (e) => e !== "Headers",
                );
                this.data = parsedData;
                console.log(this);
            });
        });
    }

    getAvailableColumns() {
        return this.columns;
    }

    getAvailableRows() {
        return this.rows;
    }

    setSelectedRows(row) {
        this.selectedRows = row;
    }

    getSelectedRows() {
        return this.selectedRows;
    }

    setSelectedColumns(columns) {
        this.selectedColumns = columns;
    }

    getSelectedColumns() {
        return this.selectedColumns;
    }

    getData() {
        // return this.
        console.log(this.data);
        const selectedIndexes: number[] = [];
        this.selectedColumns.forEach((e) => {
            selectedIndexes.push(
                this.columns.findIndex((item) => e.caption === item.caption),
            );
        });

        const result = [] as any[];
        this.selectedRows.forEach((e) => {
            console.log(e);
            const row = {} as any;
            row["Row Name"] = {
                caption: e,
            };
            selectedIndexes.forEach((i) => {
                console.log(this.columns, i);
                row[this.columns[i].caption] = this.data[e][i];
            });
            result.push(row);
        });

        console.log(result);

        return {
            columns: [{ caption: "Row Name" }, ...this.selectedColumns],
            data: result,
        };
    }
}
