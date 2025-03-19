import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  cursor: pointer;

  &:hover {
    color: #4169e1;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 12px;
`

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  padding-left: 40px;
  padding-right: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;
  color: #333;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #4169e1;
  }
`

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    background-color: #f3f4f6;
    color: #4169e1;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const HiddenInput = styled.input`
  display: none;
`
