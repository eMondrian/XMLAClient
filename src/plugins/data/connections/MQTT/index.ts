import MQTTConnection from "./MQTTConnection";
import MqttConnectionSettings from "./MqttConnectionSettings.vue";

export default {
    Connection: MQTTConnection,
    Settings: MqttConnectionSettings,
    Identifiers: {
        Connection: Symbol.for('MQTTConnection'),
        Settings: Symbol.for('MqttConnectionSettings'),
    },
    Name: 'MQTT',
} as ConnectionPlugin