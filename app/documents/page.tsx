import { Metadata } from 'next'
import { DocumentsContent } from './DocumentsContent'

export const metadata: Metadata = {
  title: 'Documents - DMS',
  description: 'View and manage your documents',
}

export default function DocumentsPage() {
  return <DocumentsContent />
}
