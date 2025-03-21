import GraphQLConnection from "./GraphQLConnection";
import GraphQLConnectionSettings from "./GraphQLConnectionSettings.vue";

export default {
    Connection: GraphQLConnection,
    Settings: GraphQLConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('GraphQLConnection'),
        Settings: Symbol.for('GraphQLConnectionSettings'),
    },
    Name: 'GraphQL',
} as ConnectionPlugin;