import WSConnection from "./WebSocketConnection";
import WebSocketConnectionSettings from "./WebSocketConnectionSettings.vue";

export default {
    Connection: WSConnection,
    Settings: WebSocketConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('WebSocketConnection'),
        Settings: Symbol.for('WebSocketConnectionSettings'),
    },
    Name: 'WebSocket',
} as ConnectionPlugin;