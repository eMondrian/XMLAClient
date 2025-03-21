import XmlaConnection from "./XmlaConnection";
import XmlaConnectionSettings from "./XmlaConnectionSettings.vue";

export default {
    Connection: XmlaConnection,
    Settings: XmlaConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('XmlaConnection'),
        Settings: Symbol.for('XmlaConnectionSettings'),
    },
    Name: 'XMLA',
} as ConnectionPlugin;