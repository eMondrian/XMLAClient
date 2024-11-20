const connections = new Map<string, IConnection>();

export default class ConnectionRepository implements IConnectionRepository {
  private availableConnections: Record<string, any>;

  constructor(availableConnections: Record<string, any>) {
    this.availableConnections = availableConnections;
  }

  removeConnection(connectionId: string): void {
    if (connections.has(connectionId)) {
      connections.delete(connectionId);
    }
  }

  getConnection(connectionId: string): IConnection {
    const connection = connections.get(connectionId);
    if (!connection) throw new Error(`Connection with id ${connectionId} not found`);

    return connection;
  }

  registerConnection(connectionId: string, type: string, connectionConfig: IConnectionConfig): void {
    const ConnectionConstructor = this.availableConnections[type];
    if (!ConnectionConstructor) return;

    if (ConnectionConstructor.validateConfiguration(connectionConfig)) {
      const connection = new ConnectionConstructor(connectionConfig);
      connections.set(connectionId, connection);
    }
  }
}
