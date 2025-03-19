import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import {
  TableWrapper,
  StyledTable,
  Th,
  Td,
  SortIcon,
  Tr,
  Checkbox,
  MoreButton,
  PaginationContainer,
  RowsPerPageContainer,
  PaginationControls,
  PageNumber,
  NavigationButton,
  RowsSelect,
} from './Table.styles'

interface Column<T, K extends keyof T = keyof T> {
  header: string
  key: K
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  headerRender?: () => React.ReactNode
}

interface TableProps<T, K extends keyof T = keyof T> {
  data: T[]
  columns: Column<T, K>[]
  onSort?: (key: K) => void
  sortKey?: K
  sortDirection?: 'asc' | 'desc'
  page?: number
  totalPages?: number
  rowsPerPage?: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rows: number) => void
}

export function Table<T extends { id?: number | string }, K extends keyof T = keyof T>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection,
  page = 1,
  totalPages = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}: TableProps<T, K>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const visibleIds = data.map(item => item.id!).filter(id => id !== undefined)
    if (e.target.checked) {
      setSelectedRows(new Set(visibleIds))
    } else {
      const newSelected = new Set(selectedRows)
      visibleIds.forEach(id => newSelected.delete(id))
      setSelectedRows(newSelected)
    }
  }

  const handleSelectRow = (id: string | number) => {
    if (id === undefined) return

    setSelectedRows(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(id)) {
        newSelected.delete(id)
      } else {
        newSelected.add(id)
      }
      return newSelected
    })
  }

  const renderSortIcon = (column: Column<T, K>) => {
    if (!column.sortable) return null
    if (sortKey !== column.key) {
      return (
        <SortIcon>
          <FontAwesomeIcon icon={faSort} />
        </SortIcon>
      )
    }
    return (
      <SortIcon>
        <FontAwesomeIcon icon={sortDirection === 'asc' ? faSortUp : faSortDown} />
      </SortIcon>
    )
  }

  const isAllSelected = data.every(item => item.id !== undefined && selectedRows.has(item.id))
  const isSomeSelected =
    data.some(item => item.id !== undefined && selectedRows.has(item.id)) && !isAllSelected

  return (
    <>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>
                <Checkbox
                  checked={isAllSelected}
                  ref={checkbox => {
                    if (checkbox) {
                      checkbox.indeterminate = isSomeSelected
                    }
                  }}
                  onChange={handleSelectAll}
                />
              </Th>
              {columns.map(column => (
                <Th
                  key={String(column.key)}
                  onClick={() => column.sortable && onSort?.(column.key)}
                  $sortable={column.sortable}
                >
                  {column.headerRender ? (
                    column.headerRender()
                  ) : (
                    <>
                      {column.header} {renderSortIcon(column)}
                    </>
                  )}
                </Th>
              ))}
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <Tr key={item.id || index}>
                <Td>
                  <Checkbox
                    checked={item.id !== undefined && selectedRows.has(item.id)}
                    onChange={() => item.id !== undefined && handleSelectRow(item.id)}
                  />
                </Td>
                {columns.map(column => (
                  <Td key={column.key as string}>
                    {column.render ? column.render(item) : String(item[column.key])}
                  </Td>
                ))}
                <Td>
                  <MoreButton>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </MoreButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <PaginationContainer>
        <RowsPerPageContainer>
          <span>Show</span>
          <RowsSelect
            value={rowsPerPage}
            onChange={e => onRowsPerPageChange?.(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </RowsSelect>
          <span>rows per page</span>
        </RowsPerPageContainer>
        <PaginationControls>
          <NavigationButton onClick={() => onPageChange?.(page - 1)} disabled={page === 1}>
            Previous
          </NavigationButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageNumber key={i + 1} onClick={() => onPageChange?.(i + 1)} $active={i + 1 === page}>
              {i + 1}
            </PageNumber>
          ))}
          <NavigationButton onClick={() => onPageChange?.(page + 1)} disabled={page === totalPages}>
            Next
          </NavigationButton>
        </PaginationControls>
      </PaginationContainer>
    </>
  )
}
