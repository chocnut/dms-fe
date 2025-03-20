'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useFiles } from '@/hooks/useFiles'
import { BreadcrumbContainer, BreadcrumbItem, Separator } from './Breadcrumb.styles'

interface BreadcrumbProps {
  folderPath: string[]
  basePath?: string
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ folderPath, basePath = '/documents' }) => {
  const { data } = useFiles(null, {
    page: 1,
    limit: 100,
    sort: { key: 'created_at', direction: 'desc' },
  })

  const allFolders = data?.data.filter(item => item.type === 'folder') ?? []

  const getFolderName = (folderId: string) => {
    const folder = allFolders.find(f => f.id?.toString() === folderId)
    return folder?.name ?? folderId
  }

  return (
    <BreadcrumbContainer>
      <BreadcrumbItem>
        <Link href={basePath}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </BreadcrumbItem>
      {folderPath.map((folderId, index) => (
        <React.Fragment key={folderId}>
          <Separator icon={faChevronRight} />
          <BreadcrumbItem>
            <Link href={`${basePath}/${folderPath.slice(0, index + 1).join('/')}`}>
              {getFolderName(folderId)}
            </Link>
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  )
}
