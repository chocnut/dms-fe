import styled from 'styled-components'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Th = styled.th<{ $sortable?: boolean }>`
  padding: 16px;
  text-align: left;
  background-color: #1e1b4b;
  color: white;
  font-weight: 500;
  font-size: 14px;
  cursor: ${props => (props.$sortable ? 'pointer' : 'default')};
  white-space: nowrap;

  &:first-child {
    padding-left: 32px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    padding-right: 32px;
    border-top-right-radius: 8px;
  }

  &:hover {
    background-color: ${props => (props.$sortable ? '#2e2a5c' : '#1e1b4b')};
  }
`

export const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;

  &:first-child {
    padding-left: 32px;
  }

  &:last-child {
    padding-right: 32px;
  }
`

export const SortIcon = styled.span`
  margin-left: 8px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
`

export const Tr = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1.5px solid #9ca3af;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: #4169e1;
    border-color: #4169e1;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  }

  &:hover {
    border-color: #4169e1;
  }

  &:indeterminate {
    background-color: #4169e1;
    border-color: #4169e1;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M3 8a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z'/%3e%3c/svg%3e");
  }
`

export const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #6b7280;
  font-size: 16px;
  border-radius: 4px;

  &:hover {
    background-color: #f3f4f6;
    color: #4169e1;
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: white;
  border-top: 1px solid #e5e7eb;
`

export const RowsPerPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PageNumber = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.$active ? '#4169e1' : '#e5e7eb')};
  background: ${props => (props.$active ? '#4169e1' : 'white')};
  color: ${props => (props.$active ? 'white' : '#374151')};
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;

  &:hover {
    border-color: #4169e1;
    color: ${props => (props.$active ? 'white' : '#4169e1')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #e5e7eb;
    color: #9ca3af;
    pointer-events: none;
  }
`

export const NavigationButton = styled(PageNumber)`
  min-width: auto;
  white-space: nowrap;
`

export const RowsSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  min-width: 70px;

  &:hover {
    border-color: #4169e1;
  }

  &:focus {
    outline: none;
    border-color: #4169e1;
    box-shadow: 0 0 0 2px rgba(65, 105, 225, 0.1);
  }
`
