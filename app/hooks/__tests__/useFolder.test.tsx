import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useFolders, useCreateFolder } from '../useFolders'
import { FolderService } from '@/services/api/folders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, ReactNode } from 'react'
import { Folder, CreateFolder, FolderResponse, SingleFolderResponse } from '@/types/folder'

vi.mock('@/services/api/folders', () => ({
  FolderService: {
    getAll: vi.fn(),
    create: vi.fn(),
  },
}))

const mockFolders: Folder[] = [
  {
    id: 1,
    name: 'Documents',
    parent_id: null,
    created_by: 'John Doe',
    created_at: '2024-01-01',
  },
  {
    id: 2,
    name: 'Images',
    parent_id: null,
    created_by: 'Jane Smith',
    created_at: '2024-01-02',
  },
]

const mockFolderResponse: FolderResponse = {
  status: 'success',
  data: mockFolders,
}

const mockSingleFolderResponse: SingleFolderResponse = {
  status: 'success',
  data: {
    id: 1,
    name: 'New Folder',
    parent_id: null,
    created_by: 'John Doe',
    created_at: '2024-01-01',
  },
}

interface WrapperProps {
  children: ReactNode
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const Wrapper: FC<WrapperProps> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return Wrapper
}

describe('useFolders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(FolderService.getAll).mockResolvedValue(mockFolderResponse)
  })

  it('fetches folders without parent id', async () => {
    const { result } = renderHook(() => useFolders(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(FolderService.getAll).toHaveBeenCalledWith(undefined)
    expect(result.current.data).toEqual(mockFolderResponse)
  })

  it('fetches folders with parent id', async () => {
    const { result } = renderHook(() => useFolders(1), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(FolderService.getAll).toHaveBeenCalledWith(1)
    expect(result.current.data).toEqual(mockFolderResponse)
  })

  it('handles error response', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(FolderService.getAll).mockRejectedValue(error)

    const { result } = renderHook(() => useFolders(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBe(error)
  })
})

describe('useCreateFolder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(FolderService.create).mockResolvedValue(mockSingleFolderResponse)
  })

  it('creates folder successfully', async () => {
    const { result } = renderHook(() => useCreateFolder(), {
      wrapper: createWrapper(),
    })

    const folderData: CreateFolder = {
      name: 'New Folder',
      created_by: 'John Doe',
    }

    result.current.mutate(folderData)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(FolderService.create).toHaveBeenCalledWith(folderData)
    expect(result.current.data).toEqual(mockSingleFolderResponse)
  })

  it('handles error when creating folder', async () => {
    const error = new Error('Failed to create folder')
    vi.mocked(FolderService.create).mockRejectedValue(error)

    const { result } = renderHook(() => useCreateFolder(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'New Folder',
      created_by: 'John Doe',
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBe(error)
  })
})
