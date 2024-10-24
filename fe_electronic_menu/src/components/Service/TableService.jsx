import { useSearchParams } from 'react-router-dom';

export const getTableFromUrl = (searchParams) => {
  const tableId = searchParams.get('table_id');
  const tableName = searchParams.get('table_name');

  return { tableId, tableName };
};

/**
 * Cập nhật thông tin bàn lên URL
 */
export const setTableToUrl = (navigate, table) => {
  if (table?.id && table?.nameTable) {
    const params = new URLSearchParams();
    params.set('table_id', table.id);
    params.set('table_name', table.nameTable);
    navigate({ search: params.toString() });  // Điều hướng với URL mới
  }
};
