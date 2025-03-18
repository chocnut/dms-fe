import styled from 'styled-components'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  icon?: React.ReactNode
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
    color: #4169E1;
    border: 1px solid #4169E1;
    &:hover {
      background-color: #F8F9FF;
    }
  `
      : `
    color: #4169E1;
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

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
`

export const Button = ({ children, icon, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  )
}
