export function extractDataByPath(data: any, path: string) {
  if (!data) return;
  if (path === 'root') return data;
  const keys = path.replace('root.', '').split('.');
  let currentValue = data;

  for (const key of keys) {
    if (key.includes('[') && key.includes(']')) {
      const [arrayKey, index] = key.replace(']', '').split('[');
      if (index === '' || isNaN(Number(index)) || Number(index) < 0) return;
      currentValue = currentValue[arrayKey];
      currentValue = Array.isArray(currentValue)
        ? currentValue[Number(index)]
        : null;
    } else {
      currentValue = currentValue[key];
    }

    if (currentValue == null) break;
  }

  return currentValue;
};
