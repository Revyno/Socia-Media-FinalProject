import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { postApi } from '../api/postApi';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '@/components/search/SearchBar';
import TrendingTags from '@/components/search/TrendingTags';
import PostGrid from '@/components/post/PostGrid';
import PostDetail from '@/components/post/PostDetail';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Search as SearchIcon } from 'lucide-react';
import { TRENDING_TAGS } from '@/utils/constants';

export default function DiscoverPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  useEffect(() => {
    filterPosts();
  }, [debouncedSearch, posts]);

  const fetchPosts = async () => {
    try {
      const response = await postApi.getExplorePosts({ size: 50 });
      if (response.data?.data) {
        setPosts(response.data.data);
        setFilteredPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    if (!debouncedSearch) {
      setFilteredPosts(posts);
      return;
    }

    const query = debouncedSearch.toLowerCase();
    const filtered = posts.filter(post =>
      post.caption?.toLowerCase().includes(query) ||
      post.user?.name?.toLowerCase().includes(query) ||
      post.user?.username?.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">Discover</h2>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for photos, collections, or users..."
          />
        </div>

        {/* Trending Tags */}
        <TrendingTags tags={TRENDING_TAGS} onTagClick={handleTagClick} />

        {/* Results */}
        {filteredPosts.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title="No results found"
            description={`No posts match "${searchQuery}"`}
          />
        ) : (
          <PostGrid posts={filteredPosts} onPostClick={setSelectedPost} />
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