import styled, { keyframes } from 'styled-components'

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
`

export const SpinnerRing = styled.div`
  width: 56px;
  height: 56px;
  border: 4px solid #f3f4f6;
  border-radius: 50%;
  border-top-color: #4169e1;
  animation: ${spin} 0.8s linear infinite;
`
