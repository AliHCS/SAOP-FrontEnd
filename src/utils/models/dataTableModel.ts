export interface IDatatable {
  columns: any[];
  data: any[];
  pagination: any;
  rowId: string;
  showEdit?: boolean;
  showDelete?: boolean;
  showDetail?: boolean;
  hideActions?: boolean;
  hidePagination?: boolean;
  fixedActions?: boolean;
  rowSelect?: boolean;
  prefix?: string;
}
