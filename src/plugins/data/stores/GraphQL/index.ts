import GraphQLPreview from "@/components/previews/GraphQLPreview.vue";
import GraphQLStoreSettings from "./GraphQLStoreSettings.vue";
import GraphQLStore from "./GraphQLStore";

export default {
    Preview: GraphQLPreview,
    Settings: GraphQLStoreSettings,
    Store: GraphQLStore,
    Identifiers: {
        Store: Symbol('GraphQLStore'),
        Preview: Symbol('GraphQLPreview'),
        Settings: Symbol('GraphQLStoreSettings'),
    },
    Name: 'GraphQL',
} as DataSourcePlugin;