'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFolder,
  faFileLines,
  faUpload,
  faPlus,
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { useFiles, useCreateFolder } from '@/hooks/useFiles'
import { useUploadDocument } from '@/hooks/useDocuments'
import { Table } from '@/components/common/Table'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { TableItem } from '@/types/common'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: #4169e1;
  }
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
`

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  padding-left: 40px;
  padding-right: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;
  color: #333;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #4169e1;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background-color: #f3f4f6;
    color: #4169e1;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const HiddenInput = styled.input`
  display: none;
`

interface FileListProps {
  initialFolderId?: number | null
  folderPath?: string[]
}

type SortableKeys = 'name' | 'type' | 'size' | 'created_at'

interface SortConfig {
  key: SortableKeys
  direction: 'asc' | 'desc'
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

export const FileList = ({ initialFolderId, folderPath = [] }: FileListProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [folderName, setFolderName] = useState('')
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(initialFolderId ?? null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setCurrentFolderId(initialFolderId ?? null)
    setCurrentPage(1)
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }, [initialFolderId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data, error } = useFiles(currentFolderId, {
    page: currentPage,
    limit: rowsPerPage,
    search: debouncedSearchTerm,
    sort: sortConfig,
  })

  const createFolder = useCreateFolder()
  const uploadDocument = useUploadDocument()

  const items = data?.data ?? []
  const pagination = data?.pagination

  const handleFolderClick = useCallback(
    (item: TableItem) => {
      if (item.type === 'folder') {
        const newPath = [...folderPath]
        if (item.id !== null) {
          newPath.push(item.id.toString())
        }
        router.push(`/documents/${newPath.join('/')}`)
      }
    },
    [router, folderPath]
  )

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const documentTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
      ]

      const fileNames = [
        'report',
        'document',
        'presentation',
        'spreadsheet',
        'image',
        'contract',
        'invoice',
        'proposal',
        'meeting_notes',
        'budget',
        'analysis',
        'summary',
        'plan',
        'review',
        'checklist',
      ]

      const type = getRandomElement(documentTypes)
      const extension = type.split('/')[1]
      const baseName = getRandomElement(fileNames)
      const randomNumber = Math.floor(Math.random() * 1000)
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 365))

      const randomDocument = {
        name: `${baseName}_${randomNumber}.${extension}`,
        type,
        size: Math.floor(Math.random() * (10485760 - 1024 + 1)) + 1024,
        created_by: 'John Green',
        folder_id: currentFolderId,
      }

      await uploadDocument.mutateAsync(randomDocument)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createFolder.mutateAsync({
        name: folderName,
        created_by: 'John Green',
        parent_id: currentFolderId,
      })
      setIsModalOpen(false)
      setFolderName('')
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setCurrentPage(1)
  }

  const handleSort = (key: keyof TableItem) => {
    if (key === 'name' || key === 'type' || key === 'size' || key === 'created_at') {
      setSortConfig(prevConfig => ({
        key: key as SortConfig['key'],
        direction:
          prevConfig.key === key ? (prevConfig.direction === 'asc' ? 'desc' : 'asc') : 'asc',
      }))
      setCurrentPage(1)
    }
  }

  const displayedItems = items

  const columns = [
    {
      header: 'Name',
      key: 'name' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (item.type === 'folder') {
              handleFolderClick(item)
            } else {
              router.push('/documents')
            }
          }}
        >
          <FontAwesomeIcon
            icon={item.type === 'folder' ? faFolder : faFileLines}
            style={{ color: item.type === 'folder' ? '#FFB800' : '#4169E1' }}
          />
          {item.name}
        </div>
      ),
    },
    {
      header: 'Type',
      key: 'type' as keyof TableItem,
      sortable: true,
    },
    {
      header: 'Size',
      key: 'size' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) => (item.size ? formatFileSize(item.size) : '-'),
    },
    {
      header: 'Created By',
      key: 'created_by' as keyof TableItem,
      sortable: false,
      render: (item: TableItem) => item.created_by,
    },
    {
      header: 'Created At',
      key: 'created_at' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) =>
        new Date(item.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
    },
  ]

  if (error) {
    return (
      <Container>
        <div
          style={{
            padding: '32px',
            color: '#EF4444',
            backgroundColor: 'white',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          Error loading documents and folders. Please try again later.
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <Title onClick={() => router.push('/documents')}>Documents</Title>
        <Actions>
          <Button
            variant="outline"
            icon={<FontAwesomeIcon icon={faUpload} />}
            onClick={handleUploadClick}
            disabled={uploadDocument.isPending}
          >
            {uploadDocument.isPending ? 'Uploading...' : 'Upload files'}
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setIsModalOpen(true)}
            variant="primary"
          >
            Add new folder
          </Button>
        </Actions>
      </Header>

      <SearchContainer>
        <SearchIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search files and folders"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <ClearButton onClick={handleClearSearch} type="button">
            <FontAwesomeIcon icon={faXmark} />
          </ClearButton>
        )}
      </SearchContainer>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        data-testid="file-input"
        onChange={handleFileChange}
        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
      />

      <Table
        data={displayedItems}
        columns={columns}
        page={currentPage}
        totalPages={pagination?.totalPages || 1}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        sortKey={sortConfig.key}
        sortDirection={sortConfig.direction}
        onSort={handleSort as (key: keyof TableItem) => void}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Folder">
        <Form onSubmit={handleCreateFolder}>
          <Input
            type="text"
            name="name"
            placeholder="Enter folder name"
            required
            autoFocus
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={createFolder.isPending}
            style={{ width: '100%' }}
          >
            {createFolder.isPending ? 'Creating...' : 'Create Folder'}
          </Button>
        </Form>
      </Modal>
    </Container>
  )
}
