import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './assets/main.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AutoLogin from './components/AutoLogin'
import store from './store/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AutoLogin />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: 'c',
    element: <>This is the channel view</>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
