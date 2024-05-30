import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { addInterceptors } from './axiosApi.ts';
import { persistor, store } from './app/store.ts';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.ts';
import { CssBaseline } from '@mui/material';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </GoogleOAuthProvider>
    </Provider>
);