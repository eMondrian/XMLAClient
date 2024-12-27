import {  getCurrentInstance, onMounted, type Ref } from 'vue';
import { watch, ref } from 'vue';

export function useDatasourceRepository<T extends keyof DataMap>(dataSourceId: Ref<string>, type: T): { data: Ref<DataMap[T]> } {
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

  watch(() => dataSourceId.value, () => {
    getData();
  });
  
  
  onMounted(() => {
    getData();
  });

  return {
    data
  }
}