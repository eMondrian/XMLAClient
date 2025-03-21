import XmlaPreview from "@/components/previews/XmlaPreview.vue";
import XmlaStoreSettings from "./XmlaStoreSettings.vue";
import XmlaStore from "./XmlaStore";

export default {
    Preview: XmlaPreview,
    Settings: XmlaStoreSettings,
    Store: XmlaStore,
    Identifiers: {
        Store: Symbol('XmlaStore'),
        Preview: Symbol('XmlaPreview'),
        Settings: Symbol('XmlaStoreSettings'),
    },
    Name: 'XMLA',
} as DataSourcePlugin;