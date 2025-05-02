import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage, LoginPage, SignupPage, NotificationsPage, OnboardingPage, ChatPage, CallPage } from './pages/index.js'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import App from './App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AuthProtectedRoute from './AuthProtectedRoute.jsx';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProtectedRoute> <HomePage /></ProtectedRoute> },
      { path: '/login', element: <AuthProtectedRoute><LoginPage /></AuthProtectedRoute> },
      { path: '/signup', element: <AuthProtectedRoute><SignupPage /></AuthProtectedRoute> },
      { path: '/notifications', element: <ProtectedRoute><NotificationsPage /></ProtectedRoute> },
      { path: '/onboarding', element: <ProtectedRoute><OnboardingPage /></ProtectedRoute> },
      { path: '/chat', element: <ProtectedRoute><ChatPage /></ProtectedRoute> },
      { path: '/call', element: <ProtectedRoute><CallPage /></ProtectedRoute> },
    ],
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
