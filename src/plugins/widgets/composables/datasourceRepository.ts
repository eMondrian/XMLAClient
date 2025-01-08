import {  getCurrentInstance, onMounted, type Ref } from 'vue';
import { watch, ref } from 'vue';

export interface IVueDatasourceRepository<T extends keyof DataMap> {
  data: Ref<DataMap[T]>,
  callEvent: (event: string, params: any, shouldUpdate?: boolean) => Promise<void>,
}

export function useDatasourceRepository<T extends keyof DataMap>(dataSourceId: Ref<string>, type: T): IVueDatasourceRepository<T> {
  const instance = getCurrentInstance();
  const datasourceRepository: IDatasourceRepository = (instance?.appContext.config as any).datasourceRepository;

  const data = ref(null as unknown as Ref<DataMap[T]>);

  const getData = async () => {
    if (!dataSourceId.value) {
      data.value = null as unknown as DataMap[T];
      return;
    }

    const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
    data.value = await dataSource.getData(type);
  };

  const callEvent = async (event: string, params: any) => {
    if (dataSourceId.value) {
      const dataSource = datasourceRepository.getDatasource(dataSourceId.value);

      await dataSource.callEvent(event, params);
    }
  }

  watch(() => dataSourceId.value, (newVal, oldVal) => {
    getData();
    const oldDataSource = datasourceRepository.getDatasource(oldVal);
    oldDataSource.unsubscribe(getData);

    const dataSource = datasourceRepository.getDatasource(newVal);
    dataSource.subscribe(getData);
  });
  
  
  onMounted(() => {
    getData();

    const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
    dataSource.subscribe(getData);
  });

  return {
    data,
    callEvent
  }
}