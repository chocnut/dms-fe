import { useState } from 'react'
import styled from 'styled-components'
import { useFolders, useCreateFolder } from '@/hooks/useFolders'
import { Table } from '@/components/common/Table'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Folder } from '@/types/folder'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FolderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: folders = [], isLoading } = useFolders()
  const createFolder = useCreateFolder()

  const columns = [
    { header: 'Name', key: 'name' as keyof Folder },
    { header: 'Created By', key: 'created_by' as keyof Folder },
    {
      header: 'Created At',
      key: 'created_at' as keyof Folder,
      render: (folder: Folder) => new Date(folder.created_at).toLocaleDateString(),
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    await createFolder.mutateAsync({
      name: formData.get('name') as string,
      created_by: 'User',
    })

    setIsModalOpen(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Folder</Button>
      <Table data={folders} columns={columns} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Folder">
        <Form onSubmit={handleSubmit}>
          <Input label="Name" name="name" required />
          <Button type="submit">Create</Button>
        </Form>
      </Modal>
    </div>
  )
}
