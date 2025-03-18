import styled from 'styled-components'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSort,
  faSortUp,
  faSortDown,
  faEllipsisVertical,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
`

const Th = styled.th<{ sortable?: boolean }>`
  padding: 16px;
  text-align: left;
  background-color: #f8f9ff;
  color: #4169e1;
  font-weight: 500;
  font-size: 14px;
  cursor: ${props => (props.sortable ? 'pointer' : 'default')};
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;

  &:first-child {
    padding-left: 32px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    padding-right: 32px;
    border-top-right-radius: 8px;
  }
`

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 14px;

  &:first-child {
    padding-left: 32px;
  }

  &:last-child {
    padding-right: 32px;
  }
`

const SortIcon = styled.span`
  margin-left: 4px;
  font-size: 12px;
`

const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1px solid #9ca3af;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: #4169e1;
    border-color: #4169e1;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }

  &:hover {
    border-color: #4169e1;
  }

  &:indeterminate {
    background-color: #4169e1;
    border-color: #4169e1;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 8a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z'/%3e%3c/svg%3e");
  }
`

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #9ca3af;
  font-size: 16px;

  &:hover {
    color: #4169e1;
  }
`

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-top: 1px solid #eee;
  margin-top: 8px;
`

const PageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => (props.active ? '#4169E1' : '#E5E7EB')};
  background: white;
  color: ${props => (props.active ? '#4169E1' : '#666')};
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${props => (props.active ? '#F8F9FF' : '#F8F9FF')};
    border-color: #4169e1;
  }
`

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Select = styled.select`
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background-color: white;
  color: #374151;
  cursor: pointer;

  &:hover {
    border-color: #4169e1;
  }

  &:focus {
    border-color: #4169e1;
    outline: none;
  }
`

interface Column<T> {
  header: string
  key: keyof T
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  onSort?: (key: keyof T) => void
  sortKey?: keyof T
  sortDirection?: 'asc' | 'desc'
}

export function Table<T extends { id?: number | string }>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const visibleIds = paginatedData.map(item => item.id!).filter(id => id !== undefined)
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

  const renderSortIcon = (column: Column<T>) => {
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

  const totalPages = Math.ceil(data.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage)

  const isAllCurrentPageSelected = paginatedData.every(
    item => item.id !== undefined && selectedRows.has(item.id)
  )
  const isSomeCurrentPageSelected =
    paginatedData.some(item => item.id !== undefined && selectedRows.has(item.id)) &&
    !isAllCurrentPageSelected

  return (
    <>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <Th>
                <Checkbox
                  checked={isAllCurrentPageSelected}
                  ref={checkbox => {
                    if (checkbox) {
                      checkbox.indeterminate = isSomeCurrentPageSelected
                    }
                  }}
                  onChange={handleSelectAll}
                />
              </Th>
              {columns.map(column => (
                <Th
                  key={column.key as string}
                  sortable={column.sortable}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  {column.header} {renderSortIcon(column)}
                </Th>
              ))}
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
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
      <PaginationWrapper>
        <RowsPerPage>
          <span>Show</span>
          <Select value={rowsPerPage} onChange={e => setRowsPerPage(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </Select>
          <span>rows per page</span>
        </RowsPerPage>
        <PageSelector>
          <PageButton
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </PageButton>
        </PageSelector>
      </PaginationWrapper>
    </>
  )
}
