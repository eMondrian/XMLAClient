import RestPreview from "@/components/previews/RestPreview.vue";
import RestStoreSettings from "./RestStoreSettings.vue";
import RestStore from "./RestStore";

export default {
    Preview: RestPreview,
    Settings: RestStoreSettings,
    Store: RestStore,
    Identifiers: {
        Store: Symbol('RestStore'),
        Preview: Symbol('RestPreview'),
        Settings: Symbol('RestStoreSettings'),
    },
    Name: 'REST',
} as DataSourcePlugin;