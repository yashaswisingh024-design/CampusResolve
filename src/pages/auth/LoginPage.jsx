import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../../components/common/Input';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const decodeJwtPayload = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const payload = decodeJwtPayload(credentialResponse.credential);
      const googleEmail = payload?.email || '';

      // Validate @apsit.edu.in domain requirement for student Google accounts
      if (googleEmail && !googleEmail.endsWith('@apsit.edu.in') && !googleEmail.includes('admin')) {
        throw new Error('Google Sign-In is restricted to official @apsit.edu.in student email accounts.');
      }

      const user = await googleLogin(credentialResponse.credential);
      if (user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#F7EFE5]">
      {/* Left side brand banner (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2F858E] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#E7B5A3]/10 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#EBCFB7]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#F7EFE5]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-white shadow-lg">
              <Shield size={24} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Campus<span className="text-[#EBCFB7]">Resolve</span>
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Welcome back to a better <span className="text-[#EBCFB7]">campus.</span>
          </h1>
          <p className="text-lg text-white/80 font-medium">
            Sign in to report issues, track resolutions, and keep your campus infrastructure running smoothly.
          </p>
        </motion.div>

        <div className="relative z-10 text-xs text-white/60 font-medium">
          Official APSIT Campus Resolution Portal
        </div>
      </div>

      {/* Right side form container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-[#F7EFE5]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8 bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100"
        >
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#2F858E] rounded-xl p-2 text-white">
                <Shield size={24} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-[#222B33]">
                Campus<span className="text-[#2F858E]">Resolve</span>
              </span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-[#222B33] mb-2">Sign in</h2>
          <p className="text-slate-500 mb-8 font-medium">Enter your college email and password to access your portal.</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 flex items-start gap-2.5"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@apsit.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-bold text-[#222B33]">Password</label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#222B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F858E] focus:bg-white transition-all shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2F858E] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#222B33] hover:bg-black text-white rounded-xl font-bold text-base mt-6 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="border-b border-slate-200 w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Or continue with</span>
            <span className="border-b border-slate-200 w-1/5 lg:w-1/4"></span>
          </div>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Sign-In failed')}
              useOneTap
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#2F858E] hover:text-[#222B33] transition-colors">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
