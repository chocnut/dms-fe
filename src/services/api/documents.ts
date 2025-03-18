import { Document, CreateDocument } from '@/types/document'
import { api } from './config'

export const DocumentService = {
  getAll: async (folderId?: number) => {
    const params = folderId ? { folder_id: folderId } : undefined
    const { data } = await api.get<{ data: Document[] }>('/documents', { params })
    return data.data
  },

  create: async (document: CreateDocument) => {
    const { data } = await api.post<{ data: Document }>('/documents', document)
    return data.data
  },
}
