import { type App } from 'vue';
import { VariableStorage } from '../plugins/variables/VariableStorage';
import { VueVariableStorageProxy } from '../plugins/variables/VueVariableStorageProxy';
import container from './inversify';
import SERVICE_IDENTIFIER from './identifiers/services';

export function initVariables(app: App) {
  const variableStorage = new VariableStorage();
  const variableStorageProxy = new VueVariableStorageProxy(variableStorage);

  app.config.globalProperties.$variableStorage = variableStorageProxy;
  container.bind<VariableStorage>(SERVICE_IDENTIFIER.VariablesStorage).toConstantValue(variableStorage);
  
  return variableStorage;
}