import { useState } from 'react'
import styled from 'styled-components'
import { useDocuments, useCreateDocument } from '@/hooks/useDocuments'
import { Table } from '@/components/common/Table'
import { Button } from '@/components/common/Button'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/common/Input'
import { Document } from '@/types/document'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DocumentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: documents = [], isLoading } = useDocuments()
  const createDocument = useCreateDocument()

  const columns = [
    { header: 'Name', key: 'name' as keyof Document },
    { header: 'Type', key: 'type' as keyof Document },
    { header: 'Size', key: 'size' as keyof Document },
    { header: 'Created By', key: 'created_by' as keyof Document },
    {
      header: 'Created At',
      key: 'created_at' as keyof Document,
      render: (document: Document) => new Date(document.created_at).toLocaleDateString(),
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    await createDocument.mutateAsync({
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      size: Number(formData.get('size')),
      created_by: 'User',
    })

    setIsModalOpen(false)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Document</Button>
      <Table data={documents} columns={columns} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Document">
        <Form onSubmit={handleSubmit}>
          <Input label="Name" name="name" required />
          <Input label="Type" name="type" required />
          <Input label="Size (KB)" name="size" type="number" required />
          <Button type="submit">Create</Button>
        </Form>
      </Modal>
    </div>
  )
}
