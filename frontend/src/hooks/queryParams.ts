import { useContext } from 'react';
import { QueryParamsContext } from '../contexts/queryParams';


export function useQueryParams<T>(): T 
{
   const context = useContext(QueryParamsContext);
   if (!context) 
   {
      throw new Error(
         'useQueryParams must be used within an QueryParamsProvider'
      );
   }

   return context as T;
}
