import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { userApi } from '@/api/userApi';
import { useAuth } from '@/hooks/useAuth';

export default function EditProfileDialog({ open, onOpenChange }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePictureUrl: user?.profilePictureUrl || '',
    bio: user?.bio || '',
  });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await userApi.updateProfile(formData);
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Username"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Input
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Phone Number"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Input
            value={formData.profilePictureUrl}
            onChange={(e) => setFormData({ ...formData, profilePictureUrl: e.target.value })}
            placeholder="Profile Picture URL"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Bio"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <div className="bg-white/10 p-1 rounded-lg">
          <Button onClick={handleUpdate} disabled={loading} className="w-full text-white ">
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}