import { StyledButton, IconWrapper } from './Button.styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  icon?: React.ReactNode
}

export const Button = ({ children, icon, variant, ...props }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  )
}
