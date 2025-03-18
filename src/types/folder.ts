export interface Folder {
  id: number
  name: string
  parent_id: number | null
  created_by: string
  created_at: string
}

export interface FolderResponse {
  status: string
  data: Folder[]
}

export interface SingleFolderResponse {
  status: string
  data: Folder
}
