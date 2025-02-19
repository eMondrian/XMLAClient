import RestConnection from "./RestConnection";
import RestConnectionSettings from "./RestConnectionSettings.vue";

export default {
    Connection: RestConnection,
    Settings: RestConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('RestConnection'),
        Settings: Symbol.for('RestConnectionSettings'),
    },
    Name: 'REST',
} as ConnectionPlugin;