import container from "@/config/inversify";
import { ConnectionFactory } from "./ConnectionFactory";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';

const connections = new Map<string, IConnection | PubSubConnection>();

export default class ConnectionRepository implements IConnectionRepository {
  private availableConnections: Record<string, ConnectionIdentifiers> = {};

  // constructor(availableConnections: Record<string, any>) {
  //   this.availableConnections = availableConnections;
  // }

  constructor() {}

  removeConnection(connectionId: string): void {
    if (connections.has(connectionId)) {
      connections.delete(connectionId);
    }
  }

  getConnection(connectionId: string): IConnection | PubSubConnection {
    const connection = connections.get(connectionId);
    if (!connection) throw new Error(`Connection with id ${connectionId} not found`);

    return connection;
  }

  registerConnectionType(name: string, identifiers: ConnectionIdentifiers): void {
    this.availableConnections[name] = identifiers;
  }

  get registeredConnections(): string[] {
    return Object.keys(this.availableConnections);
  }

  getConnectionIdentifiers(type: string): ConnectionIdentifiers {
    return this.availableConnections[type];
  }

  registerConnection(connectionId: string, type: string, connectionConfig: IConnectionConfig): void {
    const identifiers = this.availableConnections[type];
    const factory = container.get<ConnectionFactory>(SERVICE_IDENTIFIER.ConnectionFactory);

    if (identifiers) {
      const connection = factory.createConnection<IConnection | PubSubConnection>(identifiers.Connection, connectionConfig);
      connections.set(connectionId, connection);
    }
  }
}
