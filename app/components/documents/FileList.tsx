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

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const FileList = ({ initialFolderId, folderPath = [] }: FileListProps) => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(initialFolderId ?? null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: items = [], error } = useFiles(currentFolderId)
  const createFolder = useCreateFolder()
  const uploadDocument = useUploadDocument()

  useEffect(() => {
    setCurrentFolderId(initialFolderId ?? null)
  }, [initialFolderId])

  const handleFolderClick = useCallback(
    (item: TableItem) => {
      if (item.type === 'folder') {
        setCurrentFolderId(item.id)
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
      await uploadDocument.mutateAsync({
        name: file.name,
        type: file.type,
        size: file.size,
        created_by: 'John Green',
        folder_id: currentFolderId,
      })

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleCreateFolder = async () => {
    try {
      await createFolder.mutateAsync({
        name: 'New Folder',
        created_by: 'John Green',
        parent_id: currentFolderId,
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            cursor: item.type === 'folder' ? 'pointer' : 'default',
          }}
          onClick={() => item.type === 'folder' && handleFolderClick(item)}
        >
          <FontAwesomeIcon
            icon={item.type === 'folder' ? faFolder : faFileLines}
            style={{ color: item.type === 'folder' ? '#4169E1' : '#666' }}
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
      sortable: true,
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
        <Title>Documents</Title>
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
          onChange={e => setSearchTerm(e.target.value)}
        />
      </SearchContainer>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
      />

      <Table data={filteredItems} columns={columns} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Folder">
        <Form onSubmit={handleCreateFolder}>
          <Input type="text" name="name" placeholder="Enter folder name" required autoFocus />
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
