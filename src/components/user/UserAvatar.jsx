import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function UserAvatar({ user, size = 'md', onClick }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-32 h-32',
  };

  return (
    <Avatar className={sizeClasses[size]} onClick={onClick}>
      <AvatarImage src={user?.profilePictureUrl} />
      <AvatarFallback className="bg-neutral-700 text-white">
        {user?.name?.[0] || 'U'}
      </AvatarFallback>
    </Avatar>
  );
}