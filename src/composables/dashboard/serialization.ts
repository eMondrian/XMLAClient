export declare interface ISerializable {
  getState: () => string;
  loadState: (state: any, eventBus?: any) => void;
}

declare interface SerializableParts {
  [key: string]: ISerializable;
}

export function useSerialization(serializableParts: SerializableParts) {
  const getSerializedState = () => {
    const state = {};

    Object.keys(serializableParts).forEach((key) => {
      state[key] = JSON.parse(serializableParts[key].getState());
    });

    return JSON.stringify(state);
  };

  const loadState = (state) => {
    const parsed = JSON.parse(state);
    Object.keys(serializableParts).forEach((key) => {
      if (!parsed[key]) return;
      serializableParts[key].loadState(parsed[key]);
    });
  };

  return {
    getSerializedState,
    loadState,
  };
}
