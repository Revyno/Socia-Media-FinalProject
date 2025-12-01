// CollectionsPage.jsx
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
  const { user, token } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyPosts();
    }
  }, [user, token]);

  const fetchMyPosts = async () => {
    try {
      const userId = user?.id;
      
      if (!userId) {
        console.error('User ID not found');
        setMyPosts([]);
        setLoading(false);
        return;
      }

      console.log('Fetching posts for user:', userId);
      
      // Coba getMyPosts terlebih dahulu (fungsi yang tersedia)
      try {
        const response = await postApi.getMyPosts({ size: 10, page: 1 });
        console.log('getMyPosts response:', response);
        
        // Handle berbagai struktur response dengan lebih robust
        let postsData = [];
        
        if (response.data?.data && Array.isArray(response.data.data)) {
          postsData = response.data.data;
        } else if (response.data?.posts && Array.isArray(response.data.posts)) {
          postsData = response.data.posts;
        } else if (Array.isArray(response.data)) {
          postsData = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // Coba ekstrak array dari object
          const possibleArrays = Object.values(response.data).find(val => Array.isArray(val));
          if (possibleArrays) {
            postsData = possibleArrays;
          }
        }
        
        console.log('Extracted posts data:', postsData);
        setMyPosts(Array.isArray(postsData) ? postsData : []);
        
      } catch (myPostsError) {
        console.log('getMyPosts failed, trying getExplorePosts:', myPostsError);
        
        // Fallback ke getExplorePosts
        try {
          const exploreResponse = await postApi.getExplorePosts({ size: 10, page: 1 });
          console.log('Explore posts response:', exploreResponse);
          
          let exploreData = [];
          if (exploreResponse.data?.data && Array.isArray(exploreResponse.data.data)) {
            exploreData = exploreResponse.data.data;
          } else if (Array.isArray(exploreResponse.data)) {
            exploreData = exploreResponse.data;
          }
          
          setMyPosts(Array.isArray(exploreData) ? exploreData : []);
        } catch (exploreError) {
          console.error('Explore posts also failed:', exploreError);
          setMyPosts([]);
        }
      }
      
    } catch (err) {
      console.error('All post fetching methods failed:', err);
      setMyPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Pastikan myPosts selalu array sebelum di-filter
  const safeMyPosts = Array.isArray(myPosts) ? myPosts : [];
  const likedPosts = safeMyPosts.filter(post => post && post.isLike);

  const categories = [
    {
      id: 'all',
      name: 'All Photos',
      count: safeMyPosts.length,
      image: safeMyPosts[0]?.imageUrl,
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
                <div className="absolute inset-0  from-black/80 to-transparent" />
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
        {safeMyPosts.length === 0 ? (
          <EmptyState
            icon={ImageIcon}
            title="No photos yet"
            description="Start sharing your moments with the world"
          />
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">All My Photos</h3>
            <PostGrid posts={safeMyPosts} onPostClick={setSelectedPost} />
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