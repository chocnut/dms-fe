'use client'

import { useParams } from 'next/navigation'
import { FileList } from '@/components/documents/FileList'

export default function DocumentsPage() {
  const params = useParams()
  const path = params.path as string[]
  const currentFolderId = path ? parseInt(path[path.length - 1], 10) : null

  return <FileList initialFolderId={currentFolderId} folderPath={path} />
}
