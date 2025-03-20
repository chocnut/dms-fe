import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Breadcrumb } from '../Breadcrumb'
import { useFiles } from '@/hooks/useFiles'
import type { UseQueryResult } from '@tanstack/react-query'

vi.mock('@/hooks/useFiles')

interface ApiResponse<T = Record<string, unknown>> {
  status: 'success' | 'error'
  data: T
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

describe('Breadcrumb', () => {
  const mockFolders = [
    {
      id: 1,
      name: 'Folder 1',
      type: 'folder' as const,
      folder_id: null,
      created_by: 'test-user',
      created_at: '2024-03-20T00:00:00Z',
    },
    {
      id: 2,
      name: 'Folder 2',
      type: 'folder' as const,
      folder_id: null,
      created_by: 'test-user',
      created_at: '2024-03-20T00:00:00Z',
    },
    {
      id: 3,
      name: 'Folder 3',
      type: 'folder' as const,
      folder_id: null,
      created_by: 'test-user',
      created_at: '2024-03-20T00:00:00Z',
    },
  ]

  const mockResponse: ApiResponse<typeof mockFolders> = {
    status: 'success',
    data: mockFolders,
    pagination: {
      total: mockFolders.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  }

  beforeEach(() => {
    vi.mocked(useFiles).mockReturnValue({
      data: mockResponse,
      isLoading: false,
      error: null,
      isError: false,
      isPending: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isLoadingError: false,
      isRefetchError: false,
      refetch: vi.fn(),
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isPlaceholderData: false,
      isRefetching: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      isFetchedAfterMount: true,
      promise: Promise.resolve(mockResponse),
    } as UseQueryResult<ApiResponse<typeof mockFolders>, Error>)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders home link', () => {
    render(<Breadcrumb folderPath={[]} />)
    const homeLink = screen.getByRole('link', { name: '' })
    expect(homeLink).toHaveAttribute('href', '/documents')
  })

  it('renders folder path correctly', () => {
    render(<Breadcrumb folderPath={['1', '2']} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)

    expect(links[1]).toHaveAttribute('href', '/documents/1')
    expect(links[1]).toHaveTextContent('Folder 1')

    expect(links[2]).toHaveAttribute('href', '/documents/1/2')
    expect(links[2]).toHaveTextContent('Folder 2')
  })

  it('uses custom base path when provided', () => {
    render(<Breadcrumb folderPath={['1']} basePath="/custom" />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/custom')
    expect(links[1]).toHaveAttribute('href', '/custom/1')
  })

  it('shows folder ID if folder name not found', () => {
    render(<Breadcrumb folderPath={['999']} />)

    const link = screen.getByText('999')
    expect(link).toBeInTheDocument()
  })

  it('renders separators between items', () => {
    render(<Breadcrumb folderPath={['1', '2']} />)

    const separators = document.querySelectorAll('svg')
    expect(separators).toHaveLength(3)
  })
})
