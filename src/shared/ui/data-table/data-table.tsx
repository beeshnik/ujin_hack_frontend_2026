import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { Checkbox } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'
import { SearchInput } from '@/shared/ui/search-input'
import { Skeleton } from '@/shared/ui/skeleton'
import { EmptyState } from '@/shared/ui/states/empty-state'
import { ErrorState } from '@/shared/ui/states/error-state'
import { cn } from '@/shared/lib/cn'
import type { DataTableProps } from './types'

type SortDir = 'asc' | 'desc' | null
interface SortState { key: string; dir: SortDir }

export function DataTable<T extends object>({
  data,
  columns,
  keyField,
  isLoading,
  error,
  emptyTitle,
  emptyDescription,
  searchValue = '',
  onSearchChange,
  searchPlaceholder,
  selectedIds,
  onSelectionChange,
  onRowClick,
  rowActions,
  bulkActions,
  toolbarExtra,
  pageSize = 10,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState>({ key: '', dir: null })
  const [page, setPage] = useState(0)
  const [internalSearch, setInternalSearch] = useState('')

  const search = onSearchChange ? searchValue : internalSearch
  const setSearch = onSearchChange ?? setInternalSearch

  const filtered = useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key as keyof T]
        return String(val ?? '').toLowerCase().includes(q)
      }),
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sort.key || !sort.dir) return filtered
    return [...filtered].sort((a, b) => {
      const av = String(a[sort.key as keyof T] ?? '')
      const bv = String(b[sort.key as keyof T] ?? '')
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [filtered, sort])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize)

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return { key: '', dir: null }
    })
    setPage(0)
  }

  const allIds = paged.map((r) => String(r[keyField]))
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds?.has(id))
  const someSelected = allIds.some((id) => selectedIds?.has(id))

  const toggleAll = () => {
    if (!onSelectionChange) return
    if (allSelected) {
      const next = new Set(selectedIds)
      allIds.forEach((id) => next.delete(id))
      onSelectionChange(next)
    } else {
      const next = new Set(selectedIds)
      allIds.forEach((id) => next.add(id))
      onSelectionChange(next)
    }
  }

  const toggleRow = (id: string) => {
    if (!onSelectionChange) return
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onSelectionChange(next)
  }

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sort.key !== colKey) return <ChevronsUpDown className="ml-1 h-3.5 w-3.5 opacity-40" />
    if (sort.dir === 'asc') return <ChevronUp className="ml-1 h-3.5 w-3.5" />
    return <ChevronDown className="ml-1 h-3.5 w-3.5" />
  }

  if (error) return <ErrorState description={error} />

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(0) }}
          placeholder={searchPlaceholder}
          className="w-64"
        />
        {toolbarExtra}
        {selectedIds && selectedIds.size > 0 && bulkActions && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Выбрано: {selectedIds.size}</span>
            {bulkActions}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {onSelectionChange && (
                <th className="w-10 px-3 py-3">
                  <Checkbox
                    checked={allSelected}
                    ref={(el) => {
                      if (el) (el as HTMLInputElement).indeterminate = someSelected && !allSelected
                    }}
                    onCheckedChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn('px-3 py-3 text-left font-medium text-muted-foreground', col.width)}
                >
                  {col.sortable ? (
                    <button
                      className="flex items-center hover:text-foreground"
                      onClick={() => toggleSort(String(col.key))}
                    >
                      {col.header}
                      <SortIcon colKey={String(col.key)} />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
              {rowActions && <th className="w-10 px-3 py-3" />}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  {onSelectionChange && <td className="px-3 py-3"><Skeleton className="h-4 w-4" /></td>}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-3 py-3">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </td>
                  ))}
                  {rowActions && <td className="px-3 py-3" />}
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onSelectionChange ? 1 : 0) + (rowActions ? 1 : 0)}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paged.map((row) => {
                const id = String(row[keyField])
                const isSelected = selectedIds?.has(id)
                return (
                  <tr
                    key={id}
                    className={cn(
                      'border-b transition-colors hover:bg-muted/50',
                      isSelected && 'bg-primary/5',
                      onRowClick && 'cursor-pointer',
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {onSelectionChange && (
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(id)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={String(col.key)} className="px-3 py-3">
                        {col.cell ? col.cell(row) : String(row[col.key as keyof T] ?? '—')}
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Показано {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} из{' '}
            {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Назад
            </Button>
            <span className="px-2">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              Вперёд
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
