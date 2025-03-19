import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
`

const LoaderRow = styled.div`
  height: 24px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 1.2s linear infinite;
  border-radius: 4px;
`

const LoaderHeader = styled(LoaderRow)`
  width: 200px;
  margin-bottom: 16px;
`

interface LoaderProps {
  rows?: number
}

export const Loader = ({ rows = 5 }: LoaderProps) => {
  return (
    <LoaderContainer>
      <LoaderHeader />
      {Array.from({ length: rows }).map((_, index) => (
        <LoaderRow key={index} style={{ width: `${Math.random() * 40 + 60}%` }} />
      ))}
    </LoaderContainer>
  )
}
