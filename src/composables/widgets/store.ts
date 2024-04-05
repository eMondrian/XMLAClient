import type { Store } from "@/stores/Widgets/Store";
import type { XMLAStore } from "@/stores/Widgets/XMLAStore";
import { ref, watch, type Ref, inject } from "vue";
import { useStoreManager } from "@/composables/storeManager";
import type { TinyEmitter } from "tiny-emitter";

export function useStore() {
  const data = ref({}) as Ref<any>;
  let store = null as unknown as Store | XMLAStore;
  const storeId = ref("");
  const storeManager = useStoreManager();

  const EventBus = inject("customEventBus") as TinyEmitter;

  const updateFn = async () => {
    if (!store) return;
    data.value = await store.getData();
  };

  watch(
    storeId,
    (newVal, oldVal) => {
      if (!newVal) return;
      store = storeManager.getStore(storeId.value);

      EventBus.off(`UPDATE:${oldVal}`, updateFn);
      EventBus.on(`UPDATE:${newVal}`, updateFn);

      updateFn();
    },
    { immediate: true },
  );

  const setStoreId = (id: string) => {
    storeId.value = id;
  };

  return {
    data,
    storeId,
    setStoreId,
  };
}
