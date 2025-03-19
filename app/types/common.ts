export interface TableItem {
  id: number
  name: string
  type: 'folder' | 'document'
  created_by: string
  created_at: string
  size?: number
}
