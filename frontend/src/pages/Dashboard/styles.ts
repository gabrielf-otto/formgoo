import styled from 'styled-components';
import { Card } from '@material-ui/core';
 

export const FormCard = styled(Card)`
   border: 2px solid transparent;
   transition: border-color .2s;

   &:hover {
      border-color: #7248B9;
   }
`; 

