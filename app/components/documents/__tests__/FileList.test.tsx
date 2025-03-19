import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '../../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { FileList } from '../FileList'
import { useFiles } from '@/hooks/useFiles'
import { UseQueryResult } from '@tanstack/react-query'

vi.mock('@/hooks/useFiles', () => ({
  useFiles: vi.fn(),
  useCreateFolder: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}))

vi.mock('@/hooks/useDocuments', () => ({
  useUploadDocument: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

interface ApiResponse {
  status: 'success' | 'error'
  data: Array<{
    id: number
    name: string
    type: 'folder' | 'document'
    folder_id: number | null
    created_by: string
    created_at: string
    size?: number
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const mockFiles = [
  {
    id: 1,
    name: 'test1.pdf',
    type: 'document' as const,
    size: 1024,
    created_by: 'John Doe',
    created_at: '2024-01-01',
    folder_id: null,
  },
  {
    id: 2,
    name: 'test2.pdf',
    type: 'document' as const,
    size: 2048,
    created_by: 'Jane Smith',
    created_at: '2024-01-02',
    folder_id: null,
  },
]

const createMockQueryResult = (data: ApiResponse): UseQueryResult<ApiResponse, Error> => ({
  data,
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: true,
  status: 'success',
  isFetching: false,
  isPending: false,
  isRefetching: false,
  refetch: vi.fn(),
  failureCount: 0,
  errorUpdateCount: 0,
  isLoadingError: false,
  isRefetchError: false,
  isPlaceholderData: false,
  isPaused: false,
  isStale: false,
  isInitialLoading: false,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureReason: null,
  fetchStatus: 'idle',
  isFetched: true,
  isFetchedAfterMount: true,
  promise: Promise.resolve(data),
})

describe('FileList Component', () => {
  const defaultProps = {
    initialFolderId: null,
    folderPath: [],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    const mockQueryResult = createMockQueryResult({
      status: 'success',
      data: mockFiles,
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      },
    })
    vi.mocked(useFiles).mockReturnValue(mockQueryResult)
  })

  it('renders upload files button', () => {
    render(<FileList {...defaultProps} />)
    expect(screen.getByText(/upload files/i)).toBeInTheDocument()
  })

  it('renders add new folder button', () => {
    render(<FileList {...defaultProps} />)
    expect(screen.getByText(/add new folder/i)).toBeInTheDocument()
  })

  it('renders file list with mock data', () => {
    render(<FileList {...defaultProps} />)
    expect(screen.getByText('test1.pdf')).toBeInTheDocument()
    expect(screen.getByText('test2.pdf')).toBeInTheDocument()
    expect(screen.getByText('1 KB')).toBeInTheDocument()
    expect(screen.getByText('2 KB')).toBeInTheDocument()
  })

  it('handles file upload', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<FileList {...defaultProps} />)

    const uploadButton = screen.getByText(/upload files/i)
    await user.click(uploadButton)
    rerender(<FileList {...defaultProps} />)

    expect(screen.getByTestId('file-input')).toBeInTheDocument()
  })

  it('handles folder creation', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<FileList {...defaultProps} />)

    await user.click(screen.getByText(/add new folder/i))
    rerender(<FileList {...defaultProps} />)

    const input = screen.getByPlaceholderText(/enter folder name/i)
    await user.type(input, 'New Folder')
    rerender(<FileList {...defaultProps} />)

    const submitButton = screen.getByText(/create folder/i)
    await user.click(submitButton)
    rerender(<FileList {...defaultProps} />)
  })

  it('handles search input', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<FileList {...defaultProps} />)

    const searchInput = screen.getByPlaceholderText(/search files and folders/i)
    await user.type(searchInput, 'test')

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
    })
    rerender(<FileList {...defaultProps} />)

    expect(useFiles).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        search: 'test',
        page: 1,
        limit: 10,
        sort: expect.objectContaining({
          key: 'created_at',
          direction: 'desc',
        }),
      })
    )

    expect(searchInput).toHaveValue('test')
  })

  it('displays error state when there is an error', () => {
    const errorResult = createMockQueryResult({
      status: 'error',
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    })
    errorResult.error = new Error('Failed to load')
    errorResult.isError = true
    errorResult.status = 'error'

    vi.mocked(useFiles).mockReturnValue(errorResult)

    render(<FileList {...defaultProps} />)
    expect(screen.getByText(/error loading documents and folders/i)).toBeInTheDocument()
  })

  it('renders empty state when no files', () => {
    vi.mocked(useFiles).mockReturnValue(
      createMockQueryResult({
        status: 'success',
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      })
    )
    render(<FileList {...defaultProps} />)
    const table = screen.getByRole('table')
    const tbody = table.querySelector('tbody')
    expect(tbody?.children.length).toBe(0)
  })

  it('handles folder navigation', async () => {
    vi.mocked(useFiles).mockReturnValue(
      createMockQueryResult({
        status: 'success',
        data: [
          {
            id: 1,
            name: 'Test Folder',
            type: 'folder',
            folder_id: null,
            created_by: 'John Doe',
            created_at: '2024-01-01',
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      })
    )
    render(<FileList {...defaultProps} />)
    const folderRow = screen.getByText('Test Folder')
    expect(folderRow).toBeInTheDocument()
  })

  it('shows search input', () => {
    render(<FileList {...defaultProps} />)
    expect(screen.getByPlaceholderText('Search files and folders')).toBeInTheDocument()
  })
})
