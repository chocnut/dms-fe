import { api } from '@/lib/api'
import { CreateFolder, FolderResponse, SingleFolderResponse } from '@/types/folder'

export const FolderService = {
  getAll: async (parentId?: number) => {
    const response = await api.get<FolderResponse>(
      parentId ? `/folders?parent_id=${parentId}` : '/folders'
    )
    return response.data
  },

  create: async (folder: CreateFolder) => {
    const response = await api.post<SingleFolderResponse>('/folders', folder)
    return response.data
  },
}
