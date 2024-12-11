import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'white', // Change this to the color you want (e.g., blue.900 or a hex code)
        color: 'white', // Set text color to ensure readability
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);
