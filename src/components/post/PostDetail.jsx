// PostDetail.jsx - FIXED WITH PROPER DYNAMIC IMPORT
import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import PostActions from './PostActions';
import { useAuth } from '@/hooks/useAuth';

// Dynamic import dengan React.lazy() - CORRECT WAY
const PostComments = lazy(() => 
  import('./PostComments')
    .then(module => ({ default: module.default }))
    .catch(error => {
      console.warn('PostComments component failed to load:', error);
      // Return a fallback component
      return { 
        default: () => (
          <div className="p-4 text-center text-neutral-500">
            Comments feature is temporarily unavailable
          </div>
        )
      };
    })
);

// Atau lebih sederhana:
// const PostComments = lazy(() => import('./PostComments'));

// Fallback component saat loading
const CommentsFallback = () => (
  <div className="p-4">
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
      <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
    </div>
  </div>
);

export default function PostDetail({ open, onOpenChange, post }) {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [localPost, setLocalPost] = useState(post);
  
  // Update localPost ketika prop post berubah
  useEffect(() => {
    if (post && post.id !== localPost?.id) {
      setLocalPost(post);
      setImageError(false);
      setImageLoading(true);
    }
  }, [post, localPost?.id]);
  
  // Fungsi untuk update likes
  const handleLikeUpdate = useCallback((newLikes) => {
    setLocalPost(prev => prev ? {
      ...prev,
      totalLikes: newLikes,
      isLike: newLikes > (prev.totalLikes || 0) 
        ? true 
        : (newLikes < (prev.totalLikes || 0) ? false : prev.isLike)
    } : prev);
  }, []);
  
  // Fungsi untuk update comments
  const handleCommentAdded = useCallback((newComment) => {
    setLocalPost(prev => {
      if (!prev) return prev;
      
      const updatedComments = prev.comments 
        ? [newComment, ...prev.comments]
        : [newComment];
      
      return {
        ...prev,
        comments: updatedComments,
        totalComments: (prev.totalComments || 0) + 1
      };
    });
  }, []);
  
  if (!localPost) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 max-w-4xl p-0 overflow-hidden max-h-[90vh] md:max-h-[95vh]">
        {/* Accessibility Elements */}
        <DialogTitle className="sr-only">
          Post Detail - {localPost.caption || 'Image post'}
        </DialogTitle>
        
        <DialogDescription className="sr-only">
          Viewing detailed information about a post by {localPost.user?.name || 'user'}
        </DialogDescription>
        
        <div className="grid md:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative bg-neutral-900 min-h-[300px] md:min-h-0 md:h-full">
            {imageLoading && !imageError && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-neutral-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-neutral-500 text-sm">Loading image...</p>
                </div>
              </div>
            )}
            
            {imageError && (
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-6">
                <div className="text-5xl mb-4">📷</div>
                <p className="text-neutral-300 font-medium mb-2">Image unavailable</p>
              </div>
            )}
            
            <img 
              src={localPost.imageUrl} 
              alt={localPost.caption || `Photo by ${localPost.user?.name || 'user'}`}
              className={`
                w-full h-full object-contain md:object-cover
                ${imageLoading || imageError ? 'opacity-0' : 'opacity-100'}
                transition-opacity duration-300
                bg-neutral-900
              `}
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
              }}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
            
            {/* Close Button */}
            <button
              onClick={() => onOpenChange?.(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col h-full md:max-h-[95vh]">
            {/* User Info Header */}
            <div className="flex items-center gap-3 p-4 border-b border-neutral-800">
              <Avatar className="w-10 h-10">
                <AvatarImage 
                  src={localPost.user?.profilePictureUrl} 
                  alt={`Profile of ${localPost.user?.name || 'user'}`}
                />
                <AvatarFallback className="bg-neutral-800 text-neutral-300">
                  {localPost.user?.name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-white font-medium">{localPost.user?.name || 'Unknown User'}</p>
                <p className="text-neutral-400 text-sm">
                  @{localPost.user?.username || 'user'}
                </p>
              </div>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Caption Section */}
              {localPost.caption && (
                <div className="mb-6 pb-6 border-b border-neutral-800">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage 
                        src={localPost.user?.profilePictureUrl} 
                        alt={`Profile of ${localPost.user?.name || 'user'}`}
                      />
                      <AvatarFallback className="bg-neutral-800 text-neutral-300 text-xs">
                        {localPost.user?.name?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium mr-2">
                          {localPost.user?.username || 'user'}
                        </span>
                        <span className="text-neutral-300">{localPost.caption}</span>
                      </p>
                      
                      {/* Post Stats */}
                      <div className="flex items-center gap-4 mt-3 text-neutral-500 text-sm">
                        {localPost.totalLikes !== undefined && (
                          <span>{localPost.totalLikes.toLocaleString()} likes</span>
                        )}
                        {localPost.totalComments !== undefined && (
                          <span>{localPost.totalComments.toLocaleString()} comments</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Comments Section dengan Suspense */}
              <div className="pt-4">
                <Suspense fallback={<CommentsFallback />}>
                  <PostComments 
                    comments={localPost.comments || []} 
                    postId={localPost.id}
                    currentUserId={user?.id}
                    onCommentAdded={handleCommentAdded}
                  />
                </Suspense>
              </div>
            </div>
            
            {/* Fixed Actions Footer */}
            <div className="border-t border-neutral-800 p-4 bg-neutral-900">
              <PostActions 
                post={localPost} 
                onLikeUpdate={handleLikeUpdate}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}