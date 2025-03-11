import container from '@/config/inversify';
import type DatasourceRepository from '@/plugins/data/DatasourceRepository';
import {  onMounted, onUnmounted, type Ref } from 'vue';
import SERVICE_IDENTIFIER from '@/config/identifiers/services';
import { watch, ref } from 'vue';

export interface IVueDatasourceRepository<T extends keyof DataMap> {
  data: Ref<DataMap[T]>,
  callEvent: (event: string, params: any, shouldUpdate?: boolean) => Promise<void>,
}

export function useDatasourceRepository<T extends keyof DataMap>(dataSourceId: Ref<string>, type: T): IVueDatasourceRepository<T> {
  const datasourceRepository = container.get<DatasourceRepository>(SERVICE_IDENTIFIER.DatasourceRepository);
  const data = ref(null as unknown as Ref<DataMap[T]>);

  const getData = async () => {
    if (!dataSourceId.value) {
      data.value = null as unknown as DataMap[T];
      return;
    }

    try {
      const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
      data.value = await dataSource.getData(type);
    } catch (e) {
      data.value = null as unknown as DataMap[T];
      console.warn(e);
    }
  };

  const callEvent = async (event: string, params: any) => {
    if (dataSourceId.value) {

      try {
        const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
        await dataSource.callEvent(event, params);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  watch(() => dataSourceId.value, (newVal, oldVal) => {
    getData();
    try {
      const oldDataSource = datasourceRepository.getDatasource(oldVal);
      oldDataSource.unsubscribe(getData);

      const dataSource = datasourceRepository.getDatasource(newVal);
      dataSource.subscribe(getData);
    } catch (e) {
      console.warn(e);
    }
  });

  onMounted(() => {
    getData();

    try {
      const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
      dataSource.subscribe(getData);
    } catch (e) {
      console.warn(e);
    }
  });

  onUnmounted(() => {
    try {
      const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
      dataSource.unsubscribe(getData);
    } catch (e) {
      console.warn(e);
    }
  });

  return {
    data,
    callEvent
  }
}
