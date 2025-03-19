import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FolderService } from '@/services/api/folders'
import { CreateFolder } from '@/types/folder'

export const useFolders = (parentId?: number) => {
  return useQuery({
    queryKey: ['folders', parentId],
    queryFn: () => FolderService.getAll(parentId),
  })
}

export const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folder: CreateFolder) => FolderService.create(folder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
    },
  })
}
