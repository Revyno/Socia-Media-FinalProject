import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import FollowButton from './FollowButton';

export default function UserCard({ user, showFollowButton = true }) {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user.profilePictureUrl} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-white font-medium">{user.name}</p>
          <p className="text-neutral-400 text-sm">@{user.username}</p>
        </div>
      </div>
      {showFollowButton && <FollowButton userId={user.id} isFollowing={user.isFollowing} />}
    </div>
  );
}