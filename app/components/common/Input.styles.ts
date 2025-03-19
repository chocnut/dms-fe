import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Label = styled.label`
  font-size: 14px;
  color: #333;
`

export const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  background-color: white;
  color: #333;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4169e1;
  }

  &:disabled {
    background-color: #f8f9ff;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ff0000;
`
