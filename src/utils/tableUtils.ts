import { Order } from '../components/EnhancedDataTable/EnhancedDataTable';

export function sortTable<
  T extends Partial<Record<keyof T, string | number | boolean>>
>(data: T[], orderBy?: keyof T, order?: Order) {
  function compareValues(orderBy?: keyof T, order?: Order) {
    if (!orderBy || !order) return;
    return function innerSort(a: T, b: T) {
      let comparison = 0;

      if (!a.hasOwnProperty(orderBy) || !b.hasOwnProperty(orderBy)) {
        if (!a.hasOwnProperty(orderBy)) comparison = 1;
        else comparison = -1;
      } else {
        const varA =
          typeof a[orderBy] === 'string'
            ? ((a[orderBy] as unknown) as string).toUpperCase()
            : a[orderBy];
        const varB =
          typeof b[orderBy] === 'string'
            ? ((b[orderBy] as unknown) as string).toUpperCase()
            : b[orderBy];

        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  return data.sort(compareValues(orderBy, order));
}

export function paginateTable<T>(
  pageSize: number,
  pageIndex: number,
  data: T[]
) {
  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;
  const paginatedResult = data.slice(startRow, endRow);
  const totalCount = data.length;

  return {
    totalCount,
    paginatedResult,
  };
}
