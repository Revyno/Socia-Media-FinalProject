import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageIcon, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log('Login data:', formData);
    setError('');
    
    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      console.log('Login result:', result);

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Username Or Password is incorrect.');
      console.log('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-neutral-900/80 backdrop-blur-xl border-neutral-800 shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-neutral-800 rounded-2xl mb-4">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-neutral-400">Sign in to continue to Social media</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 bg-red-950/50 border-red-800">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyPress={handleKeyPress}
                className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-600"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-neutral-600 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-neutral-900 hover:bg-neutral-100 font-medium py-6 text-base"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <button className="text-neutral-400 hover:text-white text-sm transition-colors">
              Forgot password?
            </button>
            <div className="text-neutral-500 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-white hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <p className="text-xs text-neutral-400 mb-2">Demo Account:</p>
            <p className="text-xs text-neutral-300">Email: vihe@gmail.com</p>
            <p className="text-xs text-neutral-300">Password: qwerty123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}