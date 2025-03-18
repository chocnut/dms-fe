export type TableItem = {
  id: number | string
  name: string
  type: 'folder' | 'document'
  created_by: string
  created_at: string
  size?: number
}
