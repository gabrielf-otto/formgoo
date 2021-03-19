import React from 'react';
import { Route as DOMRoute, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';


interface IRoute extends RouteProps {
   isPrivate?: boolean;
   component: React.ComponentType
}

const Route: React.FC<IRoute> = ({ isPrivate=false, component: Component, ...props }) => 
{
   const { user } = useAuth();

   return (
      <DOMRoute 
         {...props} 
         render={({ location }) => {
            return isPrivate === !!user? (
               <Component />
            ) : (
               <Redirect 
                  to={{ 
                     pathname: isPrivate? '/signin': '/', 
                     state: { location }
                  }}
               />
            );
         }}
      />
   );
};


export default Route;
