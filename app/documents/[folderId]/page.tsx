import { Metadata } from 'next'
import { FolderContent } from './FolderContent'

interface Props {
  params: {
    folderId: string
  }
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Folder ${params.folderId} - DMS`,
    description: 'View folder contents',
  }
}

export default function FolderPage({ params }: Props) {
  return <FolderContent folderId={parseInt(params.folderId, 10)} />
}
