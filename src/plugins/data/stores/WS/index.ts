import WSPreview from "@/components/previews/WSPreview.vue";
import WSStoreSettings from "./WSStoreSettings.vue";
import WSStore from "./WSStore";

export default {
    Preview: WSPreview,
    Settings: WSStoreSettings,
    Store: WSStore,
    Identifiers: {
        Store: Symbol('WSStore'),
        Preview: Symbol('WSPreview'),
        Settings: Symbol('WSStoreSettings'),
    },
    Name: 'WS',
} as DataSourcePlugin;