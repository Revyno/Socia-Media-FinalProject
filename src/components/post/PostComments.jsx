// PostComments.jsx - SIMPLE VERSION FIRST
import { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { commentApi } from '@/api/commentApi';
import { useAuth } from '@/hooks/useAuth';
import { Send, Loader2 } from 'lucide-react';

export default function PostComments({ 
  comments: initialComments = [], 
  postId,
  // currentUserId,
  onCommentAdded 
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentInputRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !postId || !user) return;
    
    try {
      setIsSubmitting(true);
      
      const commentData = {
        postId,
        comment: newComment.trim()
      };

      const response = await commentApi.createComment(commentData);
      
      const newCommentObj = {
        id: response.data?.data?.id || Date.now().toString(),
        text: newComment.trim(),
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          profilePictureUrl: user.profilePictureUrl
        },
        createdAt: new Date().toISOString(),
        userId: user.id
      };

      setComments(prev => [newCommentObj, ...prev]);
      
      if (onCommentAdded) {
        onCommentAdded(newCommentObj);
      }
      
      setNewComment('');
      
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }

    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Input Form */}
      {user && (
        <form onSubmit={handleSubmitComment} className="flex gap-3">
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarImage 
              src={user.profilePictureUrl} 
              alt={user.name}
            />
            <AvatarFallback className="bg-neutral-800 text-neutral-300">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <textarea
              ref={commentInputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white placeholder-neutral-500 resize-none  focus:outline-none focus:border-neutral-600"
              rows={1}
              disabled={isSubmitting}
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-neutral-500">No comments yet</p>
            <p className="text-neutral-400 text-sm mt-1">Be the first to comment!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage 
                  src={comment.user?.profilePictureUrl} 
                  alt={comment.user?.name}
                />
                <AvatarFallback className="bg-neutral-800 text-neutral-300 text-xs">
                  {comment.user?.name?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="bg-neutral-800 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <span className="font-medium text-white">
                        {comment.user?.username || 'Unknown'}
                      </span>
                      <span className="text-neutral-300 ml-2 ">
                        {comment.text}
                      </span>
                    </div>
                  </div>
                  
                  {/* Timestamp */}
                  {comment.createdAt && (
                    <p className="text-neutral-500 text-xs mt-2">
                      {formatDate(comment.createdAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}