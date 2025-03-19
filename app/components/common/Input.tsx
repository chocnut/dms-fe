import { InputWrapper, Label, StyledInput, ErrorMessage } from './Input.styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  )
}
