'use client'

import { FileList } from '@/components/documents/FileList'
import { useFiles } from '@/hooks/useFiles'
import { Spinner } from '@/components/common/Spinner'

export function DocumentsContent() {
  const { isLoading } = useFiles(null)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Spinner />
      </div>
    )
  }

  return <FileList initialFolderId={null} />
}
