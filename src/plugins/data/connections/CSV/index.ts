import CsvConnection from "./CsvConnection";
import CsvConnectionSettings from "./CsvConnectionSettings.vue";

export default {
    Connection: CsvConnection,
    Settings: CsvConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('CsvConnection'),
        Settings: Symbol.for('CsvConnectionSettings'),
    },
    Name: 'CSV',
} as ConnectionPlugin;