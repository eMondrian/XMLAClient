import CsvPreview from "@/components/previews/CsvPreview.vue";
import CsvStoreSettings from "./CsvStoreSettings.vue";
import CsvStore from "./CsvStore";

export default {
    Preview: CsvPreview,
    Settings: CsvStoreSettings,
    Store: CsvStore,
    Identifiers: {
        Store: Symbol('CsvStore'),
        Preview: Symbol('CsvPreview'),
        Settings: Symbol('CsvStoreSettings'),
    },
    Name: 'CSV',
} as DataSourcePlugin