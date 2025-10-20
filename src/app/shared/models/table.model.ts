export enum ColumnType {
  text = 'text',
  numeric = 'numeric',
  currency = 'currency',
  date = 'date',
  datetime = 'datetime',
  badge = 'badge',
  buttons = 'buttons',
  custom = 'custom'
}

export enum ColumnAlign {
  left = 'left',
  center = 'center',
  right = 'right'
}

export interface ITableButton {
  icon?: string;
  label?: string;
  class?: string;
  tooltip?: string;
  action: (rowData: any) => void;
  visible?: (rowData: any) => boolean;
}

export interface ITableColumn {
  field: string;
  header: string;
  type: ColumnType;
  align?: ColumnAlign;
  headerAlign?: ColumnAlign;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  buttons?: ITableButton[];
  badgeConfig?: {
    getValue: (rowData: any) => string;
    getSeverity: (rowData: any) => 'success' | 'info' | 'warning' | 'danger';
  };
  customTemplate?: string;
}

export interface ITableConfig {
  columns: ITableColumn[];
  data: any[];
  loading?: boolean;
  paginator?: boolean;
  rows?: number;
  totalRecords?: number;
  emptyMessage?: string;
  showCurrentPageReport?: boolean;
  rowsPerPageOptions?: number[];
}