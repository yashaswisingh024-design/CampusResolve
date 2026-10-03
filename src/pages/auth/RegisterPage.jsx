import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { authApi } from '../../api/apiClient';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);
    try {
      const user = await googleLogin(credentialResponse.credential);
      if (user.role === 'ADMIN') {
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const getPasswordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { label: '', color: 'bg-slate-200', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Good', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#2F858E]', width: 'w-full' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authApi.register(formData.name, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7EFE5] p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-[#2F858E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-[#2F858E]" />
          </div>
          <h2 className="text-2xl font-bold text-[#222B33] mb-2">Account Created!</h2>
          <p className="text-slate-600 mb-8 font-medium">Your account has been successfully created. Redirecting you to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#2F858E] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#E7B5A3]/10 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EBCFB7]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F7EFE5]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 text-white shadow-lg">
              <Shield size={24} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Campus<span className="text-[#EBCFB7]">Resolve</span></span>
          </Link>
        </div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">Join the community.<br />Make a <span className="text-[#EBCFB7]">difference.</span></h1>
          <p className="text-lg text-white/80 font-medium">Create an account to report issues, track resolutions, and contribute to a better campus environment.</p>
        </motion.div>
        
        <div className="relative z-10" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F7EFE5] overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md py-8 bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#2F858E] rounded-xl p-2 text-white"><Shield size={24} className="stroke-[2.5]" /></div>
              <span className="font-bold text-2xl tracking-tight text-[#222B33]">Campus<span className="text-[#2F858E]">Resolve</span></span>
            </Link>
          </div>
          
          <h2 className="text-3xl font-bold text-[#222B33] mb-2">Create account</h2>
          <p className="text-slate-500 mb-8 font-medium">Enter your details to get started.</p>
          
          {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100">{error}</motion.div>}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Full name" name="name" placeholder="Alex Johnson" value={formData.name} onChange={handleChange} />
            <Input label="College email" name="email" type="email" placeholder="alex.j@campus.edu" value={formData.email} onChange={handleChange} />
            
            <div className="relative">
              <label className="block text-sm font-bold text-[#222B33] mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#222B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F858E] focus:bg-white transition-all shadow-sm" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2F858E] transition-colors" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password"><EyeOff size={18} /></button>
              </div>
              {formData.password.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full transition-all duration-300 ${getPasswordStrength().color} ${getPasswordStrength().width}`} /></div>
                  <span className={`text-xs font-bold ${formData.password.length < 6 ? 'text-red-500' : 'text-slate-500'}`}>{getPasswordStrength().label}</span>
                </div>
              )}
            </div>
            
            <div className="relative">
              <label className="block text-sm font-bold text-[#222B33] mb-1.5">Confirm password</label>
              <input type="password" name="confirmPassword" className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-[#222B33] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F858E] focus:bg-white transition-all shadow-sm" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            
            <button type="submit" className="w-full h-12 bg-[#222B33] hover:bg-black text-white rounded-xl font-bold text-base mt-6 transition-all shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70" disabled={loading}>
              {loading ? <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />Creating account...</span> : 'Create account'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="border-b border-slate-200 w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-slate-500 font-medium uppercase">Or continue with</span>
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
          
          <p className="mt-8 text-center text-sm text-slate-500 font-medium">Already have an account?{' '}<Link to="/login" className="font-bold text-[#2F858E] hover:text-[#222B33] transition-colors">Sign in</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
