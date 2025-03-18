import { Document, DocumentResponse, SingleDocumentResponse } from '@/types/document'
import { api } from './config'

export const DocumentService = {
  getAll: async (folderId?: number) => {
    const params = folderId ? { folder_id: folderId } : undefined
    const { data } = await api.get<DocumentResponse>('/documents', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get<SingleDocumentResponse>(`/documents/${id}`)
    return data
  },

  create: async (document: Omit<Document, 'id' | 'created_at'>) => {
    const { data } = await api.post<SingleDocumentResponse>('/documents', document)
    return data
  },

  update: async (id: number, document: Partial<Document>) => {
    const { data } = await api.put<SingleDocumentResponse>(`/documents/${id}`, document)
    return data
  },

  delete: async (id: number) => {
    await api.delete(`/documents/${id}`)
  },
}
