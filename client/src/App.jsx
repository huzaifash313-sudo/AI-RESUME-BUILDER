import React, { useEffect, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from './pages/ResumeBuilder';
import Preview from "./pages/Preview"
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, logout, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch()

  const getUserData = useCallback(async () => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      dispatch(setLoading(false))
      return
    }

    try {
      const response = await api.get('/api/users/data', {
        headers: { Authorization: token }
      })

      // Unwrapping API response
      const data = response.data?.data || response.data;

      if (data?.user) {
        dispatch(login({ token, user: data.user }))
      } else {
        dispatch(logout())
      }
    } catch (error) {
      console.error('Session Expired');
      localStorage.removeItem('token')
      dispatch(logout())
    } finally {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (
    <div className="font-poppins selection:bg-green-100 selection:text-green-800">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff',
            fontSize: '14px'
          }
        }}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        {/* Protected Dashboard & Builder */}
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        {/* Tools & Public View */}
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='forgot' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App