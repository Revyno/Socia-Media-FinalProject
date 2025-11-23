import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFollow } from '@/hooks/useFollow';

export default function FollowButton({ userId, isFollowing: initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { handleFollow, isLoading } = useFollow();

  const onClick = async () => {
    const success = await handleFollow(userId, isFollowing);
    if (success) setIsFollowing(!isFollowing);
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={isFollowing ? 'outline' : 'default'}
      className={isFollowing ? 'bg-transparent border-neutral-700' : 'bg-white text-neutral-900'}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
}