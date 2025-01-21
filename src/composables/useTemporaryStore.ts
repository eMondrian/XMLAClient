import { shallowRef, getCurrentInstance, onMounted, watch, onBeforeUnmount } from 'vue';

export default function useTemporaryStore(type: string, settings: any) {
    const tempStore = shallowRef(null as any);
    const instance = getCurrentInstance();

    const constructor = instance?.appContext.config.globalProperties.datasourceConfig.availableDatasources[type];

    onMounted(async () => {
        if (constructor.validateConfiguration(settings.config)) {
            tempStore.value = new constructor(settings.config);
        }
    });    

    watch(() => settings, async () => {
        tempStore.value?.destroy();

        if (constructor.validateConfiguration(settings.config)) {
            tempStore.value = new constructor(settings.config);
        }
    }, { deep: true });

    onBeforeUnmount(() => {
        tempStore.value?.destroy();
    });
    
    return {
        tempStore,
    }
}