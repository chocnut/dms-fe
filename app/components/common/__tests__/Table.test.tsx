import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { Table } from '../Table'

interface TestItem {
  id: number
  name: string
  size: number
}

describe('Table Component', () => {
  const mockData: TestItem[] = [
    { id: 1, name: 'John Doe', size: 1024 },
    { id: 2, name: 'Jane Smith', size: 1024 },
  ]

  const columns = [
    { header: 'Name', key: 'name' as keyof TestItem, sortable: true },
    { header: 'Size', key: 'size' as keyof TestItem, sortable: true },
  ]

  it('renders table headers correctly', () => {
    render(<Table data={mockData} columns={columns} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Size')).toBeInTheDocument()
  })

  it('renders table data correctly', () => {
    render(<Table data={mockData} columns={columns} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()

    const sizeElements = screen.getAllByText('1024')
    expect(sizeElements).toHaveLength(2)
  })

  it('handles sorting when clicking on sortable column headers', async () => {
    const onSort = vi.fn()
    render(
      <Table data={mockData} columns={columns} onSort={onSort} sortKey="name" sortDirection="asc" />
    )

    const nameHeader = screen.getByText('Name')
    await userEvent.click(nameHeader)

    expect(onSort).toHaveBeenCalledWith('name')
  })

  it('handles pagination correctly', async () => {
    const onPageChange = vi.fn()
    render(
      <Table
        data={mockData}
        columns={columns}
        page={1}
        totalPages={2}
        onPageChange={onPageChange}
      />
    )

    const nextButton = screen.getByText('Next')
    await userEvent.click(nextButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('handles rows per page change', async () => {
    const onRowsPerPageChange = vi.fn()
    render(
      <Table
        data={mockData}
        columns={columns}
        rowsPerPage={10}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    )

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, '25')

    expect(onRowsPerPageChange).toHaveBeenCalledWith(25)
  })
})
