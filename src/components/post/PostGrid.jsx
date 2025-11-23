import { Heart } from 'lucide-react';

export default function PostGrid({ posts, onPostClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {posts.map(post => (
        <div 
          key={post.id} 
          className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
          onClick={() => onPostClick?.(post)}
        >
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white flex items-center gap-2">
              <Heart className={`w-6 h-6 ${post.isLike ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="font-medium">{post.totalLikes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}