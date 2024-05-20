import { ref, type Ref, watch } from "vue";

export function useSettings<Type>(props: any) {
  const settings = ref({}) as Ref<Type>;

  Object.keys(props).forEach((key) => {
    settings.value[key] = props[key];
  });

  const setSetting = (key, value) => {
    settings.value[key] = value;
  };

  watch(
    props,
    () => {
      Object.keys(props).forEach((key) => {
        settings.value[key] = props[key];
      });
    }
  )
  
  return {
    settings,
    setSetting,
  };
}
