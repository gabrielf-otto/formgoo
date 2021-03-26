import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
   ::-webkit-scrollbar-track {
      background-color: #F4F4F4;
   }
   ::-webkit-scrollbar {
      width: 6px;
      background: #F4F4F4;
   }
   ::-webkit-scrollbar-thumb {
      background: #dad7d7;
      border-radius: 3px;
   }

   a {
      text-decoration: none;
      color: inherit;
   }

   input.MuiFilledInput-input {
      padding: 15px;
   }

`;
