import styled from 'styled-components'

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-weight: 600;
  color: #333;
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  color: #333;
`

const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`

interface Column<T> {
  header: string
  key: keyof T
  render?: (item: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map(column => (
              <Th key={column.key as string}>{column.header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              {columns.map(column => (
                <Td key={column.key as string}>
                  {column.render ? column.render(item) : String(item[column.key])}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
}
