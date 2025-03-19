'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { TableItem } from '@/types/common'

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

export const useFiles = (folderId: number | null = null) => {
  return useQuery<TableItem[]>({
    queryKey: ['files', folderId],
    queryFn: async () => {
      console.log('Fetching files for folder:', folderId)
      const response = await api.get<ApiResponse>('/files', {
        params: { parent_id: folderId },
      })
      console.log('API response:', response.data)
      return response.data.data.map(item => ({
        ...item,
        id: Number(item.id),
        created_at: new Date(item.created_at).toISOString(),
      }))
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache is kept for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateFolderData) => {
      console.log('Creating folder:', data)
      const response = await api.post('/folders', data)
      console.log('Create folder response:', response.data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
