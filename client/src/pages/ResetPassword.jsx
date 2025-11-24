import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../configs/api'
import toast from 'react-hot-toast'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const query = useQuery()
  const token = query.get('token')
  const email = query.get('email')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !email) {
      // invalid entry
    }
  }, [token, email])

  const submit = async (e) => {
    e.preventDefault()
    if (password.length < 6) return toast.error('Password must be at least 6 characters')
    if (password !== confirm) return toast.error('Passwords do not match')
    setLoading(true)
    try {
      const { data } = await api.post('/api/users/reset-password', { token, email, password })
      toast.success(data?.message || 'Password reset successful')
      setLoading(false)
      navigate('/app?state=login')
    } catch (err) {
      setLoading(false)
      console.error(err)
      toast.error(err?.response?.data?.message || 'Reset failed')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={submit} className='w-full max-w-md bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
        <p className='text-sm text-gray-600 mb-4'>Set a new password for {email}</p>
        <input type='password' required value={password} onChange={e => setPassword(e.target.value)} placeholder='New password' className='w-full p-3 border rounded mb-4'/>
        <input type='password' required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder='Confirm password' className='w-full p-3 border rounded mb-4'/>
        <button disabled={loading} className='w-full bg-green-600 text-white p-3 rounded'>{loading ? 'Resetting...' : 'Reset Password'}</button>
      </form>
    </div>
  )
}

export default ResetPassword
