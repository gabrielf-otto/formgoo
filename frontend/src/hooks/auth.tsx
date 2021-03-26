import { useContext } from 'react';
import { IAuthContext, AuthContext } from '../contexts/auth';


export const useAuth = (): IAuthContext => 
{
   const context = useContext(AuthContext);
   if (!context) 
   {
      throw new Error(
         'useAuth must be used within an AuthProvider'
      );
   }

   return context;
};
