import SqlXmlaPreview from "@/components/previews/SqlXmlaPreview.vue";
import SqlXmlaStoreSettings from "./SqlXmlaStoreSettings.vue";
import SqlXmlaStore from "./SqlXmlaStore";

export default {
    Preview: SqlXmlaPreview,
    Settings: SqlXmlaStoreSettings,
    Store: SqlXmlaStore,
    Identifiers: {
        Store: Symbol('SqlXmlaStore'),
        Preview: Symbol('SqlXmlaPreview'),
        Settings: Symbol('SqlXmlaStoreSettings'),
    },
    Name: 'SQL over XMLA',
} as DataSourcePlugin;
