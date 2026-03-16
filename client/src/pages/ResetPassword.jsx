import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { KeyRound, ShieldCheck, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const query = useQuery()
  const token = query.get('token')
  const email = query.get('email')
  
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidRequest, setIsValidRequest] = useState(true)
  
  const navigate = useNavigate()

  useEffect(() => {
    // KHRABI FIX: Validation for URL params to prevent rendering broken form
    if (!token || !email) {
      setIsValidRequest(false)
      toast.error('Invalid or expired reset link')
    }
  }, [token, email])

  const submit = async (e) => {
    e.preventDefault()
    if (password.length < 6) return toast.error('Password must be at least 6 characters')
    if (password !== confirm) return toast.error('Passwords do not match')
    
    setLoading(true)
    try {
      const response = await api.post('/api/users/reset-password', { token, email, password })
      toast.success(response.data?.message || 'Password reset successful!')
      navigate('/app?state=login')
    } catch (err) {
      toast.error(err?.message || 'Reset failed. Link might be expired.')
    } finally {
      setLoading(false)
    }
  }

  if (!isValidRequest) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6'>
        <div className='bg-white p-8 rounded-[2.5rem] shadow-xl text-center max-w-sm w-full border border-slate-100'>
          <AlertCircle size={50} className='text-red-500 mx-auto mb-4' />
          <h2 className='text-xl font-black text-slate-900'>Invalid Link</h2>
          <p className='text-slate-500 text-sm mt-2 mb-6'>The reset link is missing or malformed. Please request a new one.</p>
          <Link to="/" className='text-green-600 font-bold hover:underline italic'>Go back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-poppins'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='flex justify-center mb-8'>
          <img src="/logo.svg" alt="Nexo Logo" className="h-10 w-auto" />
        </div>

        <div className='bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-10 border border-slate-100 animate-in fade-in zoom-in duration-500'>
          <header className='text-center mb-8'>
            <div className='size-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
              <ShieldCheck size={28} />
            </div>
            <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Secure Reset</h2>
            <p className='text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest'>Email: {email}</p>
          </header>

          <form onSubmit={submit} className='space-y-5'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4'>New Password</label>
              <div className='relative'>
                <KeyRound className='absolute left-5 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
                <input 
                  type={showPass ? 'text' : 'password'} 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder='Min. 6 characters' 
                  className='w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-sm font-medium'
                />
                <button 
                  type='button' 
                  onClick={() => setShowPass(!showPass)} 
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors'
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4'>Confirm Password</label>
              <input 
                type='password' 
                required 
                value={confirm} 
                onChange={e => setConfirm(e.target.value)} 
                placeholder='Repeat your new password' 
                className='w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-sm font-medium'
              />
            </div>

            <button 
              disabled={loading} 
              className='w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4'
            >
              {loading ? <Loader2 className='animate-spin size-5' /> : 'UPDATE PASSWORD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword