import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../__tests__/test-utils'
import { Input } from '../Input'

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Username" />)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    const { user } = render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalledTimes(4) // One call per character
    expect(input).toHaveValue('test')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('accepts placeholder text', () => {
    render(<Input placeholder="Enter your name" />)
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('renders with all props combined', () => {
    render(
      <Input
        label="Email"
        error="Invalid email"
        placeholder="Enter your email"
        value="test@example.com"
        readOnly
      />
    )

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('test@example.com')
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
  })
})
