
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { postApi } from '@/api/postApi';
import { followApi } from '@/api/followApi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserAvatar from '@/components/user/UserAvatar';
import UserStats from '@/components/user/UserStats';
import PostGrid from '@/components/post/PostGrid';
import PostDetail from '@/components/post/PostDetail';
import EditProfileDialog from '@/components/user/EditProfileDialog';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import { Settings, LogOut, Mail, Phone, Grid, Heart, ImageIcon } from 'lucide-react';

// Helper function to get user ID from various structures
const getUserId = (user) => {
  if (!user) return null;
  
  console.log('🔍 Searching for user ID in:', user);
  
  // Check various possible structures
  if (user.id) return user.id;
  if (user.userId) return user.userId;
  if (user.data?.id) return user.data.id;
  if (user._id) return user._id;
  
  // If no ID found, try to extract from other fields
  if (user.email) {
    console.log('⚠️ No user ID found, using email as fallback');
    return user.email.split('@')[0]; // Use username part of email as fallback
  }
  
  console.warn('❌ User ID not found in user object');
  return null;
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = getUserId(user);
      console.log('🆔 Using user ID:', userId);
      
      if (!userId) {
        setError('User ID not available');
        setLoading(false);
        return;
      }

      // Fix: Gunakan parameter yang benar untuk API calls
      const postsParams = { size: 10, page: 1 };
      const followParams = { size: 10, page: 1 };

      // Fetch data dengan endpoint yang benar dan parameter yang tepat
      const promises = [
        // Gunakan endpoint yang benar untuk posts user
        postApi.getPostsByUserId(userId, postsParams)
          .then(res => {
            console.log('📸 Posts response:', res.data);
            // Handle berbagai struktur response
            if (res.data?.data?.posts && Array.isArray(res.data.data.posts)) {
              return res.data.data.posts;
            } else if (res.data?.posts && Array.isArray(res.data.posts)) {
              return res.data.posts;
            } else if (Array.isArray(res.data?.data)) {
              return res.data.data;
            }
            return [];
          })
          .catch(err => {
            console.error('Error fetching posts:', err);
            return [];
          }),
        
        // Fix: Gunakan endpoint yang benar untuk followers - tanpa userId di parameter
        followApi.getMyFollowers(followParams)
          .then(res => {
            console.log('👥 Followers response:', res.data);
            // Handle berbagai struktur response
            if (res.data?.data && Array.isArray(res.data.data)) {
              return res.data.data;
            } else if (Array.isArray(res.data)) {
              return res.data;
            }
            return [];
          })
          .catch(err => {
            console.error('Error fetching followers:', err);
            // Fallback: coba endpoint alternatif
            return followApi.getFollowersByUserId(userId, followParams)
              .then(res => {
                console.log('👥 Fallback followers response:', res.data);
                return res.data?.data || [];
              })
              .catch(fallbackErr => {
                console.error('Fallback also failed:', fallbackErr);
                return [];
              });
          }),
        
        // Fix: Gunakan endpoint yang benar untuk following - tanpa userId di parameter
        followApi.getMyFollowing(followParams)
          .then(res => {
            console.log('👤 Following response:', res.data);
            // Handle berbagai struktur response
            if (res.data?.data && Array.isArray(res.data.data)) {
              return res.data.data;
            } else if (Array.isArray(res.data)) {
              return res.data;
            }
            return [];
          })
          .catch(err => {
            console.error('Error fetching following:', err);
            // Fallback: coba endpoint alternatif
            return followApi.getFollowingByUserId(userId, followParams)
              .then(res => {
                console.log('👤 Fallback following response:', res.data);
                return res.data?.data || [];
              })
              .catch(fallbackErr => {
                console.error('Fallback also failed:', fallbackErr);
                return [];
              });
          })
      ];

      const [postsData, followersData, followingData] = await Promise.all(promises);
      
      setMyPosts(postsData);
      setFollowers(followersData);
      setFollowing(followingData);
      
    } catch (err) {
      console.error('❌ Error fetching profile data:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]); 

  // Pastikan myPosts selalu array sebelum di-filter
  const safeMyPosts = Array.isArray(myPosts) ? myPosts : [];
  const likedPosts = safeMyPosts.filter(post => post && post.isLike);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && safeMyPosts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <Button onClick={fetchData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-neutral-900 border-neutral-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <UserAvatar 
                user={user} 
                size="lg" 
                className="shrink-0"
              />

              {/* User Info */}
              <div className="flex-1 text-center md:text-left w-full">
                {/* Name & Actions */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user?.name || 'User'}</h2>
                    <p className="text-neutral-400 mt-1">@{user?.username || 'username'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditDialogOpen(true)}
                      variant="outline"
                      className="bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      onClick={logout}
                      variant="outline"
                      className="bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <UserStats
                  stats={{
                    posts: safeMyPosts.length,
                    followers: followers.length,
                    following: following.length,
                  }}
                  className="mb-6"
                />

                {/* Bio & Contact */}
                <div className="space-y-2">
                  <p className="text-white text-sm">
                    {user?.bio || 'Welcome to my profile! Share your moments with the world.'}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-neutral-400 text-sm">
                    {user?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    )}
                    {user?.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{user.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-red-200 text-sm">
                {error} - Showing limited data
              </div>
              <Button 
                onClick={fetchData} 
                variant="outline" 
                size="sm"
                className="border-red-700 text-red-300 hover:bg-red-900/30"
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="w-full bg-neutral-900 border-b border-neutral-800 rounded-none">
            <TabsTrigger
              value="photos"
              className="flex-1 data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
            >
              <Grid className="w-4 h-4 mr-2" />
              Photos ({safeMyPosts.length})
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="flex-1 data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Liked ({likedPosts.length})
            </TabsTrigger>
          </TabsList>

          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            {safeMyPosts.length === 0 ? (
              <EmptyState
                icon={ImageIcon}
                title="No photos yet"
                description="Start sharing your moments with the world"
                actionLabel="Create Post"
                onAction={() => window.location.href = '/create-post'}
              />
            ) : (
              <PostGrid posts={safeMyPosts} onPostClick={setSelectedPost} />
            )}
          </TabsContent>

          {/* Liked Tab */}
          <TabsContent value="liked" className="mt-6">
            {likedPosts.length === 0 ? (
              <EmptyState
                icon={Heart}
                title="No liked photos"
                description="Photos you like will appear here"
              />
            ) : (
              <PostGrid posts={likedPosts} onPostClick={setSelectedPost} />
            )}
          </TabsContent>
        </Tabs>

        {/* Modals */}
        {selectedPost && (
          <PostDetail
            open={!!selectedPost}
            onOpenChange={() => setSelectedPost(null)}
            post={selectedPost}
          />
        )}

        <EditProfileDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onProfileUpdated={fetchData}
        />
      </div>
    </div>
  );
}