import { Document, CreateDocument } from '@/types/document'
import { api } from './config'

interface UploadDocumentData {
  name: string
  type: string
  size: number
  folder_id?: number | null
  created_by: string
}

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

  upload: async (data: UploadDocumentData) => {
    const { data: responseData } = await api.post<{ data: Document }>('/documents', {
      name: data.name,
      type: data.type,
      size: data.size,
      folder_id: data.folder_id,
      created_by: data.created_by,
    })
    return responseData
  },
}
