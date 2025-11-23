import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { postApi } from '@/api/postApi';
import PostCard from '@/components/post/PostCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorMessage from '@/components/common/ErrorMessage';
import { ImageIcon } from 'lucide-react';

export default function HomePage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await postApi.getExplorePosts({ size: 20 });
      if (response.data?.data) {
        setPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <ErrorMessage message={error} onRetry={fetchPosts} />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <EmptyState
          icon={ImageIcon}
          title="No posts yet"
          description="Be the first to share a photo!"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onUpdate={handlePostUpdate}
            onDelete={handlePostDelete}
          />
        ))}
      </div>
    </div>
  );
}