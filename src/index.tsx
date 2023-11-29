import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './AppRouter';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider>
                    <React.StrictMode>
                        <AppRouter />
                    </React.StrictMode>
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
