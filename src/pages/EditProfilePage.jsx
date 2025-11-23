import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { userService } from '@/services/userService';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePictureUrl: user?.profilePictureUrl || '',
    bio: user?.bio || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const result = await userService.updateProfile(formData);
    
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

            {error && (
              <div className="bg-red-950/50 border border-red-800 rounded-lg p-4 mb-6">
                <p className="text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm text-neutral-400 block mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 block mb-2">Username</label>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 block mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 block mb-2">Phone Number</label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 block mb-2">Profile Picture URL</label>
                <Input
                  value={formData.profilePictureUrl}
                  onChange={(e) => setFormData({ ...formData, profilePictureUrl: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-neutral-400 block mb-2">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}