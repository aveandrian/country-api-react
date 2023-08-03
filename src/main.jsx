import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Country from './pages/Country.jsx';
import { loader as CountryLoader } from './pages/Country.jsx';
import { loader as HomeLoader } from './pages/Home.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ":countryName",
        element: <Country />,
        loader: CountryLoader
      },
    ],
  },
  
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
