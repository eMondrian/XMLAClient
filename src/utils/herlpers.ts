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

export function parseToDataTable(data: any): IDataTable {
  if (!Array.isArray(data)) return { items: [] };

  const items = data.map((item: any) => {
    if (typeof item !== 'object') return {};

    const row: IDataTableRow = {};

    for (const key in item) {
      if (typeof item[key] === 'object' || Array.isArray(item[key])) continue;
      row[key] = item[key];
    }

    return row;
  });

  return { items };
}