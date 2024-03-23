import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './assets/main.css'
import Login from './pages/Login'
import Signup from './pages/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>HOLI</div>
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <Signup />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)