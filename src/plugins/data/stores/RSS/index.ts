import RSSPreview from "@/components/previews/RSSPreview.vue";
import RSSStoreSettings from "./RSSStoreSettings.vue";
import RSSStore from "./RSSStore";

export default {
    Preview: RSSPreview,
    Settings: RSSStoreSettings,
    Store: RSSStore,
    Identifiers: {
        Store: Symbol('RSSStore'),
        Preview: Symbol('RSSPreview'),
        Settings: Symbol('RSSStoreSettings'),
    },
    Name: 'RSS',
} as DataSourcePlugin