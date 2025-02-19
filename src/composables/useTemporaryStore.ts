import type { DatasourceFactory } from '@/plugins/data/DataSourceFactory';
import { shallowRef, onMounted, watch, onBeforeUnmount } from 'vue';
import container from "@/config/inversify";
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import DatasourceRepository from '@/plugins/data/DatasourceRepository';

export default function useTemporaryStore(type: string, settings: any) {
    const tempStore = shallowRef(null as any);

    const datasourceRepository = container.get<DatasourceRepository>(SERVICE_IDENTIFIER.DatasourceRepository);
    const identifiers = datasourceRepository.getDatasourceIdentifiers(type);

    const datasourceFactory = container.get<DatasourceFactory>(SERVICE_IDENTIFIER.DatasourceFactory);

    onMounted(async () => {
        tempStore.value = datasourceFactory.createDatasource(identifiers.Store, settings.config);
    });    

    watch(() => settings, async () => {
        tempStore.value?.destroy();
        tempStore.value = datasourceFactory.createDatasource(identifiers.Store, settings.config);
    }, { deep: true });

    onBeforeUnmount(() => {
        tempStore.value?.destroy();
    });
    
    return {
        tempStore,
    }
}