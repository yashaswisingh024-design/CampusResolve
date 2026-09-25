import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { label: '', color: 'bg-slate-200', width: 'w-0' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10) return { label: 'Good', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
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
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Email might already be in use.');
      }

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Server error occurred');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
          <p className="text-slate-600 mb-8">Your account has been successfully created. Redirecting you to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.2),transparent_50%)]"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-accent rounded-lg p-2 text-white">
              <Shield size={24} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              Campus<span className="text-primary-accent">Resolve</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Join the community. Make a difference.
          </h1>
          <p className="text-lg text-slate-400">
            Create an account to report issues, track resolutions, and contribute to a better campus environment.
          </p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-accent rounded-lg p-2 text-white">
                <Shield size={24} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">
                Campus<span className="text-primary-accent">Resolve</span>
              </span>
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">Create account</h2>
          <p className="text-slate-500 mb-8">Enter your details to get started.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              name="name"
              placeholder="Alex Johnson"
              value={formData.name}
              onChange={handleChange}
            />
            
            <Input
              label="College email"
              name="email"
              type="email"
              placeholder="alex.j@campus.edu"
              value={formData.email}
              onChange={handleChange}
            />
            
            <div className="relative pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all shadow-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {formData.password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${getPasswordStrength().color} ${getPasswordStrength().width}`}></div>
                  </div>
                  <span className={`text-xs font-medium ${formData.password.length < 6 ? 'text-red-500' : 'text-slate-500'}`}>
                    {getPasswordStrength().label}
                  </span>
                </div>
              )}
            </div>

            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full h-11 text-base mt-4" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Creating account...
                </span>
              ) : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-accent hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
