// PostActions.jsx - FIXED
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { likeApi } from '@/api/likeApi'; // Import yang benar

export default function PostActions({ post, onLikeUpdate }) {
  const [isLiked, setIsLiked] = useState(post.isLike || false);
  const [likesCount, setLikesCount] = useState(post.totalLikes || 0);
  const [isLoading, setIsLoading] = useState(false);

  // Sync with post prop changes
  useEffect(() => {
    setIsLiked(post.isLike || false);
    setLikesCount(post.totalLikes || 0);
  }, [post]);

  const handleLike = async () => {
    // Prevent double click
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Save previous state for rollback
      const previousIsLiked = isLiked;
      const previousLikesCount = likesCount;
      
      // Optimistically update UI
      const newIsLiked = !previousIsLiked;
      const newLikesCount = newIsLiked 
        ? previousLikesCount + 1 
        : previousLikesCount - 1;
      
      setIsLiked(newIsLiked);
      setLikesCount(newLikesCount);
      
      // Call API to update like
      if (newIsLiked) {
        await likeApi.likePost(post.id);
      } else {
        await likeApi.unlikePost(post.id);
      }
      
      // Or use toggle method:
      // await likeApi.toggleLike(post.id, previousIsLiked);
      
      // Notify parent component about the update
      if (onLikeUpdate) {
        onLikeUpdate(newLikesCount);
      }
      
    } catch (error) {
      console.error('Error toggling like:', error);
      
      // Revert on error
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      
      // Show error message
      alert('Failed to update like. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={isLoading}
            className="p-1 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
            />
          </button>
          
          <button
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Comment on post"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          
          <button
            className="p-1 hover:opacity-80 transition-opacity"
            aria-label="Share post"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <button
          className="p-1 hover:opacity-80 transition-opacity"
          aria-label="Save post"
        >
          <Bookmark className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="text-white">
        <span className="font-medium">{likesCount.toLocaleString()} likes</span>
      </div>
    </div>
  );
}