export interface Document {
  id: number
  name: string
  type: string
  size: number
  folder_id: number | null
  created_by: string
  created_at: string
}

export interface DocumentResponse {
  status: string
  data: Document[]
}

export interface SingleDocumentResponse {
  status: string
  data: Document
}
