import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(


  <Provider store={store}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </Provider>
);

