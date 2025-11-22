import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLike } from '@/hooks/useLike';

export default function PostCard({ post }) {
  const { handleLike, isLiking } = useLike();

  return (
    <Card className="bg-neutral-900 border-neutral-800 overflow-hidden">
      {/* User Info */}
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={post.user?.profilePictureUrl} />
          <AvatarFallback>{post.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-white font-medium">{post.user?.name}</p>
          <p className="text-neutral-400 text-sm">@{post.user?.username}</p>
        </div>
      </div>

      {/* Image */}
      <img src={post.imageUrl} alt={post.caption} className="w-full aspect-square object-cover" />

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <button onClick={() => handleLike(post.id)} disabled={isLiking}>
            <Heart className={`w-6 h-6 ${post.isLike ? 'fill-red-500 text-red-500' : 'text-neutral-300'}`} />
          </button>
          <button><MessageCircle className="w-6 h-6 text-neutral-300" /></button>
          <button className="ml-auto"><Bookmark className="w-6 h-6 text-neutral-300" /></button>
        </div>
        {post.caption && <p className="text-white">{post.caption}</p>}
      </div>
    </Card>
  );
}