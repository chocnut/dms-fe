'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

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

interface CreateFolderData {
  name: string
  created_by: string
  parent_id: number | null
}

interface UseFilesOptions {
  page?: number
  limit?: number
  search?: string
  sort?: {
    key: string
    direction: 'asc' | 'desc'
  }
}

export const useFiles = (folderId?: number | null, options: UseFilesOptions = {}) => {
  const { page = 1, limit = 10, search = '', sort } = options

  return useQuery({
    queryKey: ['files', folderId, page, limit, search, sort?.key, sort?.direction],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (folderId) params.append('folder_id', String(folderId))
      params.append('page', String(page))
      params.append('limit', String(limit))
      if (search) params.append('search', search)
      if (sort) {
        params.append('sort', sort.key)
        params.append('order', sort.direction)
      }

      const response = await api.get<ApiResponse>(`/files?${params.toString()}`)
      return response.data
    },
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateFolderData) => {
      const response = await api.post('/folders', data)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['files', variables.parent_id] })
      queryClient.invalidateQueries({ queryKey: ['files', null] })
    },
  })
}
