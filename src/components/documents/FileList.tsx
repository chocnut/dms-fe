import { useState, useRef } from 'react'
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
import { Spinner } from '@/components/common/Spinner'
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

export const FileList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: items = [], isLoading, error } = useFiles()
  const createFolder = useCreateFolder()
  const uploadDocument = useUploadDocument()

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
        folder_id: null,
      })
    } catch (error) {
      console.error('Failed to upload file:', error)
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const columns = [
    {
      header: 'Name',
      key: 'name' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FontAwesomeIcon
            icon={item.type === 'folder' ? faFolder : faFileLines}
            style={{ color: item.type === 'folder' ? '#FFB800' : '#4169E1' }}
          />
          {item.name}
        </div>
      ),
    },
    { header: 'Created by', key: 'created_by' as keyof TableItem, sortable: true },
    {
      header: 'Date',
      key: 'created_at' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) =>
        new Date(item.created_at).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      header: 'File size',
      key: 'size' as keyof TableItem,
      sortable: true,
      render: (item: TableItem) => {
        if (item.type === 'folder') return '-'
        return `${item.size} KB`
      },
    },
  ]

  const handleCreateFolder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string

    try {
      await createFolder.mutateAsync({
        name,
        created_by: 'John Green',
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to create folder:', error)
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

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
          <Button icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setIsModalOpen(true)}>
            Add new folder
          </Button>
        </Actions>
      </Header>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
      />

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
