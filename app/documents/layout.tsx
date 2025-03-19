'use client'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
`

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}
