import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import GlobalStyle from './styles/global';
import AppProvider from './hooks';
import ThemeContainer from './contexts/theme/ThemeContainer';


const App: React.FC = () => (
	<BrowserRouter>
		<GlobalStyle />
		<ThemeContainer>
			<AppProvider>
				<Routes />
			</AppProvider>
		</ThemeContainer>
	</BrowserRouter>
);


export default App;
