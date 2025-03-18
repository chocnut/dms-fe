import { Folder, CreateFolder } from '@/types/folder'
import { api } from './config'

export const FolderService = {
  getAll: async (parentId?: number) => {
    const params = parentId ? { parent_id: parentId } : undefined
    const { data } = await api.get<{ data: Folder[] }>('/folders', { params })
    return data.data
  },

  create: async (folder: CreateFolder) => {
    const { data } = await api.post<{ data: Folder }>('/folders', folder)
    return data.data
  },
}
