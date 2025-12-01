// postgrid.jsx
import { Heart } from 'lucide-react';
import React from 'react';

export default function PostGrid({ posts, onPostClick }) {
  // Ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : [];

  if (safePosts.length === 0) {
    return null; 
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {safePosts.map(post => (
        <div 
          key={post.id} 
          className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg"
          onClick={() => onPostClick?.(post)}
        >
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.caption || 'Post image'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                // Fallback jika image gagal load
                e.target.src = '/default-image.jpg';
                e.target.alt = 'Image not available';
              }}
            />
          ) : (
            // Fallback UI jika imageUrl kosong
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
              <span className="text-neutral-500 text-sm">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white flex items-center gap-2">
              <Heart className={`w-6 h-6 ${post.isLike ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="font-medium">{post.totalLikes || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}