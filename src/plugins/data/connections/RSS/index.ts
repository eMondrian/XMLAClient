import RSSConnection from "./RSSConnection";
import RSSConnectionSettings from "./RSSConnectionSettings.vue";

export default {
    Connection: RSSConnection,
    Settings: RSSConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('RSSConnection'),
        Settings: Symbol.for('RSSConnectionSettings'),
    },
    Name: 'RSS',
} as ConnectionPlugin;