import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageIcon, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { validators } from '@/utils/validiator';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    profilePictureUrl: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validators.username(formData.username)) {
      newErrors.username = 'Username must be at least 3 characters and contain only letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validators.email(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validators.password(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validators.phoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await register(formData);

      if (result.success) {
        navigate('/');
      } else {
        setErrors({ submit: result.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'Network error. Please try again.' });
      console.error(
        'Error registering user:',
        err
    );
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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-neutral-400">Join Galleria and start sharing</p>
          </div>

          {/* Error Alert */}
          {errors.submit && (
            <Alert className="mb-6 bg-red-950/50 border-red-800">
              <AlertDescription className="text-red-200">{errors.submit}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className={`bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Username
              </label>
              <Input
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                onKeyPress={handleKeyPress}
                className={`bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 ${
                  errors.username ? 'border-red-500' : ''
                }`}
              />
              {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyPress={handleKeyPress}
                className={`bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            {/* Password */}
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
                  className={`bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 pr-10 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </label>
              <Input
                placeholder="+1234567890"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                onKeyPress={handleKeyPress}
                className={`bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500 ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
              />
              {errors.phoneNumber && <p className="text-red-400 text-xs">{errors.phoneNumber}</p>}
            </div>

            {/* Profile Picture URL (Optional) */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Profile Picture URL (Optional)
              </label>
              <Input
                placeholder="https://example.com/photo.jpg"
                value={formData.profilePictureUrl}
                onChange={(e) => setFormData({ ...formData, profilePictureUrl: e.target.value })}
                onKeyPress={handleKeyPress}
                className="bg-neutral-800/50 border-neutral-700 text-white placeholder:text-neutral-500"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-neutral-900 hover:bg-neutral-100 font-medium py-6 text-base"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="text-neutral-500 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}