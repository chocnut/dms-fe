'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

interface UploadDocumentData {
  name: string
  type: string
  size: number
  created_by: string
  folder_id: number | null
}

export const useDocuments = (folderId?: number) => {
  return useQuery({
    queryKey: ['documents', folderId],
    queryFn: () =>
      api.get(`/documents${folderId ? `?folder_id=${folderId}` : ''}`).then(res => res.data),
  })
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UploadDocumentData) => {
      const response = await api.post('/documents', data)
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['files', variables.folder_id] })
      queryClient.invalidateQueries({ queryKey: ['files', null] })
    },
  })
}
