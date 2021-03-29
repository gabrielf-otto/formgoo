import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


export interface IQueryParams {
   [key: string]: string;
}

export const QueryParamsContext = createContext({});


export const QueryParamsProvider: React.FC = ({ children }) => 
{
   const [queryParams, setQueryParams] = useState<IQueryParams>({});
   const location = useLocation();

   useEffect(() => {
      const draft = {} as IQueryParams;
      const urlsp = new URLSearchParams(location.search);

      urlsp.forEach((value, key) => {
         draft[key] = value;
      });

      setQueryParams(draft);
   },
   [location]);

   return (
      <QueryParamsContext.Provider value={queryParams}>
         {children}
      </QueryParamsContext.Provider>
   );
};
