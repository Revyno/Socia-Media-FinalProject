import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { postApi } from '@/api/endpoints/postApi';

export default function EditPostDialog({ open, onOpenChange, post, onSuccess }) {
  const [caption, setCaption] = useState(post?.caption || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await postApi.updatePost(post.id, { caption, imageUrl });
      onSuccess?.();
      onOpenChange(false);
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
          <DialogTitle className="text-white">Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          <Button onClick={handleUpdate} disabled={loading} className="w-full">
            {loading ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}