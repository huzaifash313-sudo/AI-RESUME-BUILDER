import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from "../app/features/authSlice";
import { LogOut, User, ArrowRight } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className='sticky top-0 z-[100] border-b border-slate-100 bg-white/80 backdrop-blur-md'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-6 py-3 text-slate-800 transition-all'>
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="Nexo AI logo" className="h-9 w-auto" />
        </Link>

        {user ? (
          // Jab user Logged In ho
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 max-sm:hidden'>
              <div className='size-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xs border border-green-200'>
                {user.name?.charAt(0).toUpperCase() || <User size={14} />}
              </div>
              <p className='text-sm font-semibold text-slate-600 tracking-tight'>
                {user.name}
              </p>
            </div>

            <button
              onClick={logoutUser}
              className='group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-all'
            >
              <span>Logout</span>
              <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          // KHRABI FIX: Jab user Logged In NA HO (Login Button)
          <div className='flex items-center gap-4'>
            <Link 
              to="/app" 
              className='flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95'
            >
              Sign In <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar