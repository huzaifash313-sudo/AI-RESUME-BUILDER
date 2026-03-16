import { Lock, Mail, User2Icon, ArrowRight, Loader2 } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// PATH FIX: Agar file src/pages/Login.jsx hai, to features tak rasta ye hoga:
import { login } from '../app/features/authSlice'; 
// PATH FIX: Agar api config src/configs/api.js mein hai:
import api from '../configs/api';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get('state');

  const [state, setState] = React.useState(urlState || "login");
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (state === "login") {
        response = await api.post('/api/users/login', {
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await api.post('/api/users/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      // Interceptor unwrap logic
      const payload = response?.data; 
      const token = payload?.token;
      const user = payload?.user;

      if (!token) throw new Error('Authentication failed: No token returned');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login({ token, user }));

      toast.success(state === "login" ? `Welcome back, ${user.name}!` : "Welcome to Nexo!");
      
      // ✅ DASHBOARD NAVIGATION
      navigate('/app');

    } catch (error) {
      toast.error(error?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-poppins'>
      {/* Branding */}
      <Link to="/" className="mb-10">
        <img src="/logo.svg" alt="Nexo Logo" className="h-10 w-auto" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-10 border border-slate-100 animate-in fade-in zoom-in duration-500">
        <header className="text-center mb-8">
          <h1 className="text-slate-900 text-3xl font-black tracking-tight">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            {state === "login" ? "Build your career with Nexo AI" : "Join 10,000+ professionals today"}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state !== "login" && (
            <div className="group space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-poppins">Full Name</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 h-14 rounded-2xl px-5 gap-3 focus-within:ring-4 focus-within:ring-green-500/10 focus-within:border-green-500 focus-within:bg-white transition-all">
                <User2Icon size={18} className="text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="bg-transparent border-none outline-none flex-1 text-sm font-medium text-slate-700"
                  value={formData.name}
                  onChange={handleChange}
                  required={state !== "login"}
                />
              </div>
            </div>
          )}

          <div className="group space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-poppins">Email Address</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 h-14 rounded-2xl px-5 gap-3 focus-within:ring-4 focus-within:ring-green-500/10 focus-within:border-green-500 focus-within:bg-white transition-all">
              <Mail size={18} className="text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                className="bg-transparent border-none outline-none flex-1 text-sm font-medium text-slate-700"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="group space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 font-poppins">Password</label>
            <div className="flex items-center bg-slate-50 border border-slate-200 h-14 rounded-2xl px-5 gap-3 focus-within:ring-4 focus-within:ring-green-500/10 focus-within:border-green-500 focus-within:bg-white transition-all">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-transparent border-none outline-none flex-1 text-sm font-medium text-slate-700"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {state === "login" && (
            <div className="text-right px-2">
              <Link to="/forgot" className="text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 mt-4 rounded-2xl text-white bg-green-600 font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin size-5" /> : (state === "login" ? "Login" : "Create Account")}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <footer className="text-center mt-8">
          <button
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-slate-500 text-sm font-medium hover:text-slate-800 transition-colors"
          >
            {state === "login" ? "Don't have an account?" : "Already a member?"}{" "}
            <span className="text-green-600 font-bold ml-1">
              {state === "login" ? "Join Nexo" : "Sign in here"}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Login;