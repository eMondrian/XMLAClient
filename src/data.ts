import type { App } from "vue";
import DatasourceRepository from './plugins/data/DatasourceRepository'
import ConnectionRepository from './plugins/data/ConnectionRepository';

import CsvConnection from "./plugins/data/connections/CSV";
import GraphQLConnection from "./plugins/data/connections/GraphQL";
import RestConnection from "./plugins/data/connections/REST";
import WebSocketConnection from "./plugins/data/connections/WebSocket";
import MQTTConnection from "./plugins/data/connections/MQTT";
import XMLAConnection from "./plugins/data/connections/XMLA";
import RSSConnection from './plugins/data/connections/RSS';

import ComputedVariable from '@/components/variables/ComputedVariable.vue';
import ConstantVariable from '@/components/variables/ConstantVariable.vue';
import QueryVariable from '@/components/variables/QueryVariable.vue';
import TimeVariable from '@/components/variables/TimeVariable.vue';
import RequestVariable from '@/components/variables/RequestVariable.vue';
import BrowserPropertiesVariable from '@/components/variables/BrowserPropertiesVariable.vue';

import { SourceType } from '@/types/enum';
import { DatasourceFactory } from "./plugins/data/DataSourceFactory";
import type { VariableStorage } from "./plugins/variables/VariableStorage";

import Rest from './plugins/data/stores/REST';
import CSV from "./plugins/data/stores/CSV";
import container from "./config/inversify";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import GraphQL from "./plugins/data/stores/GraphQL";
import WS from "./plugins/data/stores/WS";
import XMLA from "./plugins/data/stores/XMLA";
import RSS from "./plugins/data/stores/RSS";
import SQL_XMLA from "./plugins/data/stores/SQL_XMLA";
import { ConnectionFactory } from "./plugins/data/ConnectionFactory";

export function initData(app: App, variableStorage: VariableStorage) {
  const componentMap = {
    [SourceType.Constant]: ConstantVariable,
    [SourceType.Expression]: ComputedVariable,
    [SourceType.QueryParameter]: QueryVariable,
    [SourceType.AsyncParameters]: RequestVariable,
    [SourceType.Time]: TimeVariable,
    [SourceType.BrowserProperties]: BrowserPropertiesVariable,
  };
  
  app.config.globalProperties.componentMap = componentMap;

  const connectionRepository = new ConnectionRepository();
  initConnection(connectionRepository, CsvConnection);
  initConnection(connectionRepository, GraphQLConnection);
  initConnection(connectionRepository, RestConnection);
  initConnection(connectionRepository, WebSocketConnection);
  initConnection(connectionRepository, MQTTConnection);
  initConnection(connectionRepository, XMLAConnection);
  initConnection(connectionRepository, RSSConnection);
  

  const datasourceRepository = new DatasourceRepository();
  container.bind<DatasourceRepository>(SERVICE_IDENTIFIER.DatasourceRepository).toConstantValue(datasourceRepository);
  container.bind<ConnectionRepository>(SERVICE_IDENTIFIER.ConnectionRepository).toConstantValue(connectionRepository);

  initDataSource(datasourceRepository, Rest);
  initDataSource(datasourceRepository, CSV);
  initDataSource(datasourceRepository, GraphQL);
  initDataSource(datasourceRepository, WS);
  initDataSource(datasourceRepository, XMLA);
  initDataSource(datasourceRepository, RSS);
  initDataSource(datasourceRepository, SQL_XMLA);

  const connectionFactory = new ConnectionFactory();
  const datasourceFactory = new DatasourceFactory();

  container.bind<ConnectionFactory>(SERVICE_IDENTIFIER.ConnectionFactory).toConstantValue(connectionFactory);
  container.bind<DatasourceFactory>(SERVICE_IDENTIFIER.DatasourceFactory).toConstantValue(datasourceFactory);

  return {
    datasourceRepository
  }
}

function initDataSource(datasourceRepository: DatasourceRepository, datasourcePlugin: DataSourcePlugin) {
  container.bind(datasourcePlugin.Identifiers.Store).toConstructor(datasourcePlugin.Store);
  container.bind(datasourcePlugin.Identifiers.Preview).toConstructor(datasourcePlugin.Preview);
  container.bind(datasourcePlugin.Identifiers.Settings).toConstructor(datasourcePlugin.Settings);

  datasourceRepository.registerDatasourceType(datasourcePlugin.Name, datasourcePlugin.Identifiers);
}

function initConnection(connectionRepository: ConnectionRepository, connectionPlugin: ConnectionPlugin) {
  container.bind(connectionPlugin.Identifiers.Connection).toConstructor(connectionPlugin.Connection);
  container.bind(connectionPlugin.Identifiers.Settings).toConstructor(connectionPlugin.Settings);

  connectionRepository.registerConnectionType(connectionPlugin.Name, connectionPlugin.Identifiers);
}