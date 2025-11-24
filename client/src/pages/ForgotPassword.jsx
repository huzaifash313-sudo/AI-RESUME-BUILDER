import React, { useState } from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Copy, ExternalLink } from 'lucide-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetUrl, setResetUrl] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/api/users/forgot-password', { email })
      console.log('Forgot password response:', data)
      
      // If server returned resetUrl (no SMTP), show it to user
      if (data && data.resetUrl) {
        setResetUrl(data.resetUrl)
        toast.success('Reset link generated (SMTP not configured - shown below)')
      } else {
        toast.success(data?.message || 'Reset email sent if account exists')
        setTimeout(() => navigate('/'), 2000)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error('Forgot password error:', err)
      toast.error(err?.response?.data?.message || 'Request failed')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(resetUrl)
    toast.success('Link copied to clipboard')
  }

  if (resetUrl) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='w-full max-w-md bg-white p-6 rounded shadow'>
          <h2 className='text-xl font-semibold mb-4'>Reset Password Link</h2>
          <p className='text-sm text-gray-600 mb-4'>SMTP is not configured. Use the link below to reset your password (valid for 1 hour):</p>
          <div className='bg-gray-100 p-4 rounded mb-4 break-all text-sm'>
            {resetUrl}
          </div>
          <button onClick={copyLink} className='w-full bg-green-600 text-white p-3 rounded mb-2 flex items-center justify-center gap-2'>
            <Copy size={16} /> Copy Link
          </button>
          <a href={resetUrl} target='_blank' rel='noreferrer' className='w-full block bg-blue-600 text-white p-3 rounded text-center flex items-center justify-center gap-2'>
            <ExternalLink size={16} /> Open Reset Page
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={submit} className='w-full max-w-md bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Forgot Password</h2>
        <p className='text-sm text-gray-600 mb-4'>Enter your email, we'll send a reset link.</p>
        <input type='email' required value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='w-full p-3 border rounded mb-4'/>
        <button disabled={loading} className='w-full bg-green-600 text-white p-3 rounded disabled:opacity-50'>{loading ? 'Sending...' : 'Send Reset Link'}</button>
      </form>
    </div>
  )
}

export default ForgotPassword
