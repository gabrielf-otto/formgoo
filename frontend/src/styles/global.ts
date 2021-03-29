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

   div.MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-formControl.MuiInputBase-multiline.MuiFilledInput-multiline {
      padding: 15px;
   }

   a {
      text-decoration: none;
      color: inherit;
   }

   body {
      padding-bottom: 100px;
   }

`;
