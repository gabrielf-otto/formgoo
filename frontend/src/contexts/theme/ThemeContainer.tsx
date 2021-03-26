import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core'; 
import theme from '../../styles/theme';


const ThemeContainer: React.FC = ({ children }) => (
   <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
   </ThemeProvider>
);


export default ThemeContainer;
