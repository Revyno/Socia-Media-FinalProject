import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
import { postApi } from '@/api/endpoints/postApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';

export default function CreatePostDialog({ onPostCreated }) {
//   const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle image URL change with preview
  const handleImageUrlChange = (url) => {
    setImageUrl(url);
    setImagePreview(url);
    setError(''); // Clear error when user types
  };

  // Validate image URL
  const validateImageUrl = () => {
    if (!imageUrl.trim()) {
      setError('Please provide an image URL');
      return false;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch (error) {
      console.error('Invalid URL:', error);
      setError('Please provide a valid URL');
      return false;
    }

    // Check if URL ends with image extension
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => 
      imageUrl.toLowerCase().includes(ext)
    );

    if (!hasImageExtension) {
      setError('URL must point to an image file (.jpg, .png, .gif, etc.)');
      return false;
    }

    return true;
  };

  // Handle create post
  const handleCreate = async () => {
    if (!validateImageUrl()) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await postApi.createPost({
        imageUrl: imageUrl.trim(),
        caption: caption.trim() || undefined,
      });

      if (response.data?.data) {
        setSuccess(true);
        
        // Call callback if provided
        if (onPostCreated) {
          onPostCreated(response.data.data);
        }

        // Reset form after short delay
        setTimeout(() => {
          resetForm();
          setOpen(false);
        }, 1500);
      } else {
        setError(response.data?.message || 'Failed to create post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setCaption('');
    setImageUrl('');
    setImagePreview('');
    setError('');
    setSuccess(false);
  };

  // Handle dialog close
  const handleOpenChange = (newOpen) => {
    if (!newOpen && !loading) {
      resetForm();
    }
    setOpen(newOpen);
  };

  // Handle image load error
  const handleImageError = () => {
    setImagePreview('');
    setError('Failed to load image. Please check the URL.');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-white text-neutral-900 hover:bg-neutral-100">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Create New Post
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Error Alert */}
          {error && (
            <Alert className="bg-red-950/50 border-red-800">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="bg-green-950/50 border-green-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <AlertDescription className="text-green-200">
                  Post created successfully!
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Image URL Input */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-400 font-medium">
              Image URL <span className="text-red-400">*</span>
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              disabled={loading || success}
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
            />
            <p className="text-xs text-neutral-500">
              Paste a direct link to an image (jpg, png, gif, webp, svg)
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="space-y-2">
              <label className="text-sm text-neutral-400 font-medium">Preview</label>
              <div className="relative aspect-square w-full bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <button
                  onClick={() => {
                    setImageUrl('');
                    setImagePreview('');
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black/90 rounded-full transition-colors"
                  disabled={loading || success}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Caption Input */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-400 font-medium">
              Caption <span className="text-neutral-500">(optional)</span>
            </label>
            <Textarea
              placeholder="Write a caption for your photo..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={loading || success}
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="flex items-center justify-between text-xs">
              <p className="text-neutral-500">
                Add context to your photo
              </p>
              <p className="text-neutral-500">
                {caption.length}/500
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleCreate}
              disabled={loading || success || !imageUrl.trim()}
              className="flex-1 bg-white text-neutral-900 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : success ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Created!
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Post
                </>
              )}
            </Button>

            <Button
              onClick={() => handleOpenChange(false)}
              disabled={loading}
              variant="outline"
              className="bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}