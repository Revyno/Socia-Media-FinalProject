import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userApi } from '@/api/userApi';
import { postApi } from '@/api/postApi';
import UserAvatar from '@/components/user/UserAvatar';
import UserStats from '@/components/user/UserStats';
import FollowButton from '@/components/user/FollowButton';
import PostGrid from '@/components/post/PostGrid';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function UserDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          userApi.getUserById(userId),
          postApi.getPostsByUserId(userId),
        ]);

        setUser(userRes.data.data);
        setPosts(postsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <div className="text-center text-neutral-400 py-20">User not found</div>;

  return (
    <div className="py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <UserAvatar user={user} size="lg" />
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <FollowButton userId={user.id} isFollowing={user.isFollowing} />
            </div>
            
            <p className="text-neutral-400 mb-4">@{user.username}</p>
            
            <UserStats stats={{
              posts: posts.length,
              followers: user.followersCount || 0,
              following: user.followingCount || 0,
            }} />
            
            {user.bio && <p className="text-white mt-4">{user.bio}</p>}
          </div>
        </div>

        <PostGrid posts={posts} />
      </div>
    </div>
  );
}