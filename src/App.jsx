
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
import NotFound from './Components/Login/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './Pages/RegisterPage'
import app from './firebase.config'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/forgotPassword' element={<ForgotPasswordPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
    )
  )
  return (
    <>
      <ToastContainer />
      <RouterProvider router={route}/>
    </>
  )
}

export default App
