import React, { useState } from 'react'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { Copy, ExternalLink, Mail, ArrowLeft, KeyRound } from 'lucide-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetUrl, setResetUrl] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Humne pehle hi api instance mein unwrapping handle ki hui hai
      const response = await api.post('/api/users/forgot-password', { email })
      const data = response.data;
      
      if (data && data.resetUrl) {
        setResetUrl(data.resetUrl)
        toast.success('Reset link generated!')
      } else {
        toast.success(data?.message || 'Check your email for reset instructions')
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (err) {
      toast.error(err?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(resetUrl)
    toast.success('Link copied!')
  }

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center p-6 font-poppins'>
      {/* Decorative Background Blob */}
      <div className='fixed top-0 left-0 w-full h-full overflow-hidden -z-10'>
        <div className='absolute top-[-10%] left-[-10%] size-96 bg-green-200/30 blur-[100px] rounded-full'></div>
        <div className='absolute bottom-[-10%] right-[-10%] size-96 bg-violet-200/30 blur-[100px] rounded-full'></div>
      </div>

      <div className='w-full max-w-md'>
        {/* Logo Section */}
        <div className='flex justify-center mb-8'>
          <img src="/logo.svg" alt="Nexo Logo" className="h-10 w-auto" />
        </div>

        <div className='bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100'>
          {!resetUrl ? (
            <>
              <header className='mb-8 text-center'>
                <div className='size-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <KeyRound size={28} />
                </div>
                <h2 className='text-2xl font-black text-slate-900'>Forgot Password?</h2>
                <p className='text-sm text-slate-500 mt-2'>No worries, we'll help you get back into Nexo.</p>
              </header>

              <form onSubmit={submit} className='space-y-5'>
                <div className='space-y-1.5'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1'>Email Address</label>
                  <div className='relative'>
                    <Mail className='absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400' />
                    <input 
                      type='email' 
                      required 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder='e.g. huzaifa@example.com' 
                      className='w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-sm'
                    />
                  </div>
                </div>

                <button 
                  disabled={loading} 
                  className='w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2'
                >
                  {loading ? 'Processing...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className='animate-in fade-in zoom-in duration-300'>
              <header className='mb-6 text-center'>
                <div className='size-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <ExternalLink size={28} />
                </div>
                <h2 className='text-2xl font-black text-slate-900'>Link Generated</h2>
                <p className='text-sm text-slate-500 mt-2'>Since SMTP is offline, please use this temporary link:</p>
              </header>

              <div className='bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 break-all text-xs font-mono text-slate-600 leading-relaxed'>
                {resetUrl}
              </div>

              <div className='grid grid-cols-1 gap-3'>
                <button onClick={copyLink} className='w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95'>
                  <Copy size={16} /> Copy Link
                </button>
                <a href={resetUrl} target='_blank' rel='noreferrer' className='w-full py-3.5 bg-violet-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-all active:scale-95 shadow-lg shadow-violet-100'>
                  <ExternalLink size={16} /> Open Reset Page
                </a>
              </div>
            </div>
          )}

          {/* Back to Login */}
          <div className='mt-8 pt-6 border-t border-slate-50 text-center'>
            <Link to="/" className='text-sm font-bold text-slate-400 hover:text-green-600 transition-colors inline-flex items-center gap-2'>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword