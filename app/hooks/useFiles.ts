'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { TableItem } from '@/types/common'

interface ApiResponse {
  data: TableItem[]
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
      const response = await api.get<ApiResponse>('/files', {
        params: { folder_id: folderId },
      })
      return response.data.data.map(item => ({
        ...item,
        id: Number(item.id),
        created_at: new Date(item.created_at).toISOString(),
      }))
    },
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateFolderData) => api.post('/folders', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
