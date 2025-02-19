import { type App } from 'vue';
import { TinyEmitter } from 'tiny-emitter';
import container from './inversify';
import SERVICE_IDENTIFIER from './identifiers/services';

export function initEventBus(app: App) {
    const eventBus = new TinyEmitter();
    app.config.globalProperties.$eventBus = eventBus;
    container.bind<TinyEmitter>(SERVICE_IDENTIFIER.EventBus).toConstantValue(eventBus);

    return eventBus;
}