import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { TableItem } from '@/types/common'

interface ApiResponse {
  status: 'success' | 'error'
  data: Array<{
    id: number | string
    name: string
    type: 'folder' | 'document'
    size?: number
    folder_id: number | null
    created_by: string
    created_at: string
  }>
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export const useFiles = () => {
  return useQuery<TableItem[]>({
    queryKey: ['files'],
    queryFn: async () => {
      const response = await api.get<ApiResponse>('/files')
      return response.data.data.map(item => ({
        ...item,
        id: Number(item.id),
        created_at: new Date(item.created_at).toISOString(),
      }))
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { name: string; created_by: string }) => {
      const response = await api.post('/files/folder', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] })
    },
  })
}
