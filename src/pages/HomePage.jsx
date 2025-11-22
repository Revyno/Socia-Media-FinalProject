import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/PostCard";
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function HomePage() {
  const { posts, loading } = usePosts('explore');

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="space-y-6">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}