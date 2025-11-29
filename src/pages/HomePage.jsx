// import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCard from '@/components/post/PostCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ImageIcon } from 'lucide-react';

export default function HomePage() {
  const { 
    posts, 
    loading, 
    error, 
    refreshPosts,
    toggleLike,
    deletePost,
    hasMore,
    loadMorePosts
  } = usePosts();

  const handleLike = async (postId, isLiked) => {
    const result = await toggleLike(postId, isLiked);
    if (!result.success) {
      alert('Failed to like post');
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const result = await deletePost(postId);
      if (result.success) {
        alert('Post deleted successfully!');
      } else {
        alert(result.message || 'Failed to delete post');
      }
    }
  };

  const safePosts = Array.isArray(posts) ? posts : [];

  if (loading && safePosts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <ErrorMessage message={error} onRetry={refreshPosts} />
      </div>
    );
  }

  if (safePosts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <EmptyState
          icon={ImageIcon}
          title="No posts yet"
          description="Be the first to share a photo!"
          actionLabel="Refresh"
          onAction={refreshPosts}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="space-y-6">
        {safePosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id, post.isLike)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
        
        {/* Optional: Load More button */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <button
              onClick={loadMorePosts}
              disabled={loading}
              className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}