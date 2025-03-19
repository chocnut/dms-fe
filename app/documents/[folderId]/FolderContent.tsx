'use client'

import { FileList } from '@/components/documents/FileList'

interface FolderContentProps {
  folderId: number
}

export function FolderContent({ folderId }: FolderContentProps) {
  return <FileList initialFolderId={folderId} />
}
