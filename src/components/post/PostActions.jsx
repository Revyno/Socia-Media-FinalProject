import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

export default function PostActions({ post, onLike, onComment, onSave, onShare }) {
  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={onLike}
        className="flex items-center gap-2 text-neutral-300 hover:text-red-500 transition-colors"
      >
        <Heart className={`w-6 h-6 ${post.isLike ? 'fill-red-500 text-red-500' : ''}`} />
        <span className="text-sm font-medium">{post.totalLikes}</span>
      </button>
      
      <button 
        onClick={onComment}
        className="text-neutral-300 hover:text-white transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      
      <button 
        onClick={onShare}
        className="text-neutral-300 hover:text-white transition-colors"
      >
        <Share2 className="w-6 h-6" />
      </button>
      
      <button 
        onClick={onSave}
        className="text-neutral-300 hover:text-white transition-colors ml-auto"
      >
        <Bookmark className="w-6 h-6" />
      </button>
    </div>
  );
}