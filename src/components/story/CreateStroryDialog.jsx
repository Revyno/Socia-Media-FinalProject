import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { storyApi } from '@/api/storyApi';

export default function CreateStoryDialog({ open, onOpenChange, onSuccess }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!imageUrl) return;
    
    setLoading(true);
    try {
      await storyApi.createStory({ imageUrl });
      onSuccess?.();
      onOpenChange(false);
      setImageUrl('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Create Story</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Button onClick={handleCreate} disabled={loading || !imageUrl} className="w-full">
            {loading ? 'Creating...' : 'Create Story'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}