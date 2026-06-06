export interface Column<T> {
  key: keyof T | string
  header: string
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  isLoading?: boolean
  error?: string | null
  emptyTitle?: string
  emptyDescription?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  selectedIds?: Set<string>
  onSelectionChange?: (ids: Set<string>) => void
  onRowClick?: (row: T) => void
  rowActions?: (row: T) => React.ReactNode
  bulkActions?: React.ReactNode
  toolbarExtra?: React.ReactNode
  pageSize?: number
}
