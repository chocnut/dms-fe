import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DocumentService } from '@/services/api/documents'
import { CreateDocument } from '@/types/document'

export const useDocuments = (folderId?: number) => {
  return useQuery({
    queryKey: ['documents', folderId],
    queryFn: () => DocumentService.getAll(folderId),
  })
}

export const useCreateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (document: CreateDocument) => DocumentService.create(document),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}
