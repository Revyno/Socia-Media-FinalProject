
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { postApi } from '../api/postApi';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '@/components/search/SearchBar';
import TrendingTags from '@/components/search/TrendingTags';
import PostGrid from '@/components/post/PostGrid';
import PostDetail from '@/components/post/PostDetail';
import UserList from '@/components/user/UserList'; // 
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, Users, Image as ImageIcon } from 'lucide-react';
import { TRENDING_TAGS } from '@/utils/constants';


export default function DiscoverPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    posts: [],
    users: []
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchExplorePosts();
  }, [token]);

  useEffect(() => {
    if (debouncedSearch) {
      performSearch(debouncedSearch);
    } else {
      // Jika search kosong, tampilkan semua posts
      setSearchResults({ posts: [], users: [] });
      setFilteredPosts(posts);
    }
  }, [debouncedSearch, posts]);

  const fetchExplorePosts = async () => {
    try {
      setLoading(true);
      // Gunakan params yang benar
      const response = await postApi.getExplorePosts({ 
        size: 50, 
        page: 1 
      });
      
      console.log('📊 Full API Response:', response);
      
      // Sesuai JSON dari Postman, posts ada di response.data.data.posts
      let postsData = [];
      
      if (response.data?.data?.posts && Array.isArray(response.data.data.posts)) {
        postsData = response.data.data.posts;
      } else if (response.data?.posts && Array.isArray(response.data.posts)) {
        postsData = response.data.posts;
      } else if (Array.isArray(response.data?.data)) {
        postsData = response.data.data;
      }
      
      console.log('✅ Extracted posts:', postsData);
      
      // Filter posts yang memiliki imageUrl
      const validPosts = postsData.filter(post => 
        post && 
        post.id && 
        (post.imageUrl || post.caption) // Tampilkan meski imageUrl kosong
      );
      
      setPosts(validPosts);
      setFilteredPosts(validPosts);
      
    } catch (err) {
      console.error('❌ Error fetching posts:', err);
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults({ posts: [], users: [] });
      return;
    }

    try {
      setSearching(true);
      
      // Filter posts berdasarkan query
      const lowerQuery = query.toLowerCase();
      
      // Filter posts lokal berdasarkan caption dan username
      const filtered = posts.filter(post =>
        (post?.caption?.toLowerCase().includes(lowerQuery) ||
         post?.user?.name?.toLowerCase().includes(lowerQuery) ||
         post?.user?.username?.toLowerCase().includes(lowerQuery))
      );
      
      // Ekstrak unique users dari filtered posts
      const usersMap = new Map();
      filtered.forEach(post => {
        if (post.user && post.user.id) {
          usersMap.set(post.user.id, post.user);
        }
      });
      const uniqueUsers = Array.from(usersMap.values());
      
      setSearchResults({
        posts: filtered,
        users: uniqueUsers
      });
      
      // Juga set filteredPosts untuk backup
      setFilteredPosts(filtered);
      
    } catch (err) {
      console.error('❌ Error searching:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    setActiveTab('posts');
  };

  // Hitung stats
  const totalPosts = searchQuery ? searchResults.posts.length : posts.length;
  const totalUsers = searchResults.users.length;

  if (loading && !searchQuery) {
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

        {/* Search Stats */}
        {searchQuery && (
          <div className="mb-6 text-neutral-400">
            <p>
              Found {totalPosts} posts and {totalUsers} users for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Results */}
        {searchQuery ? (
          // Jika ada search query, tampilkan tabs untuk posts dan users
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-neutral-900 border-b border-neutral-800 rounded-t-lg">
              <TabsTrigger 
                value="posts" 
                className="flex items-center gap-2 data-[state=active]:bg-neutral-800"
              >
                <ImageIcon className="w-4 h-4" />
                Posts ({totalPosts})
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="flex items-center gap-2 data-[state=active]:bg-neutral-800"
              >
                <Users className="w-4 h-4" />
                Users ({totalUsers})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="mt-4">
              {searching ? (
                <LoadingSpinner />
              ) : searchResults.posts.length === 0 ? (
                <EmptyState
                  icon={SearchIcon}
                  title="No posts found"
                  description={`No posts match "${searchQuery}"`}
                />
              ) : (
                <PostGrid 
                  posts={searchResults.posts} 
                  onPostClick={setSelectedPost} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="users" className="mt-4">
              {searching ? (
                <LoadingSpinner />
              ) : searchResults.users.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No users found"
                  description={`No users match "${searchQuery}"`}
                />
              ) : (
                <UserList users={searchResults.users} />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          // Jika tidak ada search query, tampilkan semua posts
          <>
            {filteredPosts.length === 0 ? (
              <EmptyState
                icon={ImageIcon}
                title="No posts available"
                description="Check back later for new posts"
              />
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Explore Posts ({filteredPosts.length})
                </h3>
                <PostGrid 
                  posts={filteredPosts} 
                  onPostClick={setSelectedPost} 
                />
              </div>
            )}
          </>
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