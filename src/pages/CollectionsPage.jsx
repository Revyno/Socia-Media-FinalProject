import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { postApi } from '@/api/postApi';
import { Card } from '@/components/ui/card';
import PostGrid from '@/components/post/PostGrid';
import PostDetail from '@/components/post/PostDetail';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { ImageIcon, Heart, Bookmark } from 'lucide-react';

export default function CollectionsPage() {
  const { token } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, [token]);

  const fetchMyPosts = async () => {
    try {
      const response = await postApi.getMyPosts({ size: 100 });
      if (response.data?.data) {
        setMyPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const likedPosts = myPosts.filter(post => post.isLike);

  const categories = [
    {
      id: 'all',
      name: 'All Photos',
      count: myPosts.length,
      image: myPosts[0]?.imageUrl,
      icon: ImageIcon,
    },
    {
      id: 'liked',
      name: 'Liked Photos',
      count: likedPosts.length,
      image: likedPosts[0]?.imageUrl,
      icon: Heart,
    },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">My Collections</h2>
          <p className="text-neutral-400">Organize your photos into collections</p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="bg-neutral-900 border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors cursor-pointer group"
            >
              <div className="relative h-48">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <category.icon className="w-12 h-12 text-neutral-600" />
                  </div>
                )}
                <div className="absolute inset-0 from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <category.icon className="w-5 h-5 text-white" />
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                  <p className="text-neutral-300 text-sm">{category.count} photos</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* All Photos Grid */}
        {myPosts.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No photos yet"
            description="Start sharing your moments with the world"
          />
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">All My Photos</h3>
            <PostGrid posts={myPosts} onPostClick={setSelectedPost} />
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <PostDetail
            open={!!selectedPost}
            onOpenChange={() => setSelectedPost(null)}
            post={selectedPost}
          />
        )}
      </div>
    </div>
  );
}