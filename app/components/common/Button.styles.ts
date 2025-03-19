import styled from 'styled-components'

export const StyledButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? `
    color: white;
    background-color: #4169E1;
    border: 1px solid #4169E1;
    &:hover {
      background-color: #3154B4;
      border-color: #3154B4;
    }
  `
      : `
    color: #4169E1;
    background-color: white;
    border: 1px solid #4169E1;
    &:hover {
      background-color: #F8F9FF;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`
