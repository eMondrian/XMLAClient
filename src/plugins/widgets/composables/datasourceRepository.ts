import {  getCurrentInstance, onMounted, type Ref } from 'vue';
import { watch, ref } from 'vue';

export function useDatasourceRepository(dataSourceId: Ref<string>) {
  const instance = getCurrentInstance();
  const datasourceRepository: IDatasourceRepository = (instance?.appContext.config as any).datasourceRepository;

  const data = ref(null as unknown as any);

  const getData = async () => {
    const dataSource = datasourceRepository.getDatasource(dataSourceId.value);
    data.value = await dataSource.getData();
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