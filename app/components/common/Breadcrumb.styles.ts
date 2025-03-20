import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: #666;
  font-size: 0.875rem;
`

export const BreadcrumbItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }
`

export const Separator = styled(FontAwesomeIcon)`
  font-size: 0.75rem;
  color: #999;
`
