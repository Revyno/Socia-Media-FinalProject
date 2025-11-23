import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
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

export default function ProfilePage() {
  const { user, logout } = useAuth();
  // const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, followersRes, followingRes] = await Promise.all([
        postApi.getMyPosts({ size: 100 }),
        followApi.getMyFollowers({ size: 100 }),
        followApi.getMyFollowing({ size: 100 }),
      ]);

      if (postsRes.data?.data) setMyPosts(postsRes.data.data);
      if (followersRes.data?.data) setFollowers(followersRes.data.data);
      if (followingRes.data?.data) setFollowing(followingRes.data.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const likedPosts = myPosts.filter(post => post.isLike);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-neutral-900 border-neutral-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <UserAvatar user={user} size="lg" />

              {/* User Info */}
              <div className="flex-1 text-center md:text-left w-full">
                {/* Name & Actions */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
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

                {/* Username */}
                <p className="text-neutral-400 mb-4">@{user?.username}</p>

                {/* Stats */}
                <UserStats
                  stats={{
                    posts: myPosts.length,
                    followers: followers.length,
                    following: following.length,
                  }}
                />

                {/* Bio & Contact */}
                <div className="mt-6 space-y-2">
                  <p className="text-white">
                    {user?.bio || 'Visual storyteller | Capturing moments'}
                  </p>
                  {user?.email && (
                    <p className="text-neutral-400 text-sm flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </p>
                  )}
                  {user?.phoneNumber && (
                    <p className="text-neutral-400 text-sm flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4" />
                      {user.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="w-full bg-neutral-900 border-b border-neutral-800 rounded-none">
            <TabsTrigger
              value="photos"
              className="flex-1 data-[state=active]:bg-neutral-800 data-[state=active]:text-white"
            >
              <Grid className="w-4 h-4 mr-2" />
              Photos ({myPosts.length})
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
            {myPosts.length === 0 ? (
              <EmptyState
                icon={ImageIcon}
                title="No photos yet"
                description="Start sharing your moments with the world"
              />
            ) : (
              <PostGrid posts={myPosts} onPostClick={setSelectedPost} />
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
        />
      </div>
    </div>
  );
}