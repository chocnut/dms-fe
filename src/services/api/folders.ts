import { Folder, FolderResponse, SingleFolderResponse } from '@/types/folder'
import { api } from './config'

export const FolderService = {
  getAll: async (parentId?: number) => {
    const params = parentId ? { parent_id: parentId } : undefined
    const { data } = await api.get<FolderResponse>('/folders', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get<SingleFolderResponse>(`/folders/${id}`)
    return data
  },

  create: async (folder: Omit<Folder, 'id' | 'created_at'>) => {
    const { data } = await api.post<SingleFolderResponse>('/folders', folder)
    return data
  },

  update: async (id: number, folder: Partial<Folder>) => {
    const { data } = await api.put<SingleFolderResponse>(`/folders/${id}`, folder)
    return data
  },

  delete: async (id: number) => {
    await api.delete(`/folders/${id}`)
  },
}
