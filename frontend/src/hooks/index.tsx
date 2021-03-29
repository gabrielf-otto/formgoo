import React from 'react';
import { AuthProvider } from '../contexts/auth';
import { QueryParamsProvider } from '../contexts/queryParams';


const AppProvider: React.FC = ({ children }) => (
   <QueryParamsProvider>
      <AuthProvider>
         {children}
      </AuthProvider>
   </QueryParamsProvider>
);


export default AppProvider;
