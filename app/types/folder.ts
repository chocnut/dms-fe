export interface Folder {
  id: number
  name: string
  parent_id: number | null
  created_by: string
  created_at: string
}

export type CreateFolder = {
  name: string
  parent_id?: number
  created_by: string
}

export interface FolderResponse {
  status: string
  data: Folder[]
}

export interface SingleFolderResponse {
  status: string
  data: Folder
}
