import { ref, getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'
import container from '@/config/inversify';
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import ConnectionRepository from './ConnectionRepository';

export const useConnectionsStore = defineStore('connections', () => {
  const connections = ref([] as ConnectionDTO[]);
  const connectionRepository = container.get<ConnectionRepository>(SERVICE_IDENTIFIER.ConnectionRepository);

  const createConnection = (type: any, config: any = {}) => {
    const uid = Math.random().toString(36).substring(7);
    const name = 'Connection ' + uid;

    connectionRepository.registerConnection(uid, type, config);
    connections.value.push({ uid, type, name, config });
  }

  const removeConnection = (connectionId: string) => {
    const index = connections.value.findIndex(c => c.uid === connectionId);

    if (index > -1) {
      connections.value.splice(index, 1);
    }
  }

  const updateConnection = (connectionId: string, connectionProxy: ConnectionDTO) => {
    const connection = connections.value.find(c => c.uid === connectionId);

    if (!connection) return;

    connection.uid = connectionProxy.uid;
    connection.type = connectionProxy.type;
    connection.name = connectionProxy.name;
    connection.config = connectionProxy.config;

    connectionRepository.registerConnection(connectionId, connection.type, connection.config);
    console.log(connectionRepository);
  }

  const updateConnections = (connectionProxies: ConnectionDTO[]) => {
    
    connections.value.splice(0);
    connectionProxies.forEach((connectionProxy) => {

      connections.value.push(connectionProxy);
      
      connectionRepository.registerConnection(connectionProxy.uid, connectionProxy.type, connectionProxy.config);
    });
  }

  return { connections, createConnection, removeConnection, updateConnection, updateConnections }
})
