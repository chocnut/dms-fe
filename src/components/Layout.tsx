import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`

const Header = styled.header`
  margin-bottom: 32px;
`

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`

const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`

interface LayoutProps {
  children: React.ReactNode
  actions?: React.ReactNode
}

export const Layout = ({ children, actions }: LayoutProps) => {
  return (
    <Container>
      <Header>
        <Title>Document Management System</Title>
        {actions && <ActionBar>{actions}</ActionBar>}
      </Header>
      {children}
    </Container>
  )
}
