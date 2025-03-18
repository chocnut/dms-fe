import { useState } from 'react'
import styled from 'styled-components'
import { Layout } from '@/components/Layout'
import { DocumentList } from '@/components/documents/DocumentList'
import { FolderList } from '@/components/folders/FolderList'
import { Button } from '@/components/common/Button'

const TabContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
`

const ContentContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

type Tab = 'documents' | 'folders'

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('documents')

  return (
    <Layout>
      <TabContainer>
        <Button
          variant={activeTab === 'documents' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </Button>
        <Button
          variant={activeTab === 'folders' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('folders')}
        >
          Folders
        </Button>
      </TabContainer>

      <ContentContainer>
        {activeTab === 'documents' ? <DocumentList /> : <FolderList />}
      </ContentContainer>
    </Layout>
  )
}
