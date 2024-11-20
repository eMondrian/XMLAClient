import { type App } from 'vue';
import { VariableStorage } from './plugins/variables/VariableStorage';
import { VueVariableStorageProxy } from './plugins/variables/VueVariableStorageProxy';
import type { TinyEmitter } from 'tiny-emitter';

export function initVariables(app: App, eventBus: TinyEmitter) {
  const variableStorage = new VariableStorage(eventBus);
  const variableStorageProxy = new VueVariableStorageProxy(variableStorage);

  app.config.globalProperties.$variableStorage = variableStorageProxy;
}