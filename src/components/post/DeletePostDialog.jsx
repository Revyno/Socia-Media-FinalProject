import { useState } from 'react';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { postApi } from '@/api/postApi';

export default function DeletePostDialog({ open, onOpenChange, postId, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await postApi.deletePost(postId);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Post"
      description="Are you sure you want to delete this post? This action cannot be undone."
      onConfirm={handleDelete}
      confirmText={loading ? 'Deleting...' : 'Delete'}
    />
  );
}