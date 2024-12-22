import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AuthProvider>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </AuthProvider>
    </StrictMode>,
)
